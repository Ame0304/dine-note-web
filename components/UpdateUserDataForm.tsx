import { useState } from "react";
import Button from "@/components/Button";
import FormRowHorizontal from "@/components/FormRowHorizontal";
import Input from "@/components/Input";
import Heading from "@/components/Heading";
import FileInput from "./FileInput";
import { updateUser } from "@/lib/services/userService";
import toast from "react-hot-toast";

interface UpdateUserDataFormProps {
  full_name: string;
  email: string | undefined;
}

export default function UpdateUserDataForm({
  full_name,
  email,
}: UpdateUserDataFormProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [fullName, setFullName] = useState(full_name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;
    setIsLoading(true);
    try {
      await updateUser({ fullName, avatar });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
    setIsLoading(false);
  };

  function handleCancel() {
    setFullName(full_name);
    setAvatar(null);
  }

  return (
    <div className="space-y-2 flex flex-col justify-between p-10 rounded-xl bg-white border-4 border-accent-200">
      <Heading level="h3">Updating user information</Heading>
      <form onSubmit={handleSubmit}>
        <FormRowHorizontal label="Full Name">
          <Input
            value={fullName}
            id="fullName"
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        </FormRowHorizontal>
        <FormRowHorizontal label="Email" error="Full name cannot be changed">
          <Input placeholder={email} id="email" disabled />
        </FormRowHorizontal>

        <FormRowHorizontal label="Avatar" error="">
          <div className="w-40">
            <FileInput
              isLoading={isLoading}
              id="avatar"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAvatar(e.target.files[0]);
                }
              }}
            >
              Change Avatar
            </FileInput>
          </div>
        </FormRowHorizontal>
        {/* Save button and cancel button */}
        <div className="mt-10 flex justify-end space-x-5">
          <Button size="regular" type="submit">
            Save Changes
          </Button>
          <Button
            size="regular"
            type="button"
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
