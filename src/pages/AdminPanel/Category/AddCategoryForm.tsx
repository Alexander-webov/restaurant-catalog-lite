import { useState } from "react";
import {
  addNewCategoryInTable,
  uploadAndSaveImage,
} from "../../../shared/api/catalog";
type Props = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddCategoryForm = ({ closeForm }: Props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function addNewCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let publicUrl: string | undefined;
      if (file) {
        publicUrl = await uploadAndSaveImage("categories", file);
      }

      await addNewCategoryInTable({
        name,
        slug: category,
        img: publicUrl,
      });

      setName("");
      setCategory("");
      setFile(null);
      closeForm(false);
    } catch (error) {
      alert(error ?? "A new category has not been created");
    }
  }

  return (
    <form onSubmit={(e) => addNewCategory(e)}>
      <input
        className="border px-2 py-3 w-full border-black mb-2"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border px-2 py-3 w-full mb-2 border-black"
        type="text"
        placeholder="category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="mb-2 w-full"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button className="text-white bg-black block w-full py-3">Add</button>
    </form>
  );
};

export default AddCategoryForm;
