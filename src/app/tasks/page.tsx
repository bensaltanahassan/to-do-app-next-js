"use client";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const goToTaskDetailsPage = () => {
    router.push("/tasks/1");
  };
  return (
    <div>
      <div onClick={() => goToTaskDetailsPage()}>Go To Task Details Page</div>
    </div>
  );
}
