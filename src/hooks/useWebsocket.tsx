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

  // Decode JWT once, memoized
  const RECIPIENT = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      return jwtDecode<JwtPayload>(token).user_id;
    } catch (err) {
      console.error("Invalid JWT:", err);
      return "";
    }
  }, []);

  const TOKEN = "arifa_test:4e89be23CVCP"; 

  const TOKEN1 = "arifa_test:8b7dcdfbGID1";
  const CLIENT = "web";
  const WS_URL = "wss://notifications.arifa.dev/ws";
  const WS_URL1 = "ws://127.0.0.1:8081/ws";



  const connect = () => {
    // Prevent multiple simultaneous connections
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      return;
    }

    const ws = new WebSocket(
      `${WS_URL}${path}?api_key=${TOKEN}&client=${CLIENT}&recipient=${RECIPIENT}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      setData(event.data);

      console.log("OFFLINE", event.data)
    };

    ws.onerror = (err) => {
      // pass
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      console.log(`WebSocket closed: ${event.code}`);

      // Stop reconnect for auth errors or offline
      if ([4001, 4003].includes(event.code) || !navigator.onLine) return;

      // Exponential backoff reconnect
      const timeout = Math.min(30000, 2000 * 2 ** reconnectAttempts.current);
      reconnectAttempts.current++;

      reconnectTimer.current = window.setTimeout(connect, timeout);
    };
  };

  useEffect(() => {
    // Only connect if no active socket exists
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      connect();
    }

    const handleOnline = () => {
      // Reconnect only if socket is closed
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
        connect();
      }
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
