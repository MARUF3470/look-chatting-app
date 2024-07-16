"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const Logout = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/authentication`,
        })
      }
    >
      Logout
    </Button>
  );
};

export default Logout;
