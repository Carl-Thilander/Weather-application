export default function SearchBar() {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search for a city..."
        className="w-100 p-4 rounded-lg border-3 text-slate-800 focus:ring-blue-500"
      />
      <button
        className="ml-4 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        aria-label="Search for city"
      >
        Search
      </button>
    </div>
  );
}