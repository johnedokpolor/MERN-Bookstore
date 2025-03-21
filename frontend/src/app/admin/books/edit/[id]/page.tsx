"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";

// Edit Book Function
const EditBook = () => {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    imageUrl: "",
  });

  // Fetch Books as Page Loads Up and Current Book Details
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://mern-bookstore-backend-sego.onrender.com/books/${id}`
        );
        const { data } = response;
        console.log(data);
        setBook((prev) => {
          return {
            ...prev,
            title: data.title,
            author: data.author,
            publishYear: data.publishYear,
            imageUrl: data.imageUrl,
          };
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  // Dynamically Update Book State
  const handleChange = (e: React.SyntheticEvent) => {
    const InputValue = e.currentTarget as HTMLInputElement;
    setBook((prev) => {
      return { ...prev, [InputValue.name]: InputValue.value };
    });
  };

  // Call Api to Edit Book
  const handleEditBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!book.title || !book.author || !book.publishYear || !book.imageUrl) {
        return;
      }
      // setLoading(true);
      const response = await axios.put(
        `https://mern-bookstore-backend-sego.onrender.com/books/${id}`,
        book
      );
      console.log(response.data);
      window.location.href = "/admin";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-gray-800/90 flex justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleEditBook}
          className="flex w-full lg:w-1/2 flex-col bg-gray-900 p-10 gap-3"
        >
          <h1 className="text-lg font-bold">Edit Book</h1>
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
          <button className="px-3 py-1 w-30 cursor-pointer bg-gray-700 rounded-sm">
            Edit Book
          </button>
        </form>
      )}
    </div>
  );
};

export default EditBook;
