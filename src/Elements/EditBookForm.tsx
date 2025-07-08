import { useUpdateBookMutation, useGetBookByIdQuery } from '@/redux/features/book/book.api';
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
  const { data: book } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState<IBookFormData>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
  });

  useEffect(() => {
    if (book) {
      const { title, author, genre, isbn, description, copies } = book;
      setFormData({
        title,
        author,
        genre,
        isbn,
        description: description || '',
        copies,
      });
    }
  }, [book]);

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
    await updateBook({
      id: id!,
      data: {
        ...formData,
        available: formData.copies > 0,
      },
    });
    navigate('/books');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {(Object.keys(formData) as (keyof IBookFormData)[])
        .filter((key) => key !== 'description' && key !== 'copies')
        .map((field) => (
          <div key={field}>
            <Label>{field}</Label>
            <Input
              name={field}
              value={formData[field] as string}
              onChange={handleChange}
              required
            />
          </div>
        ))}

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Copies</Label>
        <Input
          name="copies"
          type="number"
          value={formData.copies}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit">Update Book</Button>
    </form>
  );
}
