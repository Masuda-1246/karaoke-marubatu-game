/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function RouletteScreenComponent() {
  const router = useRouter()
  const [score, setScore] = useState<number | null>(null)
  const [topic, setTopic] = useState<string | null>(null)
  const [firstAttack, setFirstAttack] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const topics = ["Pop", "Rock", "Ballad", "Anime", "Oldies", "Hip-Hop"]
  const teams = ["チーム O", "チーム X"]

  const spinRoulette = (setter: React.Dispatch<React.SetStateAction<any>>, options: any[]) => {
    setIsSpinning(true)
    let spins = 0
    const maxSpins = 20 + Math.floor(Math.random() * 10)
    const interval = setInterval(() => {
      setter(options[Math.floor(Math.random() * options.length)])
      spins++
      if (spins >= maxSpins) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  const handleSpin = () => {
    if (!isSpinning) {
      setScore(null)
      setTopic(null)
      setFirstAttack(null)
      spinRoulette(setScore, Array.from({ length: 100 }, (_, i) => i + 1))
      spinRoulette(setTopic, topics)
      spinRoulette(setFirstAttack, teams)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">ルーレット</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouletteItem title="目標点数" value={score} />
          <RouletteItem title="お題" value={topic} />
          <RouletteItem title="先攻" value={firstAttack} />
        </div>
        <div className="flex justify-center">
          <Button onClick={handleSpin} disabled={isSpinning || (score !== null && topic !== null && firstAttack !== null)}>
            {isSpinning ? "回転中..." : "回す"}
          </Button>
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/team")}
          >
            戻る
          </Button>
          <Button type="button"
            disabled={score === null || topic === null || firstAttack === null}
            onClick={() => router.push(`/input?score=${score}&topic=${topic}&firstAttack=${firstAttack}`)}
          >
            次へ
          </Button>
        </div>
      </div>
    </div>
  )
}

function RouletteItem({ title, value }: { title: string; value: string | number | null }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <motion.div
        className="text-3xl font-bold"
        key={value as string}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value ?? "?"}
      </motion.div>
    </div>
  )
}