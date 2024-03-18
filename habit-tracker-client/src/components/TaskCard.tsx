import React from "react";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
  quantity: number;
  frequency: string;
  reminders: string; // You might want to change this type depending on what `task.reminders` represents
  reminderTime: string; // You might want to change this type depending on what `task.reminderTime` represents
}

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string, checked: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  return (
    <div className="m-2 border relative text-white border-slate-200 rounded-lg hover:shadow-md hover:cursor-pointer w-96 p-4">
      <div className="absolute text-red-400 top-5 right-5">Edit</div>
      <label className="text-left text-[12px] text-gray-500">Task Title</label>
      <p className="text-left text-lg mb-2">
        {task.name}
        {/* delete button */}
      </p>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={task.completed}
            onChange={(e) => onComplete(task._id, e.target.checked)}
          />
          <span className="ml-2 text-gray-400">Completed</span>
        </label>
      </div>
      <div className="flex flex-row justify-between flex-wrap">
        <div className="mb-2">
          <label className="text-left text-[12px] text-gray-500">
            Quantity:
          </label>
          <p className="text-left text-lg mb-2">{task.quantity}</p>
        </div>
        <div className="mb-2">
          <label className="text-left text-[12px] text-gray-500">
            Frequency:
          </label>
          <p className="text-left text-lg mb-2">{task.frequency}</p>
        </div>
        <div className="mb-2">
          <label className="text-left text-[12px] text-gray-500">
            Reminders:
          </label>
          <p className="text-left text-lg mb-2">{task.reminders}</p>
        </div>
        <div className="mb-2">
          <label className="text-left text-[12px] text-gray-500">
            Reminder Time:
          </label>
          <p className="text-left text-lg mb-2">{task.reminderTime}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
