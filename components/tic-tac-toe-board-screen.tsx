"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

type Player = "X" | "O"
type BoardState = (Player | null)[]

const Circle = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4"/>
  </svg>
)

export function TicTacToeBoardScreenComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [marksLeft, setMarksLeft] = useState(3) // Assume 3 marks for this example
  const [gameEnded, setGameEnded] = useState(false)

  useEffect(() => {
    const tileCount = Number(searchParams.get("tileCount")) || 1
    setMarksLeft(tileCount)
    setCurrentPlayer(searchParams.get("player") as Player || "X")
  }, [searchParams])

  const checkWinner = (boardState: BoardState): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a]
      }
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || gameEnded || marksLeft === 0) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    setMarksLeft(marksLeft - 1)

    const winner = checkWinner(newBoard)
    if (winner) {
      setGameEnded(true)
    }
  }

  const handleNextRound = () => {
    localStorage.setItem("tic-tac-toe-board", JSON.stringify(board))
    router.push("/roulette")
  }

  useEffect(() => {
    if (gameEnded) {
      const timer = setTimeout(() => {
        router.push(`/end-game?winner=${currentPlayer}`)
        localStorage.setItem("tic-tac-toe-board", JSON.stringify(board))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [gameEnded, router])

  useEffect(() => {
    const savedBoard = localStorage.getItem("tic-tac-toe-board")
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">ボード</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {board.map((cell, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 text-4xl flex items-center justify-center"
                onClick={() => handleClick(index)}
                disabled={cell !== null || gameEnded}
              >
                {cell === "X" ? <X size={48} /> : cell === "O" ? <Circle /> : null}
              </Button>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">現在のプレイヤー: {currentPlayer}</p>
            <p className="text-lg">残り: {marksLeft}</p>
          </div>
          {gameEnded ? (
            <p className="text-xl font-bold text-center">
              {currentPlayer}の勝利!
            </p>
          ) : marksLeft === 0 ? (
            <Button className="w-full" onClick={handleNextRound}>
              次のラウンドへ
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}