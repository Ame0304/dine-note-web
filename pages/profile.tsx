import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import FormRowHorizontal from "@/components/FormRowHorizontal";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import { useUser } from "@/context/UserContext";
import { format, parseISO } from "date-fns";

export default function Profile() {
  const { user } = useUser();

  const joinedDate = user
    ? format(parseISO(user.created_at), "yyyy/MM/dd")
    : "N/A";

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
                  <Avatar src={user?.user_metadata.avatar_url} size="large" />
                </div>
              </div>
            </div>

            <Heading level="h2">
              {user?.user_metadata?.full_name || "User"} 🍳
            </Heading>
            {/* Joined Date */}
            <p className="text-accent-500">Joined on {joinedDate}</p>
          </div>
        </div>
      </div>
      <div className="sm:mx-auto w-full">
        {/* User profile form */}
        <div className="space-y-2 flex flex-col justify-between p-10 rounded-xl bg-white ">
          <Heading level="h3">Updating user information</Heading>
          <form>
            <FormRowHorizontal label="Full Name">
              <Input value={user?.user_metadata.full_name} id="fullName" />
            </FormRowHorizontal>
            <FormRowHorizontal
              label="Email"
              error="Full name cannot be changed"
            >
              <Input placeholder={user?.email} id="email" disabled />
            </FormRowHorizontal>

            <FormRowHorizontal label="Avatar" error="">
              <div className="w-40">
                <Button size="regular">Change Avatar</Button>
              </div>
            </FormRowHorizontal>
            {/* Save button and cancel button */}
            <div className="mt-10 flex justify-end space-x-5">
              <Button size="regular" type="submit">
                Save Changes
              </Button>
              <Button size="regular" type="submit">
                Cancel
              </Button>
            </div>
          </form>
        </div>
        {/* Reset Passowrd form */}
        <div className="mt-5 space-y-2 flex flex-col justify-between p-10 rounded-xl bg-white ">
          <Heading level="h3">Reset Password</Heading>
          <form>
            <FormRowHorizontal label="Password" error="">
              <Input
                placeholder="Reset password"
                id="password"
                type="password"
              />
            </FormRowHorizontal>
            <FormRowHorizontal label="Confirm Password" error="">
              <Input
                placeholder="Confirm Password"
                id="confirmPassword"
                type="password"
              />
            </FormRowHorizontal>
            <div className="mt-10 flex justify-end space-x-5">
              <Button size="regular" type="submit">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
