import "./globals.css";
import { AppSettingsProvider } from "@/contexts/AppSettingsContext";

export const metadata = {
  title: "Task Management App",
  description: "Full-stack Task Manager built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <AppSettingsProvider>{children}</AppSettingsProvider>
      </body>
    </html>
  );
}
