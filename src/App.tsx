import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import AllBooksPage from './pages/AllBooksPage';
import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';
import BorrowBookPage from './pages/BorrowBookPage';
import BorrowSummaryPage from './pages/BorrowSummaryPage';
import SingleBookPage from './pages/SingleBookPage';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/" />} />
        <Route path="books" element={<AllBooksPage />} />
        <Route path="/books/:id" element={<SingleBookPage />} />
        <Route path="create-book" element={<CreateBookPage />} />
        <Route path="edit-book/:id" element={<EditBookPage />} />
        <Route path="borrow/:bookId" element={<BorrowBookPage />} />
        <Route path="borrow-summary" element={<BorrowSummaryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
