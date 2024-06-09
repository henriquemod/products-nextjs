"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/providers/user-provider";
import { useNotification } from "@/hook/use-notification";

const AuthForm: React.FC = () => {
  const { authenticate } = useUserStore((state) => state);
  const { handleApiResponse } = useNotification();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  const validateFields = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    } else {
      setUsernameError(null);
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    const requestBackend = async (username: string, password: string) => {
      const res = await authenticate(username, password);
      handleApiResponse({
        res,
        successMessage: "Login successful",
        unauthorizedMessage: "Invalid username or password",
        onSuccess: () => {
          window.location.replace("/");
        },
      });
    };

    await requestBackend(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full text-center">
            <Input
              className="h-12"
              id="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            {usernameError && (
              <Label className="text-red-500 text-sm">{usernameError}</Label>
            )}
          </div>
          <div className="w-full text-center">
            <Input
              className="h-12"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
            {passwordError && (
              <Label className="text-red-500 text-sm">{passwordError}</Label>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-12 p-0 flex gap-4">
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="w-64 h-14 py-4 bg-slate-100 hover:bg-slate-300"
        >
          <Label className="font-bold text-lg">Voltar</Label>
        </Button>
        <Button
          className="w-full h-14 py-4 bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          <Label className="font-bold text-lg">Entrar</Label>
        </Button>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
