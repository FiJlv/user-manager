import { User } from '../types/user.types';
import { UserFormValues } from '../schemas/user.schema';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (data: UserFormValues): Promise<User> => {
  const response = await api.post('/users', data);
  return response.data;
};
