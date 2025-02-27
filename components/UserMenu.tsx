import { useUser } from "@/context/UserContext";
import Avatar from "./Avatar";
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMenu() {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <Avatar src={user?.user_metadata.avatar_url} />
      ) : (
        <button
          type="button"
          className="rounded-full bg-accent-300 p-2 text-accent-500 hover:text-primary-950"
        >
          <span className="sr-only">View profile</span>
          <UserIcon className="size-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
