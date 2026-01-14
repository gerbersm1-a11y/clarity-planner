"use client";

import React, { useRef } from "react";
import { jsPDF } from "jspdf";

export const PDFExport: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleExportPDF = async () => {
    try {
      const plannerElement = document.getElementById("weekly-planner-grid");
      if (!plannerElement) {
        alert("Could not find planner element");
        return;
      }

      const button = buttonRef.current;
      if (!button) return;

      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = "Generating PDF...";

      try {
        // Create a new PDF in landscape mode for better fit
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yPosition = 10;

        // Add title
        pdf.setFontSize(16);
        pdf.text("Weekly Planner", 10, yPosition);
        yPosition += 15;

        // Get current date
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
        const dateRange = `Week of ${weekStart.toLocaleDateString()}`;
        
        pdf.setFontSize(10);
        pdf.text(dateRange, 10, yPosition);
        yPosition += 8;

        // Add a line separator
        pdf.setDrawColor(0);
        pdf.line(10, yPosition, pageWidth - 10, yPosition);
        yPosition += 5;

        // Extract task data from the DOM
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const categories = ["Commitments", "Sleep/Self-care", "Key Workouts", "Supporting Workouts", "Key Habits"];
        
        const categoryColors: Record<string, [number, number, number]> = {
          "Commitments": [59, 130, 246],      // blue
          "Sleep/Self-care": [147, 51, 234],  // purple
          "Key Workouts": [34, 197, 94],      // green
          "Supporting Workouts": [234, 179, 8], // yellow
          "Key Habits": [236, 72, 153],       // pink
        };

        // Create a compact table
        pdf.setFontSize(9);
        const colWidth = (pageWidth - 20) / 7;
        const rowHeight = 12;
        const categoryRowHeight = 6;

        // Header row with days
        let xPos = 10;
        days.forEach((day) => {
          pdf.setTextColor(0, 0, 0);
          pdf.setFont("helvetica", "bold");
          pdf.text(day.substring(0, 3), xPos + colWidth / 2, yPosition, { align: "center" });
          xPos += colWidth;
        });

        yPosition += rowHeight;

        // Get all tasks from the DOM
        const taskElements = plannerElement.querySelectorAll('[data-task-id]');
        const tasksByDay: Record<string, Record<string, string[]>> = {};
        
        days.forEach((day) => {
          tasksByDay[day] = {};
          categories.forEach((cat) => {
            tasksByDay[day][cat] = [];
          });
        });

        // Parse tasks from DOM
        taskElements.forEach((el) => {
          const day = el.getAttribute("data-day");
          const category = el.getAttribute("data-category");
          const title = el.getAttribute("data-title");
          
          if (day && category && title && tasksByDay[day]) {
            if (!tasksByDay[day][category]) {
              tasksByDay[day][category] = [];
            }
            tasksByDay[day][category].push(title);
          }
        });

        // Draw grid with tasks
        categories.forEach((category) => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 10;
          }

          // Category label row
          const [r, g, b] = categoryColors[category];
          pdf.setFillColor(r, g, b);
          pdf.rect(10, yPosition, pageWidth - 20, categoryRowHeight, "F");
          
          pdf.setTextColor(255, 255, 255);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(8);
          pdf.text(category, 10.5, yPosition + categoryRowHeight - 1);

          yPosition += categoryRowHeight + 1;

          // Tasks for this category across all days
          xPos = 10;
          const startY = yPosition;
          let maxHeight = rowHeight;

          // First pass: draw borders and calculate height needed
          days.forEach((day) => {
            const tasks = tasksByDay[day][category] || [];
            const taskText = tasks.join(", ");
            
            pdf.setDrawColor(200, 200, 200);
            pdf.rect(xPos, yPosition, colWidth, rowHeight);
            
            xPos += colWidth;
          });

          // Second pass: add text with proper positioning
          xPos = 10;
          pdf.setTextColor(0, 0, 0);
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(7);

          days.forEach((day) => {
            const tasks = tasksByDay[day][category] || [];
            const taskText = tasks.join(", ");
            
            // Split text to fit in cell with proper margins
            const lines = pdf.splitTextToSize(taskText, colWidth - 3);
            let lineY = startY + 3; // 3mm top padding
            
            lines.slice(0, 3).forEach((line) => {
              if (lineY < startY + rowHeight - 1) {
                pdf.text(line, xPos + 1.5, lineY);
                lineY += 3;
              }
            });
            
            xPos += colWidth;
          });

          yPosition += rowHeight + 1;
        });

        // Save PDF
        const dateStr = now.toISOString().split("T")[0];
        pdf.save(`Weekly-Planner-${dateStr}.pdf`);

        button.disabled = false;
        button.textContent = originalText || "Export to PDF";
      } catch (canvasError) {
        console.error("Error generating PDF:", canvasError);
        button.disabled = false;
        button.textContent = originalText || "Export to PDF";
        alert("Failed to generate PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };


  return (
    <button
      ref={buttonRef}
      onClick={handleExportPDF}
      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-4-2m4 2l4-2"
        />
      </svg>
      Export to PDF
    </button>
  );
};
