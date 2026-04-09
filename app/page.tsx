import Calendar from "@/components/Calendar";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-100 via-sky-50 to-slate-200">
      <Calendar />
    </main>
  );
}