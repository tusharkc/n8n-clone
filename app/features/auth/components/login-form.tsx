"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const session = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center w-full max-w-[350px] mx-auto px-4 sm:px-0">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2D333A] dark:text-white mb-2 tracking-tight">
              Welcome back
            </h1>
          </div>

          <div className="w-full space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-12 justify-start px-4 text-[15px] font-medium border-gray-300 hover:bg-gray-50 text-gray-700 relative group"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });
              }}
            >
              <span className="absolute left-4">
                <Image
                  src="/logos/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              </span>
              <span className="w-full text-center">Continue with Google</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 justify-start px-4 text-[15px] font-medium border-gray-300 hover:bg-gray-50 text-gray-700 relative group"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/",
                });
              }}
            >
              <span className="absolute left-4">
                <Image
                  src="/logos/github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                />
              </span>
              <span className="w-full text-center">Continue with GitHub</span>
            </Button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        className="h-12 border-gray-300 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 text-[15px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="h-12 border-gray-300 focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-0 text-[15px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-[15px] font-medium rounded-full mt-2 transition-colors"
              >
                Continue
              </Button>

              <Link className="text-sm mt-2 block text-center" href="/sign-up">
                Don't have an account? Sign up
              </Link>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
