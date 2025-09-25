export interface Philosopher {
  id: number;
  name: string;
  birthYear: string;
  deathYear: string;
  nationality: string;
  description: string;
  imageUrl: string;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
  context: string;
  category: string;
}