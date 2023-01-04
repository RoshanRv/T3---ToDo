import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { NoteDataProp } from "..";
import Spinner from "../../components/Spinner";
import { trpc } from "../../utils/trpc";

const editNote = () => {
  const { id } = useRouter().query;

  const editNoteData = trpc.notes.updateNote.useMutation();

  interface EditDataProp extends NoteDataProp {
    id: number;
  }

  const { data: note, isLoading } = trpc.notes.getNoteById.useQuery(
    {
      id: Number(id),
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    id: Number(id),
  } as EditDataProp);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = { ...editData, title: e.target.value };
    setEditData(data);
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const data = { ...editData, description: e.target.value };
    setEditData(data);
  };

  useEffect(() => {
    if (note) {
      setEditData({
        id: Number(id),
        description: note?.description,
        title: note?.title,
      });
    }
  }, [note]);

  return (
    <main className="flex min-h-screen w-full flex-col gap-y-10 bg-gradient-to-b from-[#2e026d] to-[#15162c] p-10">
      <Link href={"/"}>
        <h1 className="text-2xl text-white">Back</h1>
      </Link>

      {/*          */}

      <h1 className="text-3xl font-semibold text-white">Note</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto flex w-11/12 flex-col gap-y-4  border-2 border-black bg-white/90 p-3 text-center text-white md:w-8/12 lg:w-5/12">
          {/*  Title    */}
          <input
            type="text"
            value={editData.title}
            onChange={(e) => handleTitleChange(e)}
            placeholder="Title"
            className=" bg-violet-800 p-2 outline-0"
          />
          {/*   Desc   */}
          <textarea
            value={editData.description}
            onChange={(e) => handleDescChange(e)}
            placeholder="Description"
            className=" bg-violet-800 p-2 outline-0"
          />

          {/*   Edit  */}
          <button
            onClick={() =>
              editNoteData.mutate({
                id: editData.id,
                description: editData.description,
                title: editData.title,
              })
            }
            className="my-2 w-full  bg-blue-700 py-2"
          >
            Edit Note
          </button>
        </div>
      )}
    </main>
  );
};

export default editNote;
