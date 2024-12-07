import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="py-4 bg-gradient-to-r from-gray-800 to-gray-600 shadow-md bg-black">
      <nav className="flex justify-center gap-6">
        <Link
          href="/"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
        >
          Home
        </Link>
        <Link
          href="/ingredients"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
        >
          Ingredients
        </Link>
        <Link
          href="/recipes"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
        >
          Recipes
        </Link>
        <Link
          href="/reviews"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
        >
          Reviews
        </Link>
        <Link
          href="/users"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
        >
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Header;
