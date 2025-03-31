import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import "./global.css";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";
import { useEffect, useState } from "react";
import { LOCAL_KEYS } from "./constant";
import { setAuth } from "./store/feature/auth/authSlice";
import { User } from "./types/User";
import { Toaster } from "react-hot-toast";
import useCartSync from "./hooks/useCartSync";
import usePreLoadData from "./hooks/usePreLoadData";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const App_Init = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isReady, setIsReady] = useState(false);

  useCartSync();
  usePreLoadData();

  const init = async () => {
    try {
      let localUser: any = localStorage.getItem(LOCAL_KEYS.user);
      let localToken = localStorage.getItem(LOCAL_KEYS.token);
      if (localUser && localToken) {
        localUser = JSON.parse(localUser) as User;
        dispatch(setAuth({ token: localToken, user: localUser! }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsReady(true);
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div>{children}</div>;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <App_Init>
            <div className="mw_constraint">{children}</div>
            <ScrollRestoration />
            <Scripts />
          </App_Init>
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
