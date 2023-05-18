"use client";

import Button from "../../components/Button";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { User } from "../../lib/types/inteface";
import Provider from "../provider";
import { axiosAuth } from "@/src/lib/axios";

const page = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>();
 
  const fetchUserProfile = async () => {

    try {
      const response = await axiosAuth.get(`/${session?.user.id}`, {
        headers: {
          Authorization: `bearer ${session?.user.access_token}`,
        },
      });
      const data = response.data;
      // Xử lý dữ liệu ở đây
      setUserData(data)
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error(error);
    }
 
 
  };
  return (
      <Provider>
        <div className="px-10">
          <p className="flex justify-center items-center p-5 text-sky-500 text-lg font-bold">This is user Panel</p>
          <Button onClick={fetchUserProfile}>Get User Profile</Button>
          <div className="grid grid-cols-5">
            <p className="text-slate-600">Email:</p>
            <p className="col-span-4 text-sky-600">{userData?.email}</p>
            <p className="text-slate-600">Name:</p>
            <p className="col-span-4  text-sky-600">{userData?.name}</p>
            <p className="text-slate-600">Role:</p>
            <p className="col-span-4  text-sky-600"> {userData?.role}</p>
          </div>
        </div>
      </Provider>
  );
};

export default page;

