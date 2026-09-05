import { LoaderCircle, Search } from "lucide-react";

type SearchBarProps = {
  city: string;
  setCity: (value: string) => void;
  handleSearch: () => void;
  loading: boolean;
};

export default function SearchBar({
  city,
  setCity,
  handleSearch,
  loading,
}: SearchBarProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          disabled={loading}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-400"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="h-5 w-5" />
            Search
          </>
        )}
      </button>
    </div>
  );
}