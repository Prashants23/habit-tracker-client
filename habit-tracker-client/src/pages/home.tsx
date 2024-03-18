// import GoalCard from "@/components/GoalCard";
// import GoalModal from "@/components/GoalModal";
// import React from "react";

// export default function home() {
//   return (
//     <div>
//       {/* <GoalModal isOpen={true} onClose={() => console.log("clos")} /> */}
//       <GoalCard />
//     </div>
//   );
// }

// pages/dashboard.js

import GoalCard from "@/components/GoalCard";
import GoalModal from "@/components/GoalModal";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { useCreateGoalMutation } from "@/hooks/mutations/useCreateGoalMutation";
import { useCreateTaskMutation } from "@/hooks/mutations/useCreateTaskMutation";
import { useUpdateTaskMutation } from "@/hooks/mutations/useUpdateTask";
import { useGetGoals } from "@/hooks/queries/useGetGoals";
import { useGetTasks } from "@/hooks/queries/useGetTasks";
import { useGetUser } from "@/hooks/queries/useGetUserData";
import React, { useState } from "react";
// import TaskModal from "../components/TaskModal";

export default function Dashboard() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState("");

  const { data } = useGetUser();
  const { data: goalsData, refetch: refetchGoals } = useGetGoals();
  // const { mutate: tasksData,  } = useCreateTaskMutation();
  const { data: taskData, refetch: refetchTask } = useGetTasks({
    id: selectedGoalId,
  });
  const { mutate: createGoalMutate } = useCreateGoalMutation({
    onSuccess: () => {
      refetchGoals();
    },
  });
  const { mutate: createTaskMutate } = useCreateTaskMutation({
    onSuccess: () => {
      refetchTask();
    },
  });
  const { mutate: updateTaskMutate } = useUpdateTaskMutation({
    onSuccess: () => {
      refetchGoals();
      refetchTask();
    },
  });

  console.log("🚀 ~ Dashboard ~ taskData:", taskData, selectedGoalId);
  console.log("🚀 ~ Dashboard ~ goalsData:", goalsData);
  // console.log(data);

  const openModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateTaskModalOpen(false);
    setEditTask(null);
  };

  const handleCreateGoal = (payload) => {
    createGoalMutate(payload);
  };

  const handleSaveTask = (task) => {
    // Handle save task logic here
    createTaskMutate({ goalId: selectedGoalId, ...task });
    console.log("Task saved:", task);
  };

  const onMarkTaskComplete = (id, value) => {
    const payload = {
      id: id,
      updatedFields: {
        completed: value,
      },
    };
    updateTaskMutate(payload);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h2>Welcome {data?.user?.username}</h2>
        <div className="grid grid-cols-2 mt-10">
          <div className="relative  w-[500px]  ">
            <div className="flex justify-between mb-10">
              Goals{" "}
              {
                <button
                  disabled={goalsData?.length >= 2}
                  className={`bg-blue-500  text-sm text-white px-2 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${
                    goalsData?.length >= 2
                      ? "bg-gray-400 text-black hover:bg-gray-400 "
                      : null
                  }`}
                  onClick={() => setIsCreateGoalModalOpen(true)}
                >
                  Create Goal
                </button>
              }
            </div>
            <div className="grid grid-cols-1">
              {goalsData?.map((goals) => (
                <GoalCard
                  goals={goals}
                  onClick={() => setSelectedGoalId(goals?._id)}
                />
              ))}
            </div>
          </div>
          {selectedGoalId ? (
            <div className="relative  w-[400px] ">
              <div className="flex justify-between  mb-10">
                Tasks{" "}
                <button
                  className="bg-blue-500 text-sm text-white px-2 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={openModal}
                >
                  Add Task
                </button>
              </div>
              {taskData?.length > 0 ? (
                <div className="grid grid-cols-1">
                  {taskData?.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={onMarkTaskComplete}
                    />
                  ))}
                </div>
              ) : (
                <div>No Task Yet!</div>
              )}
            </div>
          ) : (
            <div>Select a Goal to View Tasks Here</div>
          )}
        </div>
        <TaskModal
          isOpen={isCreateTaskModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask}
          task={editTask}
        />
        <GoalModal
          onCreateTask={handleCreateGoal}
          isOpen={isCreateGoalModalOpen}
          onClose={() => setIsCreateGoalModalOpen(false)}
        />
      </div>
    </>
  );
}
