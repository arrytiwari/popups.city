"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_PASSWORD = "1234"; // Change this!

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [villages, setVillages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    if (authenticated) fetchVillages();
    // eslint-disable-next-line
  }, [authenticated, statusFilter]);

  const fetchVillages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("popupVillages")
      .select("*")
      .eq("status", statusFilter)
      .order("created_at", { ascending: false });
    setVillages(data || []);
    setLoading(false);
  };

  const handleAction = async (id: string, action: "accepted" | "declined") => {
    await supabase
      .from("popupVillages")
      .update({ status: action })
      .eq("id", id);
    fetchVillages();
  };

  const handleEdit = async (id: string, name: string, description: string, theme: string) => {
    await supabase
      .from("popupVillages")
      .update({ name, description, theme })
      .eq("id", id);
    fetchVillages();
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          className="w-full border p-2 rounded mb-2"
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={() => setAuthenticated(password === ADMIN_PASSWORD)}
        >
          Login
        </button>
        {password && password !== ADMIN_PASSWORD && (
          <div className="text-red-500 mt-2">Incorrect password</div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {villages.map(v => (
            <li key={v.id} className="border p-4 rounded flex flex-col md:flex-row md:items-center gap-4">
              <img src={v.image_url} alt={v.name} className="w-32 h-32 object-cover rounded" />
              <div className="flex-1">
                <input
                  className="w-full border p-1 rounded mb-1"
                  value={v.name}
                  onChange={e => handleEdit(v.id, e.target.value, v.description, v.theme)}
                />
                <textarea
                  className="w-full border p-1 rounded mb-1"
                  value={v.description}
                  onChange={e => handleEdit(v.id, v.name, e.target.value, v.theme)}
                />
                <input
                  className="w-full border p-1 rounded mb-1"
                  value={v.theme}
                  onChange={e => handleEdit(v.id, v.name, v.description, e.target.value)}
                />
                <div>Status: {v.status}</div>
                <div className="flex gap-2 mt-2">
                  {v.status !== "accepted" && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(v.id, "accepted")}
                    >
                      Accept
                    </button>
                  )}
                  {v.status !== "declined" && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleAction(v.id, "declined")}
                    >
                      Decline
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 