import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AuthForm from "./form";

export default function Auth() {
  return (
    <div className="w-full h-screen border flex flex-col justify-center items-center border-none">
      <Card className="bg-gray-800 border-none p-6 sm:py-16 sm:px-16 shadow-3xl max-w-[300px] sm:max-w-none">
        <h1 className="font-bold text-3xl sm:text-5xl mb-3 sm:mb-6 text-stone-200">
          Product Manager
        </h1>
        <CardHeader className="p-0 mb-8 sm:mb-12">
          <CardTitle className="text-white text-center">Login</CardTitle>
        </CardHeader>
        <AuthForm />
      </Card>
    </div>
  );
}
