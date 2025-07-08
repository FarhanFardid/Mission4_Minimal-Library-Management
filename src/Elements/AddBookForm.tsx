import { useCreateBookMutation } from '@/redux/features/book/book.api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AddBookForm() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      copies: Number(formData.copies),
      available: Number(formData.copies) > 0,
    };
    // console.log(data);

     await createBook(data).unwrap();
    // console.log(res);
    navigate('/books');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-5">
         <h2 className="text-2xl font-semibold text-center mb-4">Add New Book </h2>
      <div>
        <Label>Title</Label>
        <Input type="text" name="title" value={formData.title} onChange={handleChange} required className='my-2'/>
      </div>
      <div>
        <Label>Author</Label>
        <Input type='text' name="author" value={formData.author} onChange={handleChange} required  className='my-2'/>
      </div>
<div>
  <Label htmlFor="genre">Genre</Label>
  <select
    id="genre"
    name="genre"
    onChange={handleChange}
    value={formData.genre}
    required
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2"
  >
    <option value="">Select a genre</option>
    <option value="FICTION">FICTION</option>
    <option value="NON_FICTION">NON_FICTION</option>
    <option value="SCIENCE">SCIENCE</option>
    <option value="HISTORY">HISTORY</option>
    <option value="BIOGRAPHY">BIOGRAPHY</option>
    <option value="FANTASY">FANTASY</option>
  </select>
</div>
      <div>
        <Label>ISBN</Label>
        <Input name="isbn" value={formData.isbn} onChange={handleChange} required className='my-2' />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea  name="description" value={formData.description} onChange={handleChange} className='my-2' />
      </div>
      <div>
        <Label>Copies</Label>
        <Input
          name="copies"
          type="number"
          min={1}
          value={formData.copies}
          onChange={handleChange}
          required
          className='my-2'
        />
      </div>
      <Button type="submit" className="w-full bg-blue-600" disabled={isLoading}> {isLoading ? 'Adding...' : 'Add Book'}</Button>
    </form>
  );
}
