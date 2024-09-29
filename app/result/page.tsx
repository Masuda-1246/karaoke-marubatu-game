"use client";
import { Suspense } from "react";
import { WinLossResultScreenComponent } from "@/components/win-loss-result-screen"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WinLossResultScreenComponent />
    </Suspense>
  )
}