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

  const internetOnline = useRef(true);
  const internetTimer = useRef<number | null>(null);

  /* -------- CONFIG -------- */
  const HEALTH_URL = "https://notifications.arifa.dev/health";
  const MAX_BACKOFF = 60_000;

  const TOKEN = "arifa_test:4e89be23CVCP"; 
  const TOKEN1 = "arifa_test:8b7dcdfbUE54"; 
  const CLIENT = "mobile"; 
  const WS_URL= "wss://notifications.arifa.dev/ws"; 
  const WS_URL1 = "ws://127.0.0.1:8081/ws";

  /* -------- RECIPIENT -------- */
  const RECIPIENT = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      return jwtDecode<JwtPayload>(token).user_id;
    } catch {
      return "";
    }
  }, []);

  /* -------- SAFE PARSER -------- */
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

  /* -------- REAL INTERNET CHECK -------- */
  const checkInternet = async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      await fetch(HEALTH_URL, {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeout);
      return true;
    } catch {
      return false;
    }
  };

  /* -------- INTERNET MONITOR -------- */
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

  /* -------- CONNECT -------- */
  const connect = () => {
    if (!RECIPIENT) return;
    if (!internetOnline.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

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
      if (parsed?.event) {
        setData(parsed.event);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  };

  /* -------- RECONNECT -------- */
  const scheduleReconnect = () => {
    if (!internetOnline.current) return;

    const base = Math.min(
      MAX_BACKOFF,
      1000 * 2 ** reconnectAttempts.current
    );

    const jitter = Math.random() * 1000;
    const timeout = base + jitter;

    reconnectAttempts.current++;

    reconnectTimer.current = window.setTimeout(connect, timeout);
  };

  /* -------- LIFECYCLE -------- */
  useEffect(() => {
    startInternetMonitor();
    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (internetTimer.current) clearInterval(internetTimer.current);
      wsRef.current?.close();
    };
  }, [path, RECIPIENT]);

  return { data, isConnected };
};
