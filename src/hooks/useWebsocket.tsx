import { useState, useEffect, useRef, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  user_id: string;
  exp: number;
  iat: number;
};

export const useWebSocket = (path: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<any>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);

  // decode jwt using library
  const jwt_token = localStorage.getItem("accessToken");
  let RECIPIENT = "";

  if (jwt_token) {
    try {
      const decoded = jwtDecode<JwtPayload>(jwt_token);
      RECIPIENT = decoded.user_id;
      console.log("RECIPIENT", RECIPIENT);
    } catch (err) {
      console.error("Invalid JWT:", err);
    }
}


  const TOKEN = "arifa_test:4e89be23CVCP";
  const CLIENT = "web";

  const WS_URL = "wss://notifications.arifa.dev/ws";

  const connect = () => {
    const ws = new WebSocket(
      `${WS_URL}${path}?api_key=${TOKEN}&client=${CLIENT}&recipient=${RECIPIENT}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      setData(event.data);
    };

    ws.onerror = (_) => {
      // todo
    };

    ws.onclose = (event) => {

      setIsConnected(false);

      if (event.code === 4001 || event.code === 4003) {
        return;
      }

      if (!navigator.onLine) {
        return;
      }

      // Exponential backoff
      const timeout = Math.min(30000, 2000 * 2 ** reconnectAttempts.current);
      reconnectAttempts.current++;

      reconnectTimer.current = window.setTimeout(() => {
        connect();
      }, timeout);
    };
  };

  useEffect(() => {
    connect();
    const handleOnline = () => {
      connect();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);

      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);

      wsRef.current?.close();
    };
  }, [path, RECIPIENT]);

  return { data, isConnected };
};
