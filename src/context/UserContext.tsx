"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth_api } from "@/utils/api";

interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  location: string;
  phone_number: string;
  email: string;
  profile_image_url:string;
}

interface UserContextType {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await auth_api("/auth/user-info/");
      setUser(data?.data);
      setError(null);
    } catch (err: any) {
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
