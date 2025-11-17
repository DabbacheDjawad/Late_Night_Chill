"use client";

import * as React from "react";
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
  icons,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavLists } from "@/Components/nav-lists";
import { NavUser } from "@/Components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar";
import User from "@/types/User";
import AppSidebarProps from "@/types/AppSideBarProps";
import { useUser } from "@/Context/UserContext";
import { IoMdPeople } from "react-icons/io";
import { CiStar } from "react-icons/ci";

const navMain = [
  {
    title: "Anime",
    href: "/anime",
    isActive: true,
    items: [
      {
        title: "Top Rated",
        items: [
          { title: "Shows", href: "/anime/top/shows" },
          { title: "Characters", href: "/anime/top/characters" },
        ],
      },
      {
        title: "Popular",
        items: [
          { title: "Shows", href: "/anime/popular" },
        ],
      },
      {
        title: "Latest Animes",
        href: "/anime/latest",
      },
      {
        title: "Latest Episodes",
        href: "/anime/latest_episodes",
      },
            {
        title: "Current seasons",
        href: "/anime/seasons/current",
      },
    ],
  },
  {
    title: "Movies",
    href: "movies",
    items: [
      { title: "Top Rated", href: "/movies/top" },
      { title: "Popular", href: "/movies/popular" },
      { title: "Latest Movies", href: "/movies/latest" },
    ],
  },
  {
    title: "TvShows",
    href: "tvShows",
    items: [
      { title: "Top Rated", href: "/tvShows/top" },
      { title: "Popular", href: "/tvShows/popular" },
      { title: "Latest Shows", href: "/tvShows/latest" },
    ],
  },
];

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
        url: "/wishList",
        secondIcon: BookMarked,
        secondaryIconColor: "var(--main-red)",
      },
      {
        title: "Currently Watching",
        url: "/progres",
        secondIcon: Monitor,
        secondaryIconColor: "var(--main-red)",
      },
    ],
  },
];

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
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
