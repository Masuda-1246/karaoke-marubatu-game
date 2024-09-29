"use client";
import { Suspense } from "react";
import { ResultInputScreenComponent } from "@/components/result-input-screen"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultInputScreenComponent />
    </Suspense>
  )
}