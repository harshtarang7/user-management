import React from 'react'
import { AppSidebar } from '../sidebar/Sidebar'
import Header from '../header/Header'
import { SidebarProvider } from '../../components/ui/sidebar'
import { Outlet } from 'react-router'

function DashboardLayout(
  // { children }: { children: React.ReactNode }
  
) {
  return (
    <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
        {/* sidebar */}
        <aside className="w-64 shrink-0 border-r">
        <AppSidebar />
      </aside>

        {/* main */}
         <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
            <header className="h-16 shrink-0 border-b">
          <Header />
        </header>
            <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-10">
                {/* {children} */}
                  <Outlet />
            </main>
            
            </div>
    </div>
    </SidebarProvider>
  )
}

export default DashboardLayout