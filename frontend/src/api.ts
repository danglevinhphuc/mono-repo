import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

export interface Item {
    id: number;
    name: string;
    created_at?: string;
}

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getItems = async (): Promise<Item[]> => {
    const response = await api.get('/items');
    return response.data;
};

export const createItem = async (name: string): Promise<Item> => {
    const response = await api.post('/items', { name });
    return response.data;
};

export const deleteItem = async (id: number): Promise<void> => {
    await api.delete(`/items/${id}`);
};
