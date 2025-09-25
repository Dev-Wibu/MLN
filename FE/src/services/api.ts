import type { Philosopher, Quote } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/philosophy';

export const philosophyApi = {
  async getPhilosophers(): Promise<Philosopher[]> {
    const response = await fetch(`${API_BASE_URL}/philosophers`);
    if (!response.ok) {
      throw new Error('Failed to fetch philosophers');
    }
    return response.json();
  },

  async getPhilosopher(id: number): Promise<Philosopher> {
    const response = await fetch(`${API_BASE_URL}/philosophers/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch philosopher');
    }
    return response.json();
  },

  async getQuotes(): Promise<Quote[]> {
    const response = await fetch(`${API_BASE_URL}/quotes`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    return response.json();
  },

  async getFeaturedQuotes(): Promise<Quote[]> {
    const response = await fetch(`${API_BASE_URL}/quotes/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured quotes');
    }
    return response.json();
  },

  async getQuotesByAuthor(author: string): Promise<Quote[]> {
    const response = await fetch(`${API_BASE_URL}/quotes/by-author/${encodeURIComponent(author)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes by author');
    }
    return response.json();
  },
};