export interface TaskParams {
  id: string;
  title: string;
  todos: {
    id: number; 
    text: string;
    completed: boolean;
  }[];
  completed: boolean;
}
