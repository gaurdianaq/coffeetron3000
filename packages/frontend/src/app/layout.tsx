import { Navbar } from "@/components/NavBar/navbar";
import "./globals.css";
import { Inter } from "next/font/google";

//TODO import this properly as an actual package once I figure out why the heck next can't find this
import { INavbarProps } from "../../../shared_types/types";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarEntry: INavbarProps = await fetch(
    `${process.env.BACKEND_URL}/components/navbar`,
    {
      cache: "no-store",
      headers: {
        "x-api-key": process.env.X_API_KEY || "",
      },
    }
  ).then((response) => {
    return response.json().then((result) => {
      return result;
    });
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar title="something" navbarItems={navbarEntry.navbarItems} />
        {children}
      </body>
    </html>
  );
}
