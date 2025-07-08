import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery } from '@/redux/features/book/book.api';
import { Button } from '@/components/ui/button';

const SingleBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id!);
  console.log(book);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !book) return <p className="text-center text-red-500">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{book?.data?.title}</h1>

      <div className="space-y-3 text-gray-700">
        <p><span className="font-semibold">Author:</span> {book?.data?.author}</p>
        <p><span className="font-semibold">Genre:</span> {book?.data?.genre}</p>
        <p><span className="font-semibold">ISBN:</span> {book?.data?.isbn}</p>
        <p><span className="font-semibold">Copies:</span> {book?.data?.copies}</p>
        <p><span className="font-semibold">Available:</span> {book?.data?.available ? 'Yes' : 'No'}</p>
        <p><span className="font-semibold">Description:</span> {book?.data?.description || 'N/A'}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <Button className='bg-blue-500' onClick={() => navigate(`/edit-book/${book?.data?._id}`)}>Edit</Button>
        <Button className='bg-green-600'  onClick={() => navigate(`/borrow/${book?.data?._id}`)} disabled={!book?.data?.available}>
          Borrow
        </Button>
        <Button variant="outline" className='bg-yellow-200' onClick={() => navigate('/books')}>Back to List</Button>
      </div>
    </div>
  );
};

export default SingleBookPage;
