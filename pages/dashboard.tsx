import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { user } = useUser();
  return <h1>Welcome to your kitchen, {user?.user_metadata.full_name}!</h1>;
}
