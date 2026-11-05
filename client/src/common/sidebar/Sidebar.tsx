import { Link } from "react-router";
import { Sidebar, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader } from "../../components/ui/sidebar";


export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader>
        <h1 className="text-2xl text-center font-bold">LOGO</h1>
      </SidebarHeader>
      <SidebarGroupContent>
       <div className="p-5">
        <h4 className="text-sm font-light">Main</h4>
        <ul className="flex flex-col gap-1 text-lg font-bold ">
            <li className="cursor-pointer"><Link to={'/users'}>Users</Link></li>
            <li className="cursor-pointer"><Link to={'/products'}>Products</Link></li>
        </ul>
       </div>
      </SidebarGroupContent>
      <SidebarFooter />
    </Sidebar>
  )
}