
import axios from "axios";

const baseURL = 'https://mock-api.arikmpt.com/api/category';

export const createCategory = async (data: any, token: string) => {
    return await axios.post(`${baseURL}/create`, data, {
        headers: {Authorization: `Bearer ${token}`},
    });
};
export const updateCategory = async (data: any, token: string) => {
    return await axios.put(`${baseURL}/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
};
  
export const getCategories = async (token: string) => {
    return await axios.get(`${baseURL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};
  
export const deleteCategory = async (categoryId: string, token: string) => {
    return await axios.delete(`${baseURL}/${categoryId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};