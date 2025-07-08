import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../redux/features/book/book.api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import type { IBook } from "@/Interfaces/book";

const AllBooksPage = () => {
  const { data: books, isLoading } = useGetBooksQuery(undefined);
    // console.log(books);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
     const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleOpenDialog = (bookId: string) => {
  setSelectedBookId(bookId);
  setDialogOpen(true);
};

const handleCancel = () => {
  setSelectedBookId(null);
  setDialogOpen(false);
};

const confirmDelete = async () => {
  if (selectedBookId) {
    await deleteBook(selectedBookId);
    setSelectedBookId(null);
    setDialogOpen(false);
  }
};




  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Books</h1>

      <table className="w-full border-collapse border text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Author</th>
            <th className="border px-3 py-2">Genre</th>
            <th className="border px-3 py-2">ISBN</th>
            <th className="border px-3 py-2">Copies</th>
            <th className="border px-3 py-2">Available</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.data?.map((book: IBook) => (
            <tr key={book._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{book.title}</td>
              <td className="border px-3 py-2">{book.author}</td>
              <td className="border px-3 py-2">{book.genre}</td>
              <td className="border px-3 py-2">{book.isbn}</td>
              <td className="border px-3 py-2 text-center">{book.copies}</td>
              <td className="border px-3 py-2 text-center">
                {book.available ? "yes" : "no"}
              </td>
              <td className="border px-3 py-2 flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  className="bg-blue-500"
                  size="sm"
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  className="bg-green-500"
                  size="sm"
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-cyan-400"
                  onClick={() => navigate(`/borrow/${book._id}`)}
                  disabled={!book.available}
                >
                  Borrow
                </Button>
                <Button
                variant="secondary"
                className="bg-red-600"
                  size="sm"
                  onClick={() => handleOpenDialog(book._id)}
                >
                  Delete
                </Button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="bg-white">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this book?</h3>
    <div className="flex justify-end gap-2">
      <Button onClick={handleCancel}>
        Cancel
      </Button>
      <Button  onClick={confirmDelete}>
        Yes, Delete
      </Button>
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
};

export default AllBooksPage;
