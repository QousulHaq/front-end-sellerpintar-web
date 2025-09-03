// app/(user)/page.tsx (server component default)
import { Suspense } from "react";
import Home from "@/components/HomePage";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="not-found-info w-full rounded-[12px] border border-slate-200 py-6">
        <p className="text-slate-900 text-lg font-medium leading-6 text-center">Loading...</p>
      </div>
    }>
      <Home />
    </Suspense>
  );
}
