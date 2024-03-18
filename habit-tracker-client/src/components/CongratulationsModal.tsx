import { useState } from "react";

const CongratsModal = ({ show, onClose }) => {
  return (
    <div
      className={`fixed inset-0 ${
        show ? "" : "hidden"
      } overflow-auto flex justify-center items-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className=" dark:bg-gray-800 dark:border-gray-700 rounded-lg overflow-visible shadow-xl transform transition-all max-w-lg w-full mx-4">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-white">
            Congratulations!
          </h2>
          <p className="mt-2">
            You have signed up. Now, please log in to continue with your new
            credentials.{" "}
            <span
              onClick={onClose}
              className="text-blue-500 hover:cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CongratsModal;
