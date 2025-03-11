
export interface Todo {
    id: number;
    title: string;
    comp: boolean;
    dueDate: string; // ISO string format (e.g., "2025-03-15")
    
  }
  
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  }