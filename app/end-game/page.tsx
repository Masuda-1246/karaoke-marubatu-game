"use client";

import { Suspense } from "react";
import { EndGameScreenComponent } from "@/components/end-game-screen"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EndGameScreenComponent />
    </Suspense>
  )
}