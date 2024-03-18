// // pages/login.js

// import { useSignup } from "@/hooks/mutations/useLoginSignup";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import CongratsModal from "@/components/CongratulationsModal";

// export default function SignUp() {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isCongratesModal, setCongratulationModal] = useState(false);
//   const router = useRouter();

//   const { mutate: signupMutation } = useSignup({
//     onSuccess: () => {
//       setCongratulationModal(true);
//     },
//   });

//   const onSignup = () => {
//     signupMutation({ userName, email: email.toLowerCase(), password });
//   };

//   return (
//     <>
//       <section className="bg-gray-50 dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Sign Up
//               </h1>
//               <div className="space-y-4 md:space-y-6">
//                 <div>
//                   <label
//                     htmlFor="userName"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="userName"
//                     id="userName"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={userName}
//                     onChange={(value) => {
//                       setUserName(value.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={email}
//                     onChange={(value) => {
//                       setEmail(value.target.value);
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={password}
//                     onChange={(value) => {
//                       setPassword(value.target.value);
//                     }}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   onClick={onSignup}
//                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Sign Up
//                 </button>
//                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                   Already have an account?{" "}
//                   <Link
//                     href="/login"
//                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                   >
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <CongratsModal
//         show={isCongratesModal}
//         onClose={() => {
//           setCongratulationModal(false);
//           router.replace("/login");
//         }}
//       />
//     </>
//   );
// }
import { useSignup } from "@/hooks/mutations/useLoginSignup";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import CongratsModal from "@/components/CongratulationsModal";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState([]);
  const [isCongratesModal, setCongratulationModal] = useState(false);
  const router = useRouter();

  const { mutate: signupMutation } = useSignup({
    onSuccess: () => {
      setCongratulationModal(true);
    },
    onError: (error) => {
      setBackendErrors(error.response?.data?.message || []);
    },
  });

  const validateForm = () => {
    let errors = {};

    if (!userName.trim()) {
      errors.userName = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearErrors = () => {
    setValidationErrors({});
    setBackendErrors([]);
  };

  const onSignup = () => {
    clearErrors();

    if (validateForm()) {
      signupMutation({ userName, email: email.toLowerCase(), password });
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className={`bg-gray-50 border ${
                      validationErrors.userName
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      clearErrors();
                    }}
                  />
                  {validationErrors.userName && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.userName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      validationErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearErrors();
                    }}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearErrors();
                    }}
                    className={`bg-gray-50 border ${
                      validationErrors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={onSignup}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                {backendErrors.length > 0 && (
                  <div className="text-red-500 text-sm mt-1">
                    {backendErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CongratsModal
        show={isCongratesModal}
        onClose={() => {
          setCongratulationModal(false);
          router.replace("/login");
        }}
      />
    </>
  );
}
