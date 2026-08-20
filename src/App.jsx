import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <NavBar />

      <main className="mx-auto px-4 py-8 max-w-5xl">
        <HomePage />
      </main>
    </div>
  );
}
