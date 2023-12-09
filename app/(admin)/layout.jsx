import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Nav from "@/components/navigation/Nav";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RealtimeProvider from "@/components/shared/RealtimeProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Admin - Ruskær Jagtforening",
  description:
    "Velkommen til Ruskær Jagtforening, her tilbyder vi jagt, skydning og hundetræning for alle vores medlemmer.",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("isSuperAdmin")
      .eq("id", session.user.id);

    if (!data[0].isSuperAdmin) {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <RealtimeProvider session={session}>
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Nav isAdminPage={true} />
          <main className="mt-[92px] md:mt-[108px] p-6 md:pb-6 md:p-12">
            <section className="max-w-[1440px] mx-auto ">{children}</section>
          </main>
        </body>
      </RealtimeProvider>
    </html>
  );
}
