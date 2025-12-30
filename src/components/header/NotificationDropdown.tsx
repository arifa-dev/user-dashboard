"use client";

import { useState, useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useWebSocketContext } from "@/context/WebsocketContext";

type Notification = {
  message: string;
  message_type: string;
  created_at: string;
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const { data, isConnected } = useWebSocketContext();


  // Sound reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
      if (!data) return;

      if (
        typeof data !== "object" ||
        !data.message_type ||
        !data.created_at
      ) {
        return;
      }

      if (data.message_type === "subscription_transaction") {
        setNotifications((prev) => [data, ...prev]);
        setHasUnread(true);

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }
  }, [data]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false); // user opened dropdown → mark as read
    }
  };

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      {/* 🔔 Bell Icon */}
      <button
        onClick={toggleDropdown}
        className={`relative flex items-center justify-center h-11 w-11 rounded-full border transition-colors 
        ${isConnected ? "text-green-500 border-green-500 hover:bg-green-100 dark:border-green-800" : "text-red-500 border-red-500 hover:bg-red-100"} 
        bg-white dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-800`}
        title={isConnected ? "Connected" : "Disconnected"}
      >
        <FiBell size={20} />
        {hasUnread && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-orange-400 rounded-full animate-ping"></span>
        )}
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notifications
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>

        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {notifications.length === 0 && (
            <li className="text-center text-gray-400 py-4">
              No notifications
            </li>
          )}

          {notifications.map((notif, idx) => (
            <li key={idx}>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex flex-col gap-1 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
              >
                <span className="text-gray-800 dark:text-white/90 font-medium">
                  {notif.message}
                </span>
                <span className="text-gray-500 text-xs dark:text-gray-400">
                  {new Date(notif.created_at).toLocaleString()}
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>
      </Dropdown>

      <audio ref={audioRef} src="/sounds/ring3.mp3" preload="auto" />
    </div>
  );
}
