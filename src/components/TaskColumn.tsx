"use client";

import React, { useState } from "react";
import { Task, Category } from "@/types";
import { TaskBox } from "./TaskBox";
import { useTaskContext } from "@/context/TaskContext";

interface TaskColumnProps {
  day: string;
  tasks: Task[];
}

const categories: Category[] = ["Commitments", "Sleep/Self-care", "Key Workouts", "Supporting Workouts", "Key Habits"];

// Global drag state to track across columns
let globalDraggedTask: Task | null = null;

export const TaskColumn: React.FC<TaskColumnProps> = ({ day, tasks }) => {
  const { addTask, updateTask } = useTaskContext();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [newTaskInputs, setNewTaskInputs] = useState<Record<Category, string>>({
    Commitments: "",
    "Sleep/Self-care": "",
    "Key Workouts": "",
    "Supporting Workouts": "",
    "Key Habits": "",
  });

  const handleAddTask = (category: Category) => {
    const title = newTaskInputs[category].trim();
    if (title) {
      addTask(title, category, day);
      setNewTaskInputs({ ...newTaskInputs, [category]: "" });
    }
  };

  const getCategoryTasks = (category: Category) => {
    return tasks.filter((task) => task.category === category && task.day === day);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (category: Category) => {
    if (globalDraggedTask) {
      updateTask(globalDraggedTask.id, globalDraggedTask.title, category, day);
      globalDraggedTask = null;
      setDraggedTaskId(null);
    }
  };

  const handleDragStart = (task: Task) => {
    globalDraggedTask = task;
    setDraggedTaskId(task.id);
  };

  const handleDragEnd = () => {
    globalDraggedTask = null;
    setDraggedTaskId(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 h-full min-w-56">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {day}
      </h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-lg border-2 border-gray-200 dark:border-slate-700 p-3"
          >
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-2">
              {category}
            </h3>

            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(category)}
              className="min-h-24 p-2 rounded border-2 border-dashed border-gray-300 dark:border-slate-600 transition-colors hover:border-blue-400 hover:bg-blue-50/10"
            >
              {getCategoryTasks(category).map((task) => (
                <div 
                  key={task.id} 
                  draggable 
                  onDragStart={() => handleDragStart(task)} 
                  onDragEnd={handleDragEnd}
                >
                  <TaskBox task={task} isDragging={draggedTaskId === task.id} />
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-1">
              <input
                type="text"
                value={newTaskInputs[category]}
                onChange={(e) =>
                  setNewTaskInputs({ ...newTaskInputs, [category]: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask(category);
                  }
                }}
                placeholder="Add task..."
                className="flex-1 px-2 py-1 text-sm rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => handleAddTask(category)}
                className="px-2 py-1 text-sm bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors font-medium"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
