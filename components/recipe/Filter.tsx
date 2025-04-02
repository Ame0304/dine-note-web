import { useRouter } from "next/router";
import { useCategories } from "@/hooks/categories/useCategories";

export default function Filter({ userId }: { userId?: string | undefined }) {
  const router = useRouter();
  const { categories } = useCategories(userId);

  const handleFilterCategory = (value: string) => {
    const query = { ...router.query };

    if (value === "0") {
      delete query.filter;
    } else {
      query.filter = value;
    }

    // Reset pagination when filter changes
    delete query.page;

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
      className="px-3 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-400 shadow-md shadow-accent-400 text-accent-400 font-medium"
      onChange={(e) => handleFilterCategory(e.target.value)}
      value={String(router.query.filter || "0")}
    >
      <option value="0"> All Categories </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
