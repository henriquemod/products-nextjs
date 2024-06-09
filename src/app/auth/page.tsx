import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AuthForm from "./form";

export default function Auth() {
  return (
    <div className="w-full h-screen border flex justify-center items-center border-none">
      <Card className="bg-gray-800 border-none py-16 px-16 shadow-2xl">
        <CardHeader className="p-0 mb-12">
          <CardTitle className="text-white">Login</CardTitle>
        </CardHeader>
        <AuthForm />
      </Card>
    </div>
  );
}
