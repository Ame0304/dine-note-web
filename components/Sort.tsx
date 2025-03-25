import { useRouter } from "next/router";

export default function Sort() {
  const router = useRouter();
  const handleSort = (value: string) => {
    const query = { ...router.query };
    query.sortBy = value;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <select
      className="px-3 py-1.5 rounded-lg bg-accent-200 focus:outline-none focus:ring-2 focus:ring-accent-300  shadow-md shadow-accent-300 text-accent-300"
      onChange={(e) => handleSort(e.target.value)}
      value={String(router.query.sortBy || "date-desc")}
    >
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="title-asc">Title (A-Z)</option>
      <option value="title-desc">Title (Z-A)</option>
    </select>
  );
}
