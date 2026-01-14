"use client";

import React, { useState } from "react";
import { Task, Category } from "@/types";
import { useTaskContext } from "@/context/TaskContext";

interface TaskGridProps {
  days: string[];
  tasks: Task[];
}

const categories: Category[] = ["Commitments", "Sleep/Self-care", "Key Workouts", "Supporting Workouts", "Key Habits"];

const categoryIcons: Record<Category, string> = {
  Commitments: "📋",
  "Sleep/Self-care": "😴",
  "Key Workouts": "💪",
  "Supporting Workouts": "🏃",
  "Key Habits": "⭐",
};

export const TaskGrid: React.FC<TaskGridProps> = ({ days, tasks }) => {
  const { addTask, removeTask, updateTask } = useTaskContext();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, Record<Category, string>>>(() => {
    const inputs: Record<string, Record<Category, string>> = {};
    days.forEach((day) => {
      inputs[day] = {
        Commitments: "",
        "Sleep/Self-care": "",
        "Key Workouts": "",
        "Supporting Workouts": "",
        "Key Habits": "",
      };
    });
    return inputs;
  });

  const handleAddTask = (day: string, category: Category) => {
    const title = newTaskInputs[day][category].trim();
    if (title) {
      addTask(title, category, day);
      setNewTaskInputs({
        ...newTaskInputs,
        [day]: { ...newTaskInputs[day], [category]: "" },
      });
    }
  };

  const getCategoryTasks = (day: string, category: Category) => {
    return tasks.filter((task) => task.category === category && task.day === day);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (day: string, category: Category) => {
    if (draggedTask) {
      // Update the task's day and category
      updateTask(draggedTask.id, draggedTask.title, category, day);
      setDraggedTask(null);
    }
  };

  return (
    <div className="inline-block min-w-full">
      {/* Days Header */}
      <div className="flex gap-2 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="flex-1 min-w-40 bg-white dark:bg-slate-900 rounded-lg shadow p-3 text-center"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {day}
            </h2>
          </div>
        ))}
      </div>

      {/* Category Rows */}
      {categories.map((category) => (
        <div key={category} className="flex gap-2 mb-2">
          {days.map((day) => (
            <div
              key={`${day}-${category}`}
              className="flex-1 min-w-40 bg-white dark:bg-slate-900 rounded-lg shadow p-2 border-2 border-gray-200 dark:border-slate-700"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(day, category)}
            >
              {/* Tasks in this cell */}
              <div className="space-y-1 mb-2 max-h-24 overflow-y-auto">
                {getCategoryTasks(day, category).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className={`${task.color} rounded p-2 text-white text-xs font-medium flex items-start justify-between gap-1 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex-1 break-words">
                      <span className="inline-block mr-1">{categoryIcons[category]}</span>
                      {task.title}
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="flex-shrink-0 text-white/70 hover:text-white transition-colors text-xs font-bold"
                      aria-label="Delete task"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add task input */}
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newTaskInputs[day][category]}
                  onChange={(e) =>
                    setNewTaskInputs({
                      ...newTaskInputs,
                      [day]: { ...newTaskInputs[day], [category]: e.target.value },
                    })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddTask(day, category);
                    }
                  }}
                  placeholder="+"
                  className="flex-1 px-1 py-0.5 text-xs rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-400"
                />
                <button
                  onClick={() => handleAddTask(day, category)}
                  className="px-2 py-0.5 text-xs bg-blue-400 hover:bg-blue-500 text-white rounded transition-colors font-medium"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
