export const Searchbar = ({
  searchTerm: searchValue,
  setSearchTerm: setSearchValue,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => (
  <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search by name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  </form>
);
