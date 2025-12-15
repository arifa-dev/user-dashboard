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

  // Decode token
  const RECIPIENT = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      return jwtDecode<JwtPayload>(token).user_id;
    } catch {
      return "";
    }
  }, []);

  const TOKEN = "arifa_test:4e89be23CVCP"; 
  const TOKEN1 = "arifa_test:8b7dcdfbLBGK";
  const CLIENT = "web";
  const WS_URL = "wss://notifications.arifa.dev/ws";
  const WS_URL1 = "ws://127.0.0.1:8081/ws";

  // SAFE PARSER — handles ALL message formats
  const safeParse = (input: any) => {
    try {
      if (typeof input === "object") return input; // already JSON

      let parsed = JSON.parse(input);

      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed); // double encoded JSON
      }

      return parsed;
    } catch {
      return null;
    }
  };

  const connect = () => {
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) return;

    const ws = new WebSocket(
      `${WS_URL}${path}?api_key=${TOKEN}&client=${CLIENT}&recipient=${RECIPIENT}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      const parsed = safeParse(event.data);
      setData(parsed);
    };

    ws.onclose = (event) => {
      setIsConnected(false);

      if ([4001, 4003].includes(event.code) || !navigator.onLine) return;

      const timeout = Math.min(30000, 2000 * 2 ** reconnectAttempts.current);
      reconnectAttempts.current++;
      reconnectTimer.current = window.setTimeout(connect, timeout);
    };
  };

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      connect();
    }

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [path, RECIPIENT]);

  return { data, isConnected };
};
