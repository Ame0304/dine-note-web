import { useUser } from "@/context/UserContext";
import Heading from "@/components/Heading";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <Heading level="h1">
      Welcome to your kitchen, {user?.user_metadata.full_name}!
    </Heading>
  );
}
