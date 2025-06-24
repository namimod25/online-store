import { supabase } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4">
        <Loader2 className="mx-auto h-12 w-12 animate-spin" />
        <p>Memverifikasi email anda</p>
      </div>
    </div>
  );
}
