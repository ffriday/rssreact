import Link from "next/link";

type TErrorMessage = {
  message: string;
};

export default function DefaultError({ message = 'Error' }: TErrorMessage): JSX.Element {
  return (
    <div className="flex items-center justify-self-center justify-center flex-col gap-4 content-center w-full h-full bg-gray-700 font-mono text-xl">
      <h1 className="text-center">{message}</h1>
      <Link href="/" className="text-center text-red-950">
        Back to main page
      </Link>
    </div>
  );
}
