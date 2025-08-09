import React, { useEffect } from "react";
import PrivateLayoutHeader from "./components/header";
import { getCurrentUser } from "@/actions/users";
import Spinner from "@/components/ui/spinner";
import toast from "react-hot-toast";
import usersGlobalStore, { IUsersGlobalStore } from "@/global-store/users-store";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const {user, setUser} = usersGlobalStore() as IUsersGlobalStore;
 

  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getCurrentUser();
      if (response.success) {
        setUser(response.data);
        // toast.success("User data fetched successfully");
      } else {
        throw new Error("Error fetching user data");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Error fetching the user data</h1>
      </div>
    );
  }

  return (
    <div>
      <PrivateLayoutHeader  />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;
