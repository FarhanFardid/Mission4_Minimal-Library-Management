const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-5 border-t mt-auto">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold">Library Management</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
