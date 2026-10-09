import HomePage from "./HomePage";
import MarxEngelsPage from "./MarxEngelsPage";

export default function App() {
  const currentRoute = window.location.pathname
    .slice(import.meta.env.BASE_URL.length)
    .replace(/^\/+/, "");

  return currentRoute === "marx-engels" ? <MarxEngelsPage /> : <HomePage />;
}
