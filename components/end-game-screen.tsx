"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import confetti from "canvas-confetti"

type BoardState = ("X" | "O" | null)[]

export function EndGameScreenComponent() {
  const router = useRouter()
  const [winner, setWinner] = useState<string | null>(null)
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const searchParams = useSearchParams()

  useEffect(() => {
    // In a real application, you'd get the winner and final board state from your game state
    // For this example, we'll set a random winner and board state
    const savedBoard = localStorage.getItem("tic-tac-toe-board")
    setBoard(savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null))

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  useEffect(() => {
    setWinner(searchParams.get("winner") || null)
  }, [searchParams])

  // boardに値が入っっている場合、ローカルストレージを削除
  useEffect(() => {
    if (board.some((cell) => cell !== null)) {
      localStorage.removeItem("tic-tac-toe-board")
    }
  }, [board])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-2xl font-semibold text-center">
            {winner ? `チーム${winner}の勝利！` : "引き分け"}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {board.map((cell, index) => (
              <div
                key={index}
                className="h-16 flex items-center justify-center text-2xl font-bold border border-gray-300 rounded"
              >
                {cell}
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => router.push("/team")}>
              もう一度プレイ
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              メニューに戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}