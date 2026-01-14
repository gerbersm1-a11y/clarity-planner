"use client";

import React from "react";
import { TaskColumn } from "./TaskColumn";
import { PDFExport } from "./PDFExport";
import { useTaskContext } from "@/context/TaskContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeeklyPlanner: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-full mx-auto">
        {/* Header with Export Button */}
        <div className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Weekly Planner
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Plan your week ahead
            </p>
          </div>
          <PDFExport />
        </div>

        {/* Grid Layout - Horizontally Scrollable */}
        <div className="overflow-x-auto pb-4">
          <div id="weekly-planner-grid" className="grid grid-cols-7 gap-4 auto-rows-max min-w-max bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm">
            {days.map((day) => (
              <TaskColumn key={day} day={day} tasks={tasks} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
