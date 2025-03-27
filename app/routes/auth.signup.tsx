import { Form, useNavigate } from "@remix-run/react";
const Index = () => {
  const naviagte = useNavigate();
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <div className="flex flex-row-reverse">
        <section className="flex-1 h-[100vh] bg-[#000]"></section>
        <section className="flex-1 h-[100vh] flex items-center justify-center">
          <div className="w-[400px]  rounded-lg ">
            <h1 className="heading text-[52px] mb-[50px] mt-[-50px]">
              Sign Up!
            </h1>
            <Form method="post" className="space-y-6">
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
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-light text-black "
                  >
                    Your password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                    Hide
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="text-right">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    naviagte("/auth/forget_password");
                  }}
                  className="text-sm text-black hover:underline"
                >
                  Forget your password
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sign in
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
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
