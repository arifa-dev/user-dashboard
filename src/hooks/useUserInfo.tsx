import { useEffect, useState } from "react";
import { auth_api } from "@/utils/api";

interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  location: string;
  phone_number: string;
  email: string;
  profile_image_url: string;
}

export const useUserInfo = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await auth_api("/auth/user-info/");
        setUser(data?.data as UserType);
      } catch (err: any) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
