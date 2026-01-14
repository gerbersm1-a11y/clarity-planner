export type Category = "Commitments" | "Sleep/Self-care" | "Key Workouts" | "Supporting Workouts" | "Key Habits";

export interface Task {
  id: string;
  title: string;
  category: Category;
  day: string;
  color: string;
}

export interface Column {
  day: string;
  tasks: Task[];
}
