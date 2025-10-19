import React from 'react'
import { Button } from './ui/button'

interface heroProps{
  type:"movie" | "tvShow"
  text : string,
  inHome : boolean
}
const ShowsHero = ({text , inHome,type} : heroProps) => {
  let header : string = ""
  let description : string = ""
  
  if(text === "discover"){
    header = `Discover Amazing ${type}s`
    description = `Explore the world of ${type}s with our curated collection of box office ${type}s and more`
  }

  if(text === "topRated"){
    header = "Top Rated"
    description = `Enjoy the elite Collection that contains only the top ${type}s that are hard to Dislike`
  }

  if(text === "popular"){
    header = "Popular Works"
    description = `Dive into the ${type}s that have been approved by the majority of people`
  }

  if(text === "latest"){
  header = "Latest"
  description = `The Latest Box Office ${type}s and More of the very newly released Works`    
  }
  return (
      <div className="w-[90%] ml-[5%] rounded-lg h-[400px] bg-cover bg-no-repeat bg-center show-bg">
        <div className="relative z-10 text-white top-[15%] left-[5%]">
          <h1 className="text-3xl max-md:text-xl font-bold mb-5">
            {header}
          </h1>
          <p className="max-w-[500px] max-md:max-w-[300px]">
            {description}
          </p>
          <Button className={`bg-transparent border border-white text-white mt-2 ${inHome ?"" : "hidden"}`}>
            Get Started
          </Button>
        </div>
      </div>
  )
}

export default ShowsHero
