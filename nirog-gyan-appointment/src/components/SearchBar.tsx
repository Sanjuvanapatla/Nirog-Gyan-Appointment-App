import { Search } from 'lucide-react'; // install lucide-react if you haven't: `npm install lucide-react`

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) => (
  <div className="relative w-full max-w-xl mx-auto">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search doctors by name or specialization..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
    />
  </div>
);

export default SearchBar;
