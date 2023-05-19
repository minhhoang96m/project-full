"use client";

import axios from "../lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refresh: session?.user?.refresh_token,
    });

    if (session) session.user.access_token = res.data.access_token;
    else signIn();
  };
  return refreshToken;
};