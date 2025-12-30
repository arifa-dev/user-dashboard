"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useMemo, ReactNode } from "react";
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
  const internetOnline = useRef(true);
  const internetTimer = useRef<number | null>(null);

  /* -------- CONFIG -------- */
  const HEALTH_URL = "https://notifications.arifa.dev/health";
  const MAX_BACKOFF = 60_000;
  const TOKEN = "arifa_test:4e89be23CVCP";
  const TOKEN1 = "arifa_test:8b7dcdfbYIO0"
  const CLIENT = "web";
  const WS_URL = "wss://notifications.arifa.dev/ws";
  const WS_URL1 = "ws://127.0.0.1:8081/ws";

  /* -------- RECIPIENT -------- */
  const RECIPIENT = useMemo(() => {
    if (typeof window === "undefined") return ""; // skip on server
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      return jwtDecode<JwtPayload>(token).user_id;
    } catch {
      return "";
    }
  }, []);

  

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

  const checkInternet = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      await fetch(HEALTH_URL, { method: "GET", cache: "no-store", signal: controller.signal });

      clearTimeout(timeout);
      return true;
    } catch {
      return false;
    }
  };

  const startInternetMonitor = () => {
    const update = async () => {
      const online = await checkInternet();

      if (online !== internetOnline.current) {
        internetOnline.current = online;

        if (online) {
          reconnectAttempts.current = 0;
          connect();
        } else {
          wsRef.current?.close();
          setIsConnected(false);
        }
      }
    };

    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    internetTimer.current = window.setInterval(update, 5000);
  };

  const connect = () => {
    if (!RECIPIENT || !internetOnline.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

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

    ws.onerror = () => ws.close();
  };

  const scheduleReconnect = () => {
    if (!internetOnline.current) return;
    const base = Math.min(MAX_BACKOFF, 1000 * 2 ** reconnectAttempts.current);
    const jitter = Math.random() * 1000;
    reconnectAttempts.current++;
    reconnectTimer.current = window.setTimeout(connect, base + jitter);
  };

  useEffect(() => {
    startInternetMonitor();
    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (internetTimer.current) clearInterval(internetTimer.current);
      wsRef.current?.close();
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
