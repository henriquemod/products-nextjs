"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const AuthForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBackend = async (username: string, password: string) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status === 200) {
        window.location.replace("/");
      }
    };
    await requestBackend(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="p-0">
        <div className="grid w-full items-center justify-center gap-6">
          <div className="flex flex-col w-[420px]">
            <Input
              className="h-12"
              id="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
          </div>
          <div className="flex flex-col w-[420px]">
            <Input
              className="h-12"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-12">
        <Button className="w-64 h-14 py-4 bg-blue-500" type="submit">
          <p className="font-bold text-lg">Entrar</p>
        </Button>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
