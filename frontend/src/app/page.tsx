"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";

const Home = () => {
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

  // Dynamically Update the Search Term
  const handleSearch = (e: React.SyntheticEvent) => {
    const InputValue = e.currentTarget as HTMLInputElement;
    setSearch(InputValue.value);
  };

  // Fetch Books as Page Loads Up
  useEffect(() => {
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
  }, []);

  // Filter Books According to Search Term
  const filteredBooks = books.filter((book: Book) => {
    return search.toLowerCase() === ""
      ? true
      : book.title.toLowerCase().includes(search) ||
          book.author.toLowerCase().includes(search) ||
          book.publishYear.toString().includes(search);
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="font-bold text-3xl ">Book Store</h1>
      <input
        className="h-10 px-2 bg-gray-800 w-full md:w-1/2 rounded-lg"
        type="text"
        value={search}
        placeholder="Search Book"
        onChange={handleSearch}
      />

      {loading ? (
        <Loader />
      ) : (
        <section className="">
          {filteredBooks.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredBooks?.map((book: Book, index) => {
                return (
                  <div
                    className="w-full relative sm:w-52 bg-gray-700 gap-3 rounded-lg"
                    key={index}
                  >
                    <p className=" text-sm font-bold text-black  bg-white px-3 py-1  absolute top-2 right-2">
                      {book.publishYear}
                    </p>

                    <Link href={`/books/details/${book._id}`}>
                      <div className="w-full h-44 bg-purple-500 rounded-lg">
                        <Image
                          width={50}
                          height={50}
                          className="w-full h-full rounded-t-lg object-cover"
                          alt="Book Image\"
                          src={book.imageUrl}
                        />
                      </div>
                      <div className="p-3">
                        <p className=" text-sm">{book.author}</p>
                        <p className="font-bold text-lg leading-tight ">
                          {book.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>No Books Available 😓</h1>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;
