import { useCreateGoalMutation } from "@/hooks/mutations/useCreateGoalMutation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function GoalModal({
  isOpen,
  onClose,
  onCreateTask,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (data: any) => void;
}) {
  const [goalName, setGoalName] = useState("");
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(new Date());

  const [goalNameError, setGoalNameError] = useState("");
  const [minDateError, setMinDateError] = useState("");
  const [maxDateError, setMaxDateError] = useState("");

  const handleSave = () => {
    let isValid = true;

    if (!goalName) {
      setGoalNameError("Goal name is required");
      isValid = false;
    } else {
      setGoalNameError("");
    }

    if (!minDate) {
      setMinDateError("Minimum timeline is required");
      isValid = false;
    } else {
      setMinDateError("");
    }

    if (!maxDate) {
      setMaxDateError("Maximum timeline is required");
      isValid = false;
    } else {
      setMaxDateError("");
    }

    if (isValid) {
      const payload = {
        goalName,
        minTimeline: minDate,
        maxTimeline: maxDate,
        completed: false,
      };

      onCreateTask(payload);
      // Handle saving of goal with selected minDate and maxDate
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "" : "hidden"
      } overflow-auto flex justify-center items-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className=" dark:bg-gray-800 dark:border-gray-700 rounded-lg overflow-visible shadow-xl transform transition-all max-w-lg w-full mx-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-white">Set Goal</h2>
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2 "
                htmlFor="goalName"
              >
                Goal Name
              </label>
              <input
                type="text"
                id="goalName"
                onChange={(event) => setGoalName(event.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  goalNameError && "border-red-500"
                }`}
                placeholder="Enter goal name"
              />
              {goalNameError && (
                <p className="text-red-500 text-xs italic">{goalNameError}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="minTimeline"
                >
                  Minimum Timeline
                </label>
                <DatePicker
                  selected={minDate}
                  onChange={(date) => setMinDate(date)}
                  selectsEnd
                  startDate={minDate}
                  endDate={maxDate}
                  minDate={new Date()}
                  maxDate={minDate}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    minDateError && "border-red-500"
                  }`}
                />
                {minDateError && (
                  <p className="text-red-500 text-xs italic">{minDateError}</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="maxTimeline"
                >
                  Maximum Timeline
                </label>
                <DatePicker
                  selected={maxDate}
                  onChange={(date) => setMaxDate(date)}
                  selectsEnd
                  startDate={minDate}
                  endDate={maxDate}
                  minDate={minDate}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    maxDateError && "border-red-500"
                  }`}
                />
                {maxDateError && (
                  <p className="text-red-500 text-xs italic">{maxDateError}</p>
                )}
              </div>
            </div>
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
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600 focus:outline-none"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
