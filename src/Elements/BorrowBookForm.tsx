import { useBorrowBookMutation } from '@/redux/features/book/book.api';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BorrowForm() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await borrowBook({
      book: bookId,
      quantity: Number(formData.quantity),
      dueDate: formData.dueDate,
    });
    navigate('/borrow-summary');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-5">
        <h2 className="text-2xl font-semibold text-center mb-4">Borrow A Book </h2>
      <div>
        <Label>Quantity</Label>
        <Input
          name="quantity"
          type="number"
          min={1}
          value={formData.quantity}
          onChange={handleChange}
          className='my-2'
          required
        />
      </div>
      <div>
        <Label>Due Date</Label>
        <Input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className='my-2'
          required
        />
      </div>
      <Button type="submit" className="w-full bg-blue-600" >Borrow Book</Button>
    
    </form>
  );
}
