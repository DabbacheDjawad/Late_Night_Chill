"use client";

import { useState } from "react";

interface AnimeFiltersProps {
  onFilterChange: (filters: {
    genre?: string;
    rating?: string;
    type?: string;
  }) => void;
}

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi"
];
const ratings = ["G", "PG", "PG-13", "R", "R+"];
const types = ["TV", "Movie", "OVA", "Special", "ONA", "Music"];

export default function AnimeFilters({ onFilterChange }: AnimeFiltersProps) {
  const [filters, setFilters] = useState<{ genre?: string; rating?: string; type?: string }>({});

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {/* Genre */}
      <select
        className="border rounded-md px-3 py-2 dark:bg-black dark:text-white"
        onChange={(e) => handleChange("genre", e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Rating */}
      <select
        className="border rounded-md px-3 py-2 dark:bg-black dark:text-white"
        onChange={(e) => handleChange("rating", e.target.value)}
      >
        <option value="">All Ratings</option>
        {ratings.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        className="border rounded-md px-3 py-2 dark:bg-black dark:text-white"
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
