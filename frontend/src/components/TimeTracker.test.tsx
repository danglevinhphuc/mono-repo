import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { TimeTracker } from './TimeTracker';
import * as api from '../api';

// Mock the API module
vi.mock('../api', () => ({
    getItems: vi.fn(),
    createItem: vi.fn(),
    deleteItem: vi.fn(),
}));

describe('TimeTracker Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders the title and input', () => {
        render(<TimeTracker />);
        expect(screen.getByText(/Work Time Tracker/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/What are you working on/i)).toBeInTheDocument();
    });

    it('fetches and displays items', async () => {
        const mockItems = [
            { id: 1, name: 'Task 1' },
            { id: 2, name: 'Task 2' },
        ];
        (api.getItems as Mock).mockResolvedValue(mockItems);

        render(<TimeTracker />);

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
        });
    });

    it('adds a new item', async () => {
        (api.getItems as Mock).mockResolvedValue([]);
        (api.createItem as Mock).mockResolvedValue({ id: 10, name: 'New Task' });

        render(<TimeTracker />);

        const input = screen.getByPlaceholderText(/What are you working on/i);
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText('New Task')).toBeInTheDocument();
        });

        expect(api.createItem).toHaveBeenCalledWith('New Task');
    });

    it('deletes an item', async () => {
        const mockItems = [{ id: 1, name: 'Delete Me' }];
        (api.getItems as Mock).mockResolvedValue(mockItems);
        (api.deleteItem as Mock).mockResolvedValue(true);

        render(<TimeTracker />);

        // Wait for item to appear
        await waitFor(() => {
            expect(screen.getByText('Delete Me')).toBeInTheDocument();
        });

        // Click delete button
        const deleteButton = screen.getByTitle('Delete task');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
        });

        expect(api.deleteItem).toHaveBeenCalledWith(1);
    });
});
