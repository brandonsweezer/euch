import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euchre",
  description: "The most exhilarating experience of the midwest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body className={inter.className} style={{height: '100%', backgroundColor: "#000000"}}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
