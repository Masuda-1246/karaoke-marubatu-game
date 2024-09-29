"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WinLossResultScreenComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [targetScore, setTargetScore] = useState<number>(0)
  const [scoreA, setScoreA] = useState<number>(0)
  const [scoreB, setScoreB] = useState<number>(0)

  useEffect(() => {
    // In a real application, you'd get the target score from your game state
    // For this example, we'll generate a random target score
    setTargetScore(Number(searchParams.get("totalScore")) || 0)
    setScoreA(Number(searchParams.get("scoreA")) || 0)
    setScoreB(Number(searchParams.get("scoreB")) || 0)
  }, [searchParams])

  const diffA = Math.abs(targetScore - scoreA)
  const diffB = Math.abs(targetScore - scoreB)
  const diff = Math.abs(diffA - diffB)
  const tileCount = diff > 5 ? 2 : 1
  const winner = diffA < diffB ? "Team O" : diffA > diffB ? "Team X" : "It's a tie!"
  const player = diffA < diffB ? "O" : "X"

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">結果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-2xl font-semibold text-center">
            目標点数: {targetScore}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TeamScoreCard team="Team O" score={scoreA} difference={diffA} />
            <TeamScoreCard team="Team X" score={scoreB} difference={diffB} />
          </div>
          <div className="text-2xl font-bold text-center mt-6">
            勝者: {winner}
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={() => router.push(`/tic-tac-toe?tileCount=${tileCount}&player=${player}`)}>
              次へ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TeamScoreCard({ team, score, difference }: { team: string; score: number; difference: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{team}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl">スコア: {score}</p>
        <p className="text-lg mt-2">差分: {difference}</p>
      </CardContent>
    </Card>
  )
}