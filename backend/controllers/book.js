import { Book } from "../models/book.js";

const CreateBook = async (req, res) => {
  const { title, author, publishYear, imageUrl } = req.body;
  try {
    if (!title || !author || !publishYear || !imageUrl) {
      return res.status(400).send({
        message:
          "Provide necessary information e.g title, author, publishYear and imageUrl",
      });
    }
    const newBook = req.body;
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const GetBook = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).send({ count: books.length, data: books });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const GetSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      return res.status(404).send(`No book with the id ${id} exists`);
    }
    return res.status(201).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const EditBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).send(`No book with the id ${id} exists`);
    }
    return res
      .status(200)
      .send({ message: "Book Updated Successfully", updatedBook: book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send(`No book with the id ${id} exists`);
    }
    return res
      .status(200)
      .send({ message: "Book Deleted Successfully", deletedBook: book });
  } catch (error) {}
};

export { CreateBook, GetBook, GetSingleBook, EditBook, DeleteBook };
