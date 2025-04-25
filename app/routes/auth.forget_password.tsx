import { Form, useNavigate } from "@remix-run/react";
import Navbar from "~/components/app-components/Navbar";
const Index = () => {
  const naviagte = useNavigate();

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white">
        <Navbar />
      </div>
      <div className="flex">
        <section className="flex-1 h-[100vh] bg-[#000]  hidden xl:block"></section>
        <section className="flex-1 h-[100vh] flex items-center justify-center">
          <div className="w-[400px]  rounded-lg ">
            <h1 className="heading text-[52px] mb-[50px] mt-[-50px]">
              Forget Password
            </h1>
            <form
              method="post"
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light text-black "
                >
                  User name or email address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder=""
                />
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    naviagte("/auth/reset_password");
                  }}
                  type="submit"
                  className="w-full py-3 px-4 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Forget Password
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      naviagte("/auth/signup");
                    }}
                    className="text-gray-900 hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
