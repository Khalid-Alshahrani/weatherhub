"use client";

import {
  LoaderCircle,
  MapPin,
  Search,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type SearchBarProps = {
  city: string;
  setCity: (value: string) => void;
  handleSearch: () => void;
  loading: boolean;
};

type CitySuggestion = {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
};

export default function SearchBar({
  city,
  setCity,
  handleSearch,
  loading,
}: SearchBarProps) {
  const [suggestions, setSuggestions] =
    useState<CitySuggestion[]>([]);

  const [suggestionsLoading, setSuggestionsLoading] =
    useState(false);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState(false);

  const searchContainerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(
          event.target as Node
        )
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    const query = city.trim();

    if (
      query.length < 2 ||
      selectedSuggestion ||
      loading
    ) {
      setSuggestions([]);

      if (query.length < 2) {
        setShowSuggestions(false);
      }

      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setSuggestionsLoading(true);

        const response = await fetch(
          `/api/cities?q=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.error(
            "Autocomplete failed:",
            error
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setSuggestionsLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [city, loading, selectedSuggestion]);

  const handleInputChange = (
    value: string
  ) => {
    setSelectedSuggestion(false);
    setCity(value);
  };

  const handleSuggestionSelect = (
    suggestion: CitySuggestion
  ) => {
    setSelectedSuggestion(true);
    setSuggestions([]);
    setShowSuggestions(false);
    setCity(suggestion.name);
  };

  const handleSubmit = () => {
    setSuggestions([]);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
      <div
        ref={searchContainerRef}
        className="relative flex-1"
      >
        <Search
          size={20}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          disabled={loading}
          autoComplete="off"
          onChange={(event) =>
            handleInputChange(event.target.value)
          }
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }

            if (event.key === "Escape") {
              setShowSuggestions(false);
            }
          }}
          className="h-[58px] w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 sm:h-[60px] sm:text-lg"
        />

        {suggestionsLoading && (
          <LoaderCircle
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
          />
        )}

        {showSuggestions &&
          !loading &&
          suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-300/40">
              {suggestions.map(
                (suggestion, index) => (
                  <button
                    key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                    type="button"
                    onClick={() =>
                      handleSuggestionSelect(
                        suggestion
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-sky-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <MapPin size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800">
                        {suggestion.name}
                      </p>

                      <p className="truncate text-sm text-slate-500">
                        {[
                          suggestion.state,
                          suggestion.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </button>
                )
              )}
            </div>
          )}
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="flex h-[58px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 sm:h-[60px]"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading
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