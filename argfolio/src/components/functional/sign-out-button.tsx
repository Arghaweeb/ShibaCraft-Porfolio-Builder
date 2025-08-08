"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button disabled={loading} onClick={onSignOut}>
      Signout
    </Button>
  );
}

export default SignOutButton;