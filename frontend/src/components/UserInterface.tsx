"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponents from "../components/CardComponents";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface = ({ backendName }: UserInterfaceProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [backendName, apiUrl]);

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/api/${backendName}/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/${backendName}/users`,
        newUser
      );
      setUsers((prev) => [response.data, ...prev]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/api/${backendName}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user: User) => {
    setUpdateUser({ id: user.id.toString(), name: user.name, email: user.email });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Users</h1>
      <form
        onSubmit={updateUser.id ? handleUpdate : handleCreate}
        className="bg-blue-500 text-white max-w-sm font-bold text-xl rounded-xl shadow-lg p-4 mb-4 justify-center mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">{updateUser.id ? "Update User" : "Create User"}</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 text-gray-600"
          value={updateUser.id ? updateUser.name : newUser.name}
          onChange={(e) =>
            updateUser.id
              ? setUpdateUser({ ...updateUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 text-gray-600"
          value={updateUser.id ? updateUser.email : newUser.email}
          onChange={(e) =>
            updateUser.id
              ? setUpdateUser({ ...updateUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          {updateUser.id ? "Confirm Update" : "Create"}
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <CardComponents
            key={user.id}
            user={user}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInterface;