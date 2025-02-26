import Avatar from "@/components/Avatar";
import { useUser } from "@/context/UserContext";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const { user } = useUser();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
      <h1 className="text-2xl font-bold text-primary-100 mb-6 text-center">
        My Profile
      </h1>
      <div className="bg-white/40 backdrop-blur-md backdrop-saturate-150 p-6 rounded-xl border border-primary-800/30 shadow-xl">
        {/* Profile header with avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <Avatar src={user?.user_metadata.avatar_url} size="large" />
            <button className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-primary-100 transition-opacity">
              <PencilIcon className="w-6 h-6" />
            </button>
            <input type="file" accept="image/*" className="hidden" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">
            {user?.user_metadata?.full_name || "User"}
          </h2>
          <p className="text-primary-500 text-sm">Member since 2024/02/15</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-primary-800/30">
            <div>
              <p className="text-sm text-primary-400">Email</p>
              <p>{user?.email}</p>
            </div>
            <div className="text-xs text-primary-400 mt-2 sm:mt-0">
              Cannot be changed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
