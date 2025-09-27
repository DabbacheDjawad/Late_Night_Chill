"use client"

import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
  Settings2,
  ChartBarStacked,
  Star,
  List,
  Heart,
  BookMarked,
  Monitor,
} from "lucide-react"

import { NavMain } from "@/Components/nav-main"
import { NavLists } from "@/Components/nav-lists"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar"
import User from "@/types/User"
import AppSidebarProps from "@/types/AppSideBarProps"
import { useUser } from "@/Context/UserContext"


const navMain = [
  {
    title: "Anime",
    url: "/anime",
    icon: ChartBarStacked,
    isActive: true,
    items: [
      { title: "Top Rated", url: "/anime/top" },
      { title: "Popular", url: "/anime/popular" },
      { title: "Latest Animes", url: "/anime/latest" },
      { title: "Latest Episodes", url: "/anime/latest_episodes" },
    ],
  },
  {
    title: "Movies",
    url: "movies",
    icon: Star,
    items: [
      { title: "Top Rated", url: "/movies/top" },
      { title: "Popular", url: "/movies/popular" },
      { title: "Latest Movies", url: "/movies/latest" },
    ],
  },
  {
    title: "TvShows",
    url: "#",
    icon: Settings2,
    items: [
      { title: "Top Rated", url: "/tvShows/top" },
      { title: "Popular", url: "/tvShows/popular" },
      { title: "Latest Shows", url: "/tvShows/latest" },
    ],
  },
]

const lists = [
  {
    title: "My List",
    url: "/List",
    icon: List,
    items: [
      {
        title: "Favourites",
        url: "/favourites",
        secondIcon: Heart,
        secondaryIconColor: "var(--main-red)",
      },
      {
        title: "Watch Later",
        url: "/later",
        secondIcon: BookMarked,
        secondaryIconColor: "var(--main-red)",
      },
      {
        title: "Currently Watching",
        url: "/currently-watching",
        secondIcon: Monitor,
        secondaryIconColor: "var(--main-red)",
      },
    ],
  },
]

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const userInfo = useUser().user;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navMain} />
        <NavLists lists={lists} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
