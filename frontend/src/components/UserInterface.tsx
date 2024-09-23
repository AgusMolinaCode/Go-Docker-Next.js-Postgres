"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponents from "../components/CardComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserSchema } from "@/lib/validator";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User, UserInterfaceProps } from "@/types/user";

const UserInterface = ({ backendName }: UserInterfaceProps) => {
  const apiUrl = process.env.NODE_ENV === "production" 
    ? "https://go-docker-nextjs-postgres-go.up.railway.app" 
    : "http://localhost:8000";
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleCreate = async (values: z.infer<typeof UserSchema>) => {
    const userData = {
      name: values.name,
      email: values.email,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/api/${backendName}/users`,
        userData
      );
      setUsers((prev) => [response.data, ...prev]);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
    form.setValue("name", user.name);
    form.setValue("email", user.email);
  };

  const handleUpdate = async (values: z.infer<typeof UserSchema>) => {
    if (!editingUser) return;

    const updatedUserData = {
      name: values.name,
      email: values.email,
    };

    try {
      await axios.put(`${apiUrl}/api/${backendName}/users/${editingUser.id}`, updatedUserData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUserData } : user
        )
      );
      setEditingUser(null);
      setIsEditing(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/api/${backendName}/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Users</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(isEditing ? handleUpdate : handleCreate)}
          className="bg-blue-500 text-white max-w-sm font-bold text-xl rounded-xl shadow-lg p-4 mb-4 justify-center mx-auto"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="pt-4 flex flex-col gap-2 relative">
                    <Label htmlFor="name" className="text-white text-[1rem]">
                      Name
                    </Label>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      className="col-span-3 placeholder:text-gray-500 rounded-xl border-gray-500 text-black font-bold placeholder:text-right"
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-black" />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0 relative">
                <FormControl>
                  <div className="pt-4 flex flex-col gap-2">
                    <Label htmlFor="email" className="text-white text-[1rem]">
                      Email
                    </Label>
                    <Input
                      {...field}
                      id="email"
                      type="text"
                      className="col-span-3 placeholder:text-gray-500 rounded-xl border-gray-500 text-black font-bold placeholder:text-right"
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-black" />
              </FormItem>
            )}
          />
          <div className="pt-4 flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white"
            >
              {isEditing ? "Confirm Edit" : "Add User"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <CardComponents
            key={user.id}
            user={user}
            onDelete={() => handleDelete(user.id)}
            onEdit={() => handleEdit(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInterface;