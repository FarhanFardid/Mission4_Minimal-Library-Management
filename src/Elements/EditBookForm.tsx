import {
  useUpdateBookMutation,
  useGetBookByIdQuery,
} from '@/redux/features/book/book.api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type IBookFormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
};

export default function EditBookForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: bookResponse, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState<IBookFormData>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
  });

  useEffect(() => {
    if (bookResponse?.data && !isLoading) {
      const { title, author, genre, isbn, description, copies } = bookResponse.data;
      setFormData({
        title,
        author,
        genre,
        isbn,
        description: description || '',
        copies,
      });
    }
  }, [bookResponse, isLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'copies' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        id: id!,
        data: {
          ...formData,
          available: formData.copies > 0,
        },
      }).unwrap();
      navigate('/books');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) return <p className="text-center">Loading book details...</p>;
  if (isError) return <p className="text-center text-red-500"> Failed to load book data</p>;

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Book Info</h2>


      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className='my-2'
        />
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
           className='my-2'
        />
      </div>

  

      <div>
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
           className='my-2'
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
           className='my-2'
        />
      </div>

     
      <div>
        <Label htmlFor="copies">Copies</Label>
        <Input
          id="copies"
          name="copies"
          type="number"
          value={formData.copies}
          onChange={handleChange}
          min={0}
          required
           className='my-2'
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600" disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Book'}
      </Button>
    </form>
  );
}
