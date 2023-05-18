"use client"

import React from "react";
import Provider from "../provider";

const page = async () => {
  return (
    <Provider>
      <div className="flex justify-center items-center p-5 text-red-500 text-lg font-bold">
        Admin Protected Page
      </div>
    </Provider>
  );
};

export default page;
