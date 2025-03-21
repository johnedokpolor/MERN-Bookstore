"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "../components/Loader";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SnackbarProvider } from "notistack";

import CreateBook from "../components/CreateBook";

const Admin = () => {
  // Type Interface for Book Object
  interface Book {
    _id: number;
    title: string;
    author: string;
    publishYear: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState(false);

  // Dynamically Update the Search Term
  const handleSearch = (e: React.SyntheticEvent) => {
    const InputValue = e.currentTarget as HTMLInputElement;
    setSearch(InputValue.value);
  };

  // Filter Books According to Search Term
  const filteredBooks = books.filter((book: Book) => {
    return search.toLowerCase() === ""
      ? true
      : book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search) ||
          book.publishYear.toString().includes(search);
  });

  // Fetch Books as Page Loads Up
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://mern-bookstore-backend-sego.onrender.com/books"
      );
      const { data } = response.data;
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  fetchBooks();

  const handleDeleteBook = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://mern-bookstore-backend-sego.onrender.com/books/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SnackbarProvider>
      <div className=" gap-4 flex flex-col items-center ">
        {create && <CreateBook create={setCreate} />}
        <h1 className="font-bold text-3xl ">Book Store</h1>
        <div className="md:w-1/2 w-full  flex gap-4">
          <input
            className="h-10 mb-4 px-2 bg-gray-800 flex-1 rounded-lg"
            type="text"
            value={search}
            placeholder="Search Book"
            onChange={handleSearch}
          />
          <FaPlus
            onClick={() => setCreate(true)}
            className="px-2 cursor-pointer text-4xl text-white py-1 bg-gray-800"
          />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="w-full">
            {filteredBooks.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border-1 h-10">No</th>
                    <th className="border-1 h-10">Title</th>
                    <th className="border-1 h-10">Author</th>
                    <th className="border-1 h-10">Publish Year</th>
                    <th className="border-1 h-10">Edit / Delete</th>
                  </tr>
                </thead>
                {filteredBooks.map((book: Book, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="border-1 h-10 text-center">
                          {index + 1}
                        </td>
                        <td className="border-1 h-10 text-center">
                          {book.title}
                        </td>
                        <td className="border-1 h-10 text-center">
                          {book.author}
                        </td>
                        <td className="border-1 h-10 text-center">
                          {book.publishYear}
                        </td>
                        <td className="border-1 flex justify-center gap-2 h-14  items-center">
                          <Link href={`/admin/books/edit/${book._id}`}>
                            <FaEdit className="text-3xl cursor-pointer" />
                          </Link>
                          <Link href={`/admin`}>
                            <MdDelete
                              onClick={() => handleDeleteBook(book._id)}
                              className="text-3xl cursor-pointer text-red-500"
                            />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            ) : (
              <h1 className="text-center cursor-pointer">
                No Books Available😓{" "}
                <span
                  onClick={() => setCreate(true)}
                  className="text-blue-700 underline"
                >
                  Add Books
                </span>
              </h1>
            )}
          </div>
        )}
      </div>
    </SnackbarProvider>
  );
};

export default Admin;
