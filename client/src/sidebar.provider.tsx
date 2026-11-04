import { AppSidebar } from "./common/sidebar/Sidebar"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}