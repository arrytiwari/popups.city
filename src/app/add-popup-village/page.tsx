"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const THEMES = ["Art", "Music", "Food", "Tech", "Nature", "Other"];

const LOCATIONS = [
  "Forest Island, Malaysia",
  "Fumba Town, Tanzania",
  "Austin, USA",
  "Other"
];

export default function AddPopupVillage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState(THEMES[0]);
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!image) {
      setError("Please select an image.");
      setLoading(false);
      return;
    }

    console.log("Uploading image:", image);

    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from("popup-villages-images")
      .upload(fileName, image);

    if (storageError) {
      console.error("Supabase storage upload error:", storageError);
      setError("Image upload failed.");
      setLoading(false);
      return;
    }

    const imageUrl = supabase
      .storage
      .from("popup-villages-images")
      .getPublicUrl(fileName).data.publicUrl;

    const { error: dbError } = await supabase
      .from("popupVillages")
      .insert([
        {
          name,
          description,
          image_url: imageUrl,
          theme,
          status: "pending",
          location,
          start_date: startDate,
          end_date: endDate,
          link,
        },
      ]);

    if (dbError) {
      setError("Submission failed.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add a Popup Village</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded"
          value={theme}
          onChange={e => setTheme(e.target.value)}
        >
          {THEMES.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          className="w-full border p-2 rounded"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          {LOCATIONS.map(loc => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            placeholder="Start Date"
            title="Start Date"
          />
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
            placeholder="End Date"
            title="End Date"
          />
        </div>
        <input
          className="w-full border p-2 rounded"
          placeholder="External Link (https://...)"
          value={link}
          onChange={e => setLink(e.target.value)}
          type="url"
          required
        />
        <input
          className="w-full"
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
} 