import AnimeCard from "@/Components/AnimeCard";
import Button from "@/Components/Button";
import ShowsCard from "@/Components/ShowsCard";
import discover from "@/public/discover.webp";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="mt-10">
        <div className="w-[80%] ml-[10%] px-8 py-8 dark:main-gradient inversed-main-gradient flex justify-between rounded-lg dark:text-white text-gray-800">
          <div>
            <h1 className="uppercase font-bold text-xl">
              Discover Your Next Favourite
            </h1>
            <p className="mt-1">
              Organize , Customize , and track all your Anime , Movies , TV
              Shows in one place
            </p>
            <Link href={"#"}>
              <Button className="text-sm mt-7">
                Get Started
              </Button>
            </Link>
          </div>
          <div>
            <Image src={discover} alt="discover" height={150} />
          </div>
        </div>
      </section>
    </>
  );
}
