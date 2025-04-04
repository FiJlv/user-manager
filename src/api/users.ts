import { User } from '../types/user.types';
import { UserFormValues } from '../schemas/user.schema';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post('/users', data);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await api.put(`/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
