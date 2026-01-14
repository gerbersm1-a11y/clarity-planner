"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Task, Category } from "@/types";

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, category: Category, day: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string, category: Category, day: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Morning Meeting", category: "Commitments", day: "Monday", color: "bg-blue-400" },
    { id: "2", title: "Gym", category: "Key Workouts", day: "Monday", color: "bg-green-400" },
  ]);

  const categoryColors: Record<Category, string> = {
    Commitments: "bg-blue-400",
    "Sleep/Self-care": "bg-purple-400",
    "Key Workouts": "bg-green-400",
    "Supporting Workouts": "bg-yellow-400",
    "Key Habits": "bg-pink-400",
  };

  const addTask = (title: string, category: Category, day: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      day,
      color: categoryColors[category],
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, title: string, category: Category, day: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title, category, day, color: categoryColors[category] }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};
