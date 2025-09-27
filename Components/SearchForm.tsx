import Form from "next/form";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";

const SearchForm = ({ name }: { name?: string }) => {
  return (
    <Form
      action="/anime"
      className="flex items-center max-lg:ml-[5vw] lg:justify-center w-full px-4"
    >
      <div className="relative max-sm:w-[80%] sm:w-[70%] max-w-xl">
        <Input
          type="text"
          name="name"
          id="name"
          defaultValue={name}
          className="w-full pr-12 text-lg"
          placeholder="Search for an anime"
        />
        <button
          type="submit"
          className="absolute inset-y-0 -right-3 flex items-center pr-3 cursor-pointer"
        >
          <CiSearch className="bg-red-400 text-white rounded p-1" size={34} />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
