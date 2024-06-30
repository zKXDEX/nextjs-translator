import Navbar from "@/components/Navbar/Navbar";
import TranslatorForm from "../components/Form/TranslatorForm";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary">
      <Navbar />
      <TranslatorForm />
    </main>
  );
}