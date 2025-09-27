import React from 'react'
import { ModeToggle } from '@/Components/mode-toggle'
import logo from "@/public/original.png";
import Link from 'next/link';
import Image from 'next/image';
import { auth , signIn , signOut} from '@/auth';
import Button from "@/Components/Button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LogOut } from 'lucide-react';
const Navbar = async () => {    
    const session = await auth();
  return (
    <header className='w-full dark:bg-[#2F2F2F] navbar-white-main-bg'>
        <nav className='flex items-center justify-between'>
            <div className='py-3 px-5'>
                <Link href={"/"} className='flex items-center'>
                    <Image src={logo} alt='logo' height={50} className='rounded-full'/>
                    <span className='max-sm:hidden sm:inline text-xl ml-3 hover:navbar-main-color red-transition'>Late Night Chill</span>
                </Link>
            </div>

            <div className=''>
                <ul className='md:flex justify-center items-center gap-7 hidden'>
                    <li><Link href={"/anime"} className='navbar-hover'>Anime</Link></li>
                    <li><Link href={"/movies"} className='navbar-hover'>Movies</Link></li>
                    <li><Link href={"/tvShows"} className='navbar-hover'>TV Shows</Link></li>
                </ul>
            </div>
            
            <div className='flex px-5 gap-5'>
                {
                    session && session?.user ? (
                    <>
                        <form action={async()=>{
                            "use server";
                            await signOut({redirectTo : "/"});
                        }}>
                            <Button type='submit'><span className='max-xl:hidden xl:inline text-sm'>Log Out</span><LogOut color='var(--main-red)' height={18}/></Button>
                        </form>
                    </>)
                        :
                    (<>
                        <form action={async()=>{
                            "use server";
                            await signIn('google')
                    }}>
                        <Button type='submit'><span className='max-xl:hidden xl:inline text-sm'>Sign In</span><FcGoogle/></Button>
                    </form>

                    <form action={async()=>{
                            "use server";
                            await signIn("github");
                        }
                    }>
                        <Button type='submit'><span className='max-xl:hidden xl:inline text-sm'>Sign In</span><FaGithub /></Button>
                    </form>
                    </>)
                }
                <ModeToggle />
            </div>
        </nav>
    </header>
  )
}

export default Navbar
