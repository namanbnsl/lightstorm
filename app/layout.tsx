import AuthContext from "@/components/auth/AuthContext";
import "./globals.css";
import { Nunito } from "next/font/google";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "light.storm",
  description: "Fun Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
