import React, { useState } from "react";
import DatePicker from "react-datepicker";

interface Task {
  taskName: string;
  quantity: number | string;
  frequency: string;
  selectedDaysOfWeek: string[];
  reminders: boolean;
  reminderTime: Date;
}

const frequencyOptions = [
  { value: "once_a_day", label: "Once a day" },
  { value: "twice_a_day", label: "Twice a day" },
  { value: "every_two_days", label: "Every two days" },
  { value: "certain_days_of_week", label: "Certain days of the week" },
  { value: "once_a_week", label: "Once a week" },
];

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
}) => {
  const [taskName, setTaskName] = useState(task ? task.name : "");
  const [quantity, setQuantity] = useState(task ? task.quantity : "");
  const [frequency, setFrequency] = useState(task ? task.frequency : "");
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<string[]>(
    task && task.frequency === "certain_days_of_week"
      ? task.selectedDaysOfWeek
      : []
  );
  const [reminders, setReminders] = useState(task ? task.reminders : false);
  const [reminderTime, setReminderTime] = useState<Date>(
    task ? task.reminderTime : new Date()
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: Task = {
      taskName,
      quantity,
      frequency,
      selectedDaysOfWeek,
      reminders,
      reminderTime,
    };
    onSave(newTask);
    setTaskName("");
    setQuantity("");
    setFrequency("");
    onClose();
    setSelectedDaysOfWeek([]);
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "" : "hidden"
      } overflow-y-auto z-50 flex justify-center items-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg overflow-visible shadow-xl transform transition-all max-w-lg w-full mx-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-black">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="taskName"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="frequency"
              >
                Frequency
              </label>
              <select
                id="frequency"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="">Select frequency</option>
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {frequency === "certain_days_of_week" && (
                <select
                  multiple
                  className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={selectedDaysOfWeek}
                  onChange={(e) =>
                    setSelectedDaysOfWeek(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              )}
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={reminders}
                  onChange={(e) => setReminders(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Reminders</span>
              </label>
            </div>
            {reminders && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="reminderTime"
                >
                  Reminder Date/Time
                </label>
                <DatePicker
                  selected={reminderTime}
                  onChange={(date) => setReminderTime(date as Date)}
                  selectsEnd
                  minDate={new Date()}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600 focus:outline-none"
              >
                {task ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
