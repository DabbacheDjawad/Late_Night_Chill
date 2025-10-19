import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  iconColor ?: string
  items?: NavItem[];
  isActive ?: boolean
}

export interface NavMainProps {
  items: NavItem[];
}
