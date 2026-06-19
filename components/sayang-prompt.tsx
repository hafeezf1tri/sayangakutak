"use client"

import { useCallback, useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingHearts } from "@/components/floating-hearts"

type Stage = "asking" | "tipu"

// Number of times the "Tak" button has been dodged grows the teasing copy.
const TAK_TEASES = [
  "Tak, tak sayanggg",
  "Cubalah tekan 😏",
  "Tak dapat kannn",
  "Hehe laju lagi",
  "Menyerahlah sayang 🥺",
]

export function SayangPrompt() {
  const [stage, setStage] = useState<Stage>("asking")
  const [dodge, setDodge] = useState({ x: 0, y: 0 })
  const [dodgeCount, setDodgeCount] = useState(0)

  const runAway = useCallback(() => {
    // Jump to a random nearby offset so the "Tak" button is hard to catch.
    const x = (Math.random() - 0.5) * 220
    const y = (Math.random() - 0.5) * 180
    setDodge({ x, y })
    setDodgeCount((c) => c + 1)
  }, [])

  const pickSayang = useCallback(() => {
    setStage("tipu")
    // Reset back to the start after the little gotcha moment.
    window.setTimeout(() => {
      setStage("asking")
      setDodge({ x: 0, y: 0 })
      setDodgeCount(0)
    }, 2600)
  }, [])

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#334EAC_0%,#081F5C_52%,#06143F_100%)] px-5 py-10">
      <FloatingHearts />

      <section className="relative z-10 w-full max-w-md">
        {stage === "asking" ? (
          <div className="animate-pop-in rounded-4xl border border-primary/55 bg-card/90 p-8 text-center shadow-xl shadow-black/25 backdrop-blur-sm sm:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 ring-1 ring-sky/60">
              <Heart className="h-8 w-8 text-primary" fill="currentColor" />
            </div>

            <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sayang aku tak?
            </h1>
            <p className="mt-3 text-balance leading-relaxed text-muted-foreground">
              Jawab jujur tau... aku tengah tunggu ni 👀
            </p>

            <div className="relative mt-8 flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={pickSayang}
                className="h-auto w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-md shadow-black/20 transition-transform hover:scale-[1.03] hover:bg-sky"
              >
                Ya, saya sayanggggg
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onMouseEnter={runAway}
                onClick={runAway}
                onTouchStart={(e) => {
                  e.preventDefault()
                  runAway()
                }}
                style={{
                  transform: `translate(${dodge.x}px, ${dodge.y}px)`,
                }}
                className="h-auto w-full rounded-2xl bg-accent py-4 text-lg font-semibold text-accent-foreground transition-transform duration-200 ease-out hover:bg-primary"
              >
                {TAK_TEASES[Math.min(dodgeCount, TAK_TEASES.length - 1)]}
              </Button>
            </div>

            {dodgeCount > 2 && (
              <p className="mt-6 text-sm text-muted-foreground">
                {'Tekan je "Ya" tu sayang 😚'}
              </p>
            )}
          </div>
        ) : (
          <div className="animate-pop-in rounded-4xl border border-primary/55 bg-card/90 p-10 text-center shadow-xl shadow-black/25 backdrop-blur-sm">
            <div className="animate-wiggle text-6xl sm:text-7xl" aria-hidden>
              😝
            </div>
            <h2 className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
              love youuuuuu tooooo 💕
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-muted-foreground">
              Hehe gotcha! Jom cuba sekali lagi 💕
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
