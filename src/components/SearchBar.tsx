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
    <div className="relative w-full mb-10">
      <input
        type="text"
        placeholder="🔍 Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-lg text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}