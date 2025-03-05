import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";
import UpdateUserDataForm from "@/components/UpdateUserDataForm";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { useUser } from "@/context/UserContext";
import { format, parseISO } from "date-fns";

export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return null;
  const {
    email,
    created_at,
    user_metadata: { full_name, avatar_url },
  } = user;

  const joinedDate = format(parseISO(created_at), "yyyy/MM/dd");

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-5xl flex flex-col space-y-6">
      <div className="bg-white/40 overflow-hidden backdrop-blur-md backdrop-saturate-150 rounded-xl shadow-xl">
        {/* Profile header with avatar */}
        <div className="relative h-72">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="bg_pattern"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <rect x="5" y="5" width="40" height="40" fill="#fff4e5"></rect>
                <rect x="55" y="5" width="40" height="40" fill="#f9ddd8"></rect>
                <rect x="5" y="55" width="40" height="40" fill="#f9ddd8"></rect>
                <rect
                  x="55"
                  y="55"
                  width="40"
                  height="40"
                  fill="#fff4e5"
                ></rect>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="#fffefb"></rect>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#bg_pattern)"
              opacity={0.5}
            ></rect>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Profile Image with Yellow Background */}
            <div className="w-24 h-24 mb-4 relative">
              <div className="absolute inset-0 bg-primary-900 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                  <Avatar
                    src={avatar_url ?? "public/default-avatar.png"}
                    size="large"
                  />
                </div>
              </div>
            </div>

            <Heading level="h2">{full_name || "User"} 🍳</Heading>
            {/* Joined Date */}
            <p className="text-accent-500">Joined on {joinedDate}</p>
          </div>
        </div>
      </div>
      <div className="sm:mx-auto w-full">
        <UpdateUserDataForm full_name={full_name} email={email} />

        <ResetPasswordForm />
      </div>
    </div>
  );
}
