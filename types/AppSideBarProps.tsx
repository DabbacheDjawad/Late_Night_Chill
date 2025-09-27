import { Sidebar } from "@/Components/ui/sidebar";
import User from "./User";

export default interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
}