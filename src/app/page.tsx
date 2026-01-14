import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { TaskProvider } from "@/context/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <WeeklyPlanner />
    </TaskProvider>
  );
}
