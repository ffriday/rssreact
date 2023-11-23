import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { QueryParams } from "../constants/types";

type TSearchProps = {
  searchQuery: string;
}

export default function Search({searchQuery}: TSearchProps): JSX.Element {
  const router = useRouter();

  const search = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get(QueryParams.searcInputName) || '';
    router.push(query.toString());
  };

  return (
    <form className="flex" onSubmit={(event) => search(event)}>
      <input
        defaultValue={searchQuery}
        placeholder="Type something"
        className="flex h-6 sm:h-7 ml-2 sm:ml-0 content-center justify-center flex-wrap rounded mt-1"
        type={QueryParams.searcInputName}
        name={QueryParams.searcInputName}
      ></input>
      <button
        className="flex h-6 sm:h-7 content-center justify-center flex-wrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 mt-1"
      >
        Search
      </button>
    </form>
  );
}


