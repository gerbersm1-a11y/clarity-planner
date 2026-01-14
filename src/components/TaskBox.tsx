"use client";

import React from "react";
import { Task, Category } from "@/types";
import { useTaskContext } from "@/context/TaskContext";

interface TaskBoxProps {
  task: Task;
  isDragging?: boolean;
}

const categoryIcons: Record<Category, string> = {
  Commitments: "📋",
  "Sleep/Self-care": "😴",
  "Key Workouts": "💪",
  "Supporting Workouts": "🏃",
  "Key Habits": "⭐",
};

export const TaskBox: React.FC<TaskBoxProps> = ({ task, isDragging }) => {
  const { removeTask } = useTaskContext();

  return (
    <div
      draggable
      data-task-id={task.id}
      data-day={task.day}
      data-category={task.category}
      data-title={task.title}
      className={`
        ${task.color} rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing
        shadow-md hover:shadow-lg transition-shadow
        text-white text-sm font-medium break-words
        ${isDragging ? "opacity-50" : "opacity-100"}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <span className="text-lg flex-shrink-0">{categoryIcons[task.category]}</span>
          <p className="flex-1">{task.title}</p>
        </div>
        <button
          onClick={() => removeTask(task.id)}
          className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
