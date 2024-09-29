"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, MinusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function TeamSelectionComponent() {
  const [teamA, setTeamA] = useState<string[]>([""])
  const [teamB, setTeamB] = useState<string[]>([""])
  const router = useRouter()

  const addPlayer = (team: "O" | "X") => {
    if (team === "O") {
      setTeamA([...teamA, ""])
    } else {
      setTeamB([...teamB, ""])
    }
  }

  const removePlayer = (team: "O" | "X", index: number) => {
    if (team === "O") {
      setTeamA(teamA.filter((_, i) => i !== index))
    } else {
      setTeamB(teamB.filter((_, i) => i !== index))
    }
  }

  const handlePlayerNameChange = (team: "O" | "X", index: number, value: string) => {
    if (team === "O") {
      const newTeamA = [...teamA]
      newTeamA[index] = value
      setTeamA(newTeamA)
    } else {
      const newTeamB = [...teamB]
      newTeamB[index] = value
      setTeamB(newTeamB)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the team data to your game state
    // For now, we'll just navigate to the next screen
    router.push("/roulette")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">チームを選択</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {["O", "X"].map((team) => (
              <div key={team} className="space-y-4">
                <h2 className="text-2xl font-semibold text-center text-gray-700">チーム {team}</h2>
                {(team === "O" ? teamA : teamB).map((player, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Label htmlFor={`team${team}Player${index}`} className="sr-only">
                      プレイヤー名
                    </Label>
                    <Input
                      id={`team${team}Player${index}`}
                      placeholder={`プレイヤー名`}
                      value={player}
                      onChange={(e) => handlePlayerNameChange(team as "O" | "X", index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayer(team as "O" | "X", index)}
                      disabled={(team === "O" ? teamA : teamB).length === 1}
                    >
                      <MinusCircle className="h-5 w-5" />
                      <span className="sr-only">削除</span>
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addPlayer(team as "O" | "X")}
                  className="w-full"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  追加
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">戻る</Link>
            </Button>
            <Button type="submit">次へ</Button>
          </div>
        </form>
      </div>
    </div>
  )
}