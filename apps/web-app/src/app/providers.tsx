"use client";
import React from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from 'next-auth/react';

const Providers = ({children}:{children: React.ReactNode}) => {
  return (
    <SessionProvider>
     <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
