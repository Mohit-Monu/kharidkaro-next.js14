import GradiantButton from "@/components/Button/GradiantButton";
import axios, { AxiosResponse } from "axios";
import { useRef, useState } from "react";
function SellerSignup({
  togglePageType,
}: {
  togglePageType: (num: number) => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const cpasswordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setsuccessMessage("");
    if (
      nameRef.current === null ||
      emailRef.current === null ||
      passwordRef.current === null ||
      cpasswordRef.current === null
    ) {
      setErrorMessage("One of the refs is null");
      return;
    }
    if (passwordRef.current.value !== cpasswordRef.current.value) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const requestData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: "seller",
      };

      const response: AxiosResponse = await axios.post(
        "api/auth/signup",
        requestData
      );
      setsuccessMessage(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your seller account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="abc xyz"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="c-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      ref={cpasswordRef}
                      type="password"
                      name="c-password"
                      id="c-password"
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {errorMessage && (
                <p className="text-sm font-light text-red-500 dark:text-red-400 mb-3">
                  {errorMessage}
                </p>
              ) }
              {successMessage && (
                <p className="text-sm font-light text-green-500 dark:text-green-400 mb-3">
                  {successMessage}
                </p>
              )}
              <GradiantButton className="w-full" type="submit">Sign Up</GradiantButton>
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-3">
                  Already have an account yet?{" "}
                  <a
                    onClick={() => togglePageType(2)}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Sign In
                  </a>
                </p>
                <p
                  className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => togglePageType(0)}
                >
                  Are you a buyer?{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellerSignup;
