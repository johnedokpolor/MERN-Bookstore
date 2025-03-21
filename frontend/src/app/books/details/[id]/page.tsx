"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/app/components/Loader";

const BookDetail = () => {
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

  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  // Fetch Books as Page Loads Up
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://mern-bookstore-backend-sego.onrender.com/books/${id}`
        );
        const { data } = response;
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  });

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="font-bold text-3xl ">Book Details</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-4 bg-gray-800 p-5 rounded-lg">
          {book?.imageUrl && (
            <Image
              width={50}
              height={50}
              className="w-50  mx-auto h-50 rounded-lg object-cover"
              alt="Book Image"
              src={book.imageUrl}
            />
          )}
          <h1 className="font-bold text-lg">Id: {book?._id}</h1>
          <h1 className="font-bold text-lg">Title:{book?.title}</h1>
          <h1 className="font-bold text-lg">Author: {book?.author}</h1>
          <h1 className="font-bold text-lg">
            PublishYear: {book?.publishYear}
          </h1>
          {book?.createdAt && (
            <h1 className="font-bold text-lg">
              Creation Time: {new Date(book?.createdAt).toString().slice(0, 25)}
            </h1>
          )}
          {book?.updatedAt && (
            <h1 className="font-bold text-lg">
              Last Update Time:{" "}
              {new Date(book.updatedAt).toString().slice(0, 25)}
            </h1>
          )}
          <Link href={`/`} className="px-4  rounded-md py-1 bg-blue-500">
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
