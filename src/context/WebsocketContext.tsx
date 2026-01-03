"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  user_id: string;
  exp: number;
  iat: number;
};

type WebSocketContextType = {
  data: any;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

type WebSocketProviderProps = {
  children: ReactNode;
  path?: string;
};

export const WebSocketProvider = ({ children, path = "/connect" }: WebSocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<any>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);

  /* -------- CONFIG -------- */
  const MAX_RECONNECTS = 5;
  const MAX_BACKOFF = 60_000; 
  const TOKEN = "arifa_test:4e89be23CVCP"; 
  const TOKEN1 = "arifa_test:8b7dcdfbLZVR"; 
  const CLIENT = "mobile"; 
  const WS_URL1 = "ws://127.0.0.1:8081/ws"; 
  const WS_URL = "wss://notifications.arifa.dev/ws";

  /* -------- RECIPIENT -------- */
  const RECIPIENT = useMemo(() => {
    if (typeof window === "undefined") return "";
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      return jwtDecode<JwtPayload>(token).user_id;
    } catch {
      return "";
    }
  }, []);

  /* -------- UTILITIES -------- */
  const safeParse = (input: any) => {
    try {
      if (typeof input === "object") return input;
      let parsed = JSON.parse(input);
      if (typeof parsed === "string") parsed = JSON.parse(parsed);
      return parsed;
    } catch {
      return null;
    }
  };

  /* -------- WEBSOCKET CONNECTION -------- */
  const connect = () => {
    if (!RECIPIENT) return;
    if (wsRef.current?.readyState === WebSocket.OPEN || wsRef.current?.readyState === WebSocket.CONNECTING) return;

    const ws = new WebSocket(`${WS_URL}${path}?api_key=${TOKEN}&client=${CLIENT}&recipient=${RECIPIENT}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      const parsed = safeParse(event.data);
      if (parsed?.event) setData(parsed.event);
    };

    ws.onclose = () => {
      setIsConnected(false);
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  };

  const scheduleReconnect = () => {
    if (reconnectAttempts.current >= MAX_RECONNECTS) return;

    const base = Math.min(MAX_BACKOFF, 1000 * 2 ** reconnectAttempts.current);
    const jitter = Math.random() * 1000;

    reconnectAttempts.current++;
    reconnectTimer.current = window.setTimeout(connect, base + jitter);
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [path, RECIPIENT]);

  return <WebSocketContext.Provider value={{ data, isConnected }}>{children}</WebSocketContext.Provider>;
};

/* -------- HOOK TO USE CONTEXT -------- */
export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  return context;
};
