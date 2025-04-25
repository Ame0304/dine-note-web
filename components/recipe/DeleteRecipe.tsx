import { useState } from "react";
import useDeleteRecipe from "@/hooks/recipes/useDeleteRecipe";

import Button from "@/components/Button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

export default function DeleteRecipe({
  id,
  title,
  buttonVariant,
  icon,
}: {
  id: string;
  title: string;
  buttonVariant?: "link" | "outline";
  icon?: React.ReactNode;
}) {
  const { isDeleting, deleteRecipe } = useDeleteRecipe();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleDeleteConfirm = () => {
    deleteRecipe(id);
    setIsOpenDelete(false);
  };

  return (
    <div>
      <Button
        className="hover:text-accent-400 hover:border-accent-400 font-medium"
        variant={buttonVariant}
        icon={icon || null}
        onClick={() => setIsOpenDelete(true)}
      >
        Delete
      </Button>
      <ConfirmDeleteDialog
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
        title="Recipe"
        itemName={title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
