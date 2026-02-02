import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { WebSocketProvider } from '@/context/WebsocketContext';
import MaintenancePage from './maintenance/page';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
         <MaintenancePage />
       {/*
      <ThemeProvider>
          <UserProvider>
           <WebSocketProvider>
             <SidebarProvider>{children}</SidebarProvider>
           </WebSocketProvider>
          </UserProvider>
        </ThemeProvider>
         */}
      </body>
    </html>
  );
}
