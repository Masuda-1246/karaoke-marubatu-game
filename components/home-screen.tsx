'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          カラオケ○×ゲーム
        </h1>
        <div className="space-y-4">
          <Button asChild className="w-full py-6 text-xl">
            <Link href="/team">ゲーム開始</Link>
          </Button>
          <Button asChild className="w-full py-6 text-xl">
            <Link href="/rules">ルール</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}