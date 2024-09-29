"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"

export function ResultInputScreenComponent() {
  const [scoreA, setScoreA] = useState("")
  const [scoreB, setScoreB] = useState("")
  const [totalScore, setTotalScore] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the scores to your game state
    // For now, we'll just navigate to the next screen
    router.push(`/result?scoreA=${scoreA}&scoreB=${scoreB}&totalScore=${totalScore}`)
  }

  useEffect(() => {
    setTotalScore(searchParams.get("score") || "0")
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">結果入力</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="scoreA" className="text-lg font-medium">
                Team O スコア
              </Label>
              <Input
                id="scoreA"
                type="number"
                placeholder="Enter score for Team O"
                value={scoreA}
                onChange={(e) => setScoreA(e.target.value)}
                required
                min="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="scoreB" className="text-lg font-medium">
                Team X スコア
              </Label>
              <Input
                id="scoreB"
                type="number"
                placeholder="Enter score for Team X"
                value={scoreB}
                onChange={(e) => setScoreB(e.target.value)}
                required
                min="0"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/roulette")}
            >
              戻る
            </Button>
            <Button type="submit">次へ</Button>
          </div>
        </form>
      </div>
    </div>
  )
}