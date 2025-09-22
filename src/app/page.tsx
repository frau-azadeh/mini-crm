import AddTask from "./components/AddTask";
import AddLead from "./components/lead/AddLead";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-red-600">به پشتیبانی خوش آمدید</h1>
        <AddTask />
        <AddLead/>
      </main>
    </div>
  );
}
