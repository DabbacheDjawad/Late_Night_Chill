"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar"

export function NavLists({
  lists,
}: {
  lists: {
    title: string
    url: string
    icon?: LucideIcon
    mainIconColor?: string | null
    isActive?: boolean
    items?: {
      title: string
      url: string
      secondIcon?: LucideIcon | null
      secondaryIconColor?: string | null
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Lists</SidebarGroupLabel>
      <SidebarMenu>
        {lists.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && (
                      <item.icon color={item?.mainIconColor as string} />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            {subItem.secondIcon && (
                              <subItem.secondIcon
                                color={subItem?.secondaryIconColor as string}
                              />
                            )}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon && (
                    <item.icon color={item?.mainIconColor as string} />
                  )}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <ChevronRight className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
