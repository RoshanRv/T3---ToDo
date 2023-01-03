import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { number, string } from "zod";
import Spinner from "../../components/Spinner";
import { trpc } from "../../utils/trpc";

const Note = () => {
  const { id } = useRouter().query;
  const { data: note, isLoading } = trpc.notes.getNoteById.useQuery({
    id: Number(id),
  });

  return (
    <main className="flex min-h-screen w-full flex-col  gap-y-6 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-6">
      <Link href={"/"}>
        <h1 className="text-2xl text-white">Back</h1>
      </Link>

      {/*          */}

      <h1 className="text-3xl font-semibold text-white">Note</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto w-11/12 border-8 border-blue-700 bg-white px-6 py-3 md:w-9/12 lg:w-7/12">
          {/*     title     */}
          <h1 className=" text-3xl font-semibold text-purple-700 ">
            {note?.title}
          </h1>

          {/*   desc   */}
          <h1 className="text-lg">{note?.description}</h1>
        </div>
      )}
    </main>
  );
};

export default Note;
