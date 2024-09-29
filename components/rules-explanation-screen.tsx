'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function RulesExplanationScreenComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Game Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">Objective</h2>
                <p>Win the Karaoke Marubatsu Game by completing a line on the tic-tac-toe board through successful karaoke performances.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Game Flow</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Players are divided into two teams: Team O and Team X.</li>
                  <li>O roulette determines the target score, song theme, and which team goes first.</li>
                  <li>Teams take turns performing karaoke.</li>
                  <li>After each performance, scores are compared to the target score.</li>
                  <li>The team closer to the target score wins the round and marks a square on the tic-tac-toe board.</li>
                  <li>The game continues until one team completes a line on the board.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Scoring</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>The target score is randomly determined by the roulette.</li>
                  <li>Teams aim to get as close to the target score as possible.</li>
                  <li>The team with the score closest to the target wins the round.</li>
                  <li>In case of a tie, both teams mark a square.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Tic-Tac-Toe Board</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>The board is a 3x3 grid.</li>
                  <li>The winning team of each round marks a square of their choice.</li>
                  <li>The first team to complete a line (horizontal, vertical, or diagonal) wins the game.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">Winning the Game</h2>
                <p>The game ends when one team completes a line on the tic-tac-toe board. That team is declared the winner of the Karaoke Marubatsu Game.</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Button asChild className="mt-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
    </div>
  )
}