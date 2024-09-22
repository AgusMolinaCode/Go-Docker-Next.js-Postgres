import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CardComponentsProps {
  user: User;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

const CardComponents = ({ user, onDelete, onEdit }: CardComponentsProps) => {
  return (
    <div className='bg-blue-500 text-white font-bold text-xl rounded-xl shadow-lg p-4'>
      <p className='mb-2'>ID: {user.id}</p>
      <p className='mb-2'>Name: {user.name}</p>
      <p className='mb-2'>Email: {user.email}</p>
      <div className="flex justify-center mx-auto space-x-2">
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
        <button
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => onEdit(user)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CardComponents;