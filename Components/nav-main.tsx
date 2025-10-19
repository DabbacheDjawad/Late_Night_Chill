"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { NavItem } from "@/types/nav";

interface NavMainProps {
  items: NavItem[];
}

// recursive renderer for sub-items
function RenderSubItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.items?.length;

  if (hasChildren) {
    return (
      <Collapsible asChild key={item.title} className="group/collapsible">
        <SidebarMenuSubItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton asChild>
              <a href={item.href} className="flex items-center w-full">
                {item.icon && <item.icon color={item?.iconColor ?? ""} />}
                <span className="ml-2">{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </a>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items!.map((child) => (
                <RenderSubItem key={child.title} item={child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuSubItem>
      </Collapsible>
    );
  }

  // leaf
  return (
    <SidebarMenuSubItem key={item.title}>
      <SidebarMenuSubButton asChild>
        <a href={item.href ?? "#"} className="flex items-center gap-2 w-full">
          {item.icon && <item.icon color={item?.iconColor ?? ""} />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Choices</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = !!item.items?.length;

          return (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && (
                      <item.icon color={item?.iconColor ?? ""} />
                    )}
                    <span>{item.title}</span>
                    {hasChildren && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasChildren && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items!.map((sub) => (
                        <RenderSubItem key={sub.title} item={sub}/>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
