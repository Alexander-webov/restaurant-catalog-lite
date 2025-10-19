import { useState } from "react";
import {
  addNewItemInTable,
  uploadAndSaveImage,
} from "../../../shared/api/catalog";

type Props = {
  closeForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddItemForm = ({ closeForm }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceCents, setPriceCents] = useState(0);
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function addNewItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      let publicUrl: string | undefined;
      if (file) {
        publicUrl = await uploadAndSaveImage("products", file);
      }

      await addNewItemInTable({
        name,
        slug,
        description,
        image: publicUrl || null,
        price_cents: priceCents,
      });

      setName("");
      setSlug("");
      setFile(null);
      closeForm(false);
    } catch (error) {
      alert(error ?? "A new category has not been created");
    }
  }

  return (
    <form onSubmit={(e) => addNewItem(e)}>
      <input
        className="border px-2 py-3 w-full border-black mb-2"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border px-2 py-3 w-full mb-2 border-black"
        type="text"
        placeholder="slug"
        onChange={(e) => setSlug(e.target.value)}
      />
      <input
        className="border px-2 py-3 w-full mb-2 border-black"
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border px-2 py-3 w-full mb-2 border-black"
        type="number"
        placeholder="price"
        onChange={(e) => setPriceCents(+e.target.value)}
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

export default AddItemForm;
