import GradiantButton from "@/components/Button/GradiantButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
function SellerLogin({
  togglePageType,
}: {
  togglePageType: (num: number) => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function submitHandler(e: React.FormEvent) {
    setErrorMessage("");
    setsuccessMessage("");
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    const requestData = { email, password, role: "seller", redirect: false };
    const response = await signIn("credentials", requestData);
    if (response?.ok === false && response?.error) {
      setErrorMessage(response.error);
    } else if (response?.ok === true) {
      setsuccessMessage("Logged in true");
      router.push("/seller")
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your seller account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      style={{ width: "90%" }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    {showPassword ? (
                      <IoEyeOff
                        onClick={togglePasswordVisibility}
                        style={{ width: "8%", height: "8%" }}
                        className="mx-4"
                      />
                    ) : (
                      <IoEye
                        onClick={togglePasswordVisibility}
                        style={{ width: "8%", height: "8%" }}
                        className="mx-4"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onChange={togglePasswordVisibility}
                      id="passwordtoggle"
                      aria-describedby="passwordtoggle"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="passwordtoggle"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
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
              <GradiantButton className="w-full" type="submit" >Sign In</GradiantButton>
              <div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  onClick={() => togglePageType(3)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 mb-3 cursor-pointer"
                >
                  Sign up
                </a>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer"  onClick={() => togglePageType(0)}>
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

export default SellerLogin;
