import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
};

const theme = createTheme({
  colors: {
    primary: ['#F0B90B', '#ffcf39', '', '', '', '', '', '', '', '']
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <main>
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
