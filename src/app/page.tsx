import ClassButton from "./components/ui/ClassButton";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-red-600">به پشتیبانی خوش آمدید</h1>
       <div className="flex items-center justify-center">
        <ClassButton >
          ورود
          </ClassButton>
       </div>

      </main>
    </div>
  );
}
