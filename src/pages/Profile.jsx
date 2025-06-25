import React, { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [form, setForm] = useState({ username: "", email: "" });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/user/profile");
        setUser(data.user || data);
        setForm({
          username: data.user?.username || "",
          email: data.user?.email || "",
        });
      } catch {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    if (form.email !== user.email) payload.email = form.email;
    if (form.username !== user.username) payload.username = form.username;

    if (Object.keys(payload).length === 0) {
      toast("No changes made");
      return;
    }

    try {
      await API.patch("/user/profile", payload);
      toast.success("Profile updated successfully!");
      setUser((prev) => ({ ...prev, ...payload }));
    } catch {
      toast.error("Failed to update profile");
    }
  };


  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 min-h-[60vh] sm:min-h-[80vh]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Profile
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Profile;
