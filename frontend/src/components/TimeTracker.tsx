import React, { useEffect, useState } from 'react';
import { getItems, createItem, deleteItem } from '../api';
import type { Item } from '../api';

export const TimeTracker: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await getItems();
            setItems(data);
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setLoading(true);
        try {
            const newItem = await createItem(inputValue);
            setItems([...items, newItem]);
            setInputValue('');
        } catch (err) {
            setError('Failed to add task');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
            setItems(items.filter((item) => item.id !== id));
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
                <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
                    Work Time Tracker
                </h1>

                <form onSubmit={handleAdd} className="mb-8 relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What are you working on?"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputValue.trim()}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/30"
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </form>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            No tasks tracked yet. Start getting things done!
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300"
                            >
                                <span className="text-white text-lg font-medium truncate flex-1 mr-4">
                                    {item.name}
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                                    title="Delete task"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
