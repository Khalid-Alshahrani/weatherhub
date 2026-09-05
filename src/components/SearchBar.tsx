type SearchBarProps = {
  city: string;
  setCity: (value: string) => void;
  handleSearch: () => void;
};

export default function SearchBar({
  city,
  setCity,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 border rounded-xl px-5 py-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl text-lg font-semibold transition"
      >
        Search
      </button>
    </div>
  );
}