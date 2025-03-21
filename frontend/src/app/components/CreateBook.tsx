"use client";
import axios from "axios";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import Loader from "./Loader";

// Type Interface for Props Object
interface Props {
  create: (create: boolean) => void;
}

const CreateBook = ({ create }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    imageUrl: "",
  });

  // Dynamically Update Book State
  const handleChange = (e: React.SyntheticEvent) => {
    const InputValue = e.currentTarget as HTMLInputElement;
    setBook((prev) => {
      return { ...prev, [InputValue.name]: InputValue.value };
    });
  };

  // Call API to Create Book
  const handleCreateBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!book.title || !book.author || !book.publishYear || !book.imageUrl) {
        return;
      }
      setLoading(true);
      const response = await axios.post(`http://localhost:1000/books`, book);
      console.log(response.data);
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      setTimeout(() => {
        create(false);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Book Creation Failed, check console for more details", {
        variant: "error",
      });
    }
  };

  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-gray-800/90 flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleCreateBook}
          className="flex w-full lg:w-1/2 flex-col bg-gray-900 p-10 gap-3"
        >
          <h1 className="text-lg font-bold">Create Book</h1>
          <input
            className="bg-gray-600 px-2 rounded-md  h-10 w-full"
            type="text"
            onChange={handleChange}
            placeholder="Title"
            name="title"
            value={book.title}
            required
          />
          <input
            className="bg-gray-600 px-2 rounded-md  h-10 w-full"
            type="text"
            onChange={handleChange}
            placeholder="Author"
            name="author"
            value={book.author}
            required
          />
          <input
            className="bg-gray-600 px-2 rounded-md  h-10 w-full"
            type="number"
            onChange={handleChange}
            placeholder="PublishYear"
            name="publishYear"
            value={book.publishYear}
            required
          />
          <input
            className="bg-gray-600 px-2 rounded-md  h-10 w-full"
            type="text"
            onChange={handleChange}
            placeholder="Image Url"
            name="imageUrl"
            value={book.imageUrl}
            required
          />
          <div className="flex gap-4">
            <button className="px-3 py-1 w-30 cursor-pointer bg-gray-700 rounded-sm">
              Create Book
            </button>
            <button
              onClick={() => create(false)}
              className="px-3 py-1  cursor-pointer bg-gray-700 rounded-sm"
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBook;
