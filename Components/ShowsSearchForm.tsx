import Form from "next/form"
import { Input } from "./ui/input"
import { CiSearch } from "react-icons/ci"

    interface ShowsSearchForm{
        name ?: string,
        type : 'movie' | 'tv'
    }

const ShowsSearchForm = ({name , type} : ShowsSearchForm) => {
    return (
        <Form action={`${type === "movie" ? "/movies" : "tvShows" }`} className="flex items-center justify-center gap-3">
<div className="relative max-sm:w-[80%] sm:w-[70%] max-w-xl">
        <Input
          type="text"
          name="name"
          id="name"
          defaultValue={name}
          className="w-full pr-12 text-lg"
          placeholder={`Search for a ${type}`}
        />
        <button
          type="submit"
          className="absolute inset-y-0 -right-3 flex items-center pr-3 cursor-pointer"
        >
          <CiSearch className="bg-red-400 text-white rounded p-1" size={34} />
        </button>
      </div>
        </Form>
    )
}

export default ShowsSearchForm
