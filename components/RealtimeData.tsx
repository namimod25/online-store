"use client"; // Add this at the top

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RealtimeData() {
  useEffect(() => {
    const channel = supabase
      .channel("realtime-changes")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        // Handle real-time updates
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return <div>Realtime updates enabled</div>;
}
