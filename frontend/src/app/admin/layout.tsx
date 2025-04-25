"use client";
import React from "react";
import { SnackbarProvider } from "notistack";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <SnackbarProvider>{children}</SnackbarProvider>
    </div>
  );
};

export default layout;
