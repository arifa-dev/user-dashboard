import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  user_id: string;
  exp: number;
  iat: number;
};

export const useWebSocket = (path: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<any>();
  const reconnectRef = useRef<number | null>(null);

  // decode jwt using library
  const jwt_token =  localStorage.getItem("accessToken");;
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

  useEffect(() => {
    let ws: WebSocket;
    const ws_local = "wss://notifications.arifa.dev/ws";

    const connect = () => {
      ws = new WebSocket(
        `${ws_local}${path}?api_key=${TOKEN}&client=${CLIENT}&recipient=${RECIPIENT}`
      );

      ws.onopen = () => setIsConnected(true);

      ws.onclose = () => {
        setIsConnected(false);

        if (!document.hidden) {
          reconnectRef.current = window.setTimeout(connect, 3000);
        }
      };

      ws.onmessage = (event) => {
        setData(event.data);
      };
    };

    connect();

    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      ws?.close();
    };
  }, [path, RECIPIENT]);

  return { data, isConnected };
};
