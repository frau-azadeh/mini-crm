import ClassButton from "./components/ui/ClassButton";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex items-center justify-center flex-col min-h-screen">
          <h1 className="text-red-600">به پشتیبانی خوش آمدید</h1>
          <ClassButton>ورود</ClassButton>
        </div>
      </main>
    </div>
  );
}
