import type { IBorrow } from '@/Interfaces/borrow';
import { useGetBorrowSummaryQuery } from '../redux/features/book/book.api';


const BorrowSummaryPage = () => {
  const { data : loadedData , isLoading, error } = useGetBorrowSummaryQuery(undefined);
//   console.log(loadedData?.data);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load summary</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Borrow Summary</h1>
      <table className="w-full border-collapse border text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Title</th>
            <th className="border px-4 py-2 text-left">ISBN</th>
            <th className="border px-4 py-2 text-left">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {loadedData?.data?.map((item:IBorrow,index:number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.book.title}</td>
              <td className="border px-4 py-2">{item.book.isbn}</td>
              <td className="border px-4 py-2">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummaryPage;
