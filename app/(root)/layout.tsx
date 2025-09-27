import Navbar from "@/Components/Navbar"
import { SidebarProvider , SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import SideBarWrapper from "@/Components/sideBarWrapper";

export default function Layout({children} : Readonly<{children : React.ReactNode}>){
  return(
    <>
    <SidebarProvider>
      <SideBarWrapper/>
        <main className="w-full">
          <Navbar/>
          <SidebarTrigger />
          {children}
        </main>
    </SidebarProvider>
    </>
  )
}

