import AddTask from "./components/AddTask";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-red-600">به پشتیبانی خوش آمدید</h1>
        <AddTask/>
      </main>
    </div>
  );
}
