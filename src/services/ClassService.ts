import axios from 'axios';
import { Class } from '../types/index';

const API_URL = process.env.REACT_APP_API_URL+ '/api/classes' || "https://server-manage.onrender.com" + '/api/classes';

export const fetchClasses = async () => {
  console.log('Fetching classes from', API_URL);
  const response = await axios.get(API_URL);
  console.log("response", response.data);
  return response.data;
};

export const createClass = async (classData: Class) => {
  const response = await axios.post(API_URL, classData);
  return response.data;
};

export const deleteClass = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateClass = async (id: string, updatedClass: Partial<Class>) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedClass);
  return response.data;
};