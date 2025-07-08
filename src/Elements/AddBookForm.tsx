import { useCreateBookMutation } from '@/redux/features/book/book.api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AddBookForm() {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      copies: Number(formData.copies),
      available: formData.copies > 0,
    };
    await createBook(data);
    navigate('/books');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <Label>Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label>Author</Label>
        <Input name="author" value={formData.author} onChange={handleChange} required />
      </div>
      <div>
        <Label>Genre</Label>
        <Input name="genre" value={formData.genre} onChange={handleChange} required />
      </div>
      <div>
        <Label>ISBN</Label>
        <Input name="isbn" value={formData.isbn} onChange={handleChange} required />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <Label>Copies</Label>
        <Input
          name="copies"
          type="number"
          min={0}
          value={formData.copies}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add Book</Button>
    </form>
  );
}
