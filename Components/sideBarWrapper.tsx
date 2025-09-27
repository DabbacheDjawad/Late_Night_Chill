// app/components/SidebarWrapper.tsx
import { AppSidebar } from "./app-sidebar";
import { auth } from "@/auth"; // or "next-auth"
import { redirect } from "next/navigation";

export default async function SidebarWrapper() {
  const session = await auth();

  if (!session?.user) return     <AppSidebar
      user={{
        id: "",
        name: "Guest",
        email: "",
        avatar:  "",
      }}
    />;

  return (
    <AppSidebar
      user={{
        id: session.user.id || "",
        name: session.user.name || "Guest",
        email: session.user.email || "",
        avatar: session.user.image || "",
      }}
    />
  );
}
