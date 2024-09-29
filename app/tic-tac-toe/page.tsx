"use client";
import { Suspense } from "react";
import { TicTacToeBoardScreenComponent } from "@/components/tic-tac-toe-board-screen"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicTacToeBoardScreenComponent />
    </Suspense>
  )
}