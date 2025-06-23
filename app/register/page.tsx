"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormSchema } from "@/lib/loginValidasi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

// Schema validasi dengan Zod

export default function RegisterPage() {
  //const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // 1. Registrasi user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
          },
        },
      });

      // 2. Handle error dari Supabase Auth
      if (authError) {
        let errorMessage = authError.message;

        // Terjemahkan error umum
        if (authError.message.includes("already registered")) {
          errorMessage = "Email sudah terdaftar";
        } else if (authError.message.includes("password")) {
          errorMessage = "Password terlalu lemah";
        }

        throw new Error(errorMessage);
      }

      // 3. Simpan profil tambahan
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: authData.user?.id,
        email: data.email,
        full_name: data.full_name,
      });

      if (profileError) throw profileError;

      toast("Registrasi Berhasil", {
        description: "Silakan masuk menggunakan akun Anda",
        duration: 5000,
      });

      redirect("/dashboard");
    } catch {
      toast("Registrasi Gagal", {
        description: "Silakan coba lagi",
        duration: 5000,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Buat Akun Baru</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Isi formulir untuk mendaftar
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@contoh.com"
                      {...field}
                      className={fieldState.error ? "border-destructive" : ""}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-xs text-destructive">
                      ⚠ {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" color="bg-primary">
              Daftar
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
