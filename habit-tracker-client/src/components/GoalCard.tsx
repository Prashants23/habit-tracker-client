// components/GoalCard.js

import moment from "moment";
import React from "react";

interface Goal {
  goalName: string;
  minTimeline: Date;
  maxTimeline: Date;
  completedPercentage: number;
}

interface GoalCardProps {
  goals: Goal;
  onClick: () => void;
}

export default function GoalCard({ goals, onClick }: GoalCardProps) {
  const { goalName, minTimeline, maxTimeline } = goals;
  return (
    <div
      className="m-2 border text-white border-slate-200 rounded-lg hover:shadow-md hover:cursor-pointer w-[500px]"
      onClick={onClick}
    >
      <div className="my-2 flex flex-col justify-between">
        <h2 className="mx-2 text-left text-[12px] text-gray-500 ">
          Goal Title
        </h2>
        <p className="mx-2 text-left text-2xl mb-2">
          {goalName}
          {/* delete button */}
        </p>
        <div className="p-2 italic">{""}</div>
        <hr className="my-1 mx-2" />
        {/* status */}
        <div className="p-2 flex justify-between text-xs">
          <span className="text-xs">
            Start by: {moment(minTimeline).format("h:mm a Do MMMM YYYY ")}
          </span>
          <span className="text-xs">
            Complete by: {moment(maxTimeline).format("h:mm a Do MMMM YYYY ")}
          </span>
        </div>
        {/* progress bar */}

        <div className=" my-1 mx-2 h-2 bg-blue-200 rounded-full">
          <div
            style={{ width: `${goals?.completedPercentage}%` }}
            className={`h-full text-center text-sm text-black bg-blue-600 rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
}
