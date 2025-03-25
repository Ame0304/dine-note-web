import Image from "next/image";
import FileInput from "./FileInput";

interface ImageUploadFieldProps {
  imageUrl: string;
  onImageChange: (file: File) => void;
}

export default function ImageUploadField({
  imageUrl,
  onImageChange,
}: ImageUploadFieldProps) {
  return (
    <div className="ml-2 mb-3 flex items-center justify-start gap-5">
      <label htmlFor="imageUrl" className="text-lg font-semibold">
        Image
      </label>
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-200 shadow-lg shadow-primary-900">
        <Image
          src={imageUrl}
          alt={"Recipe image"}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <FileInput
        accept="image/*"
        id="imageUrl"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onImageChange(e.target.files[0]);
          }
        }}
      >
        Change Image
      </FileInput>
    </div>
  );
}
