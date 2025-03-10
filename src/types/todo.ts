export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}
