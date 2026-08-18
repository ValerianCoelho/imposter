import { useState } from 'react'
import { Lightbulb, Pointer, VenetianMask } from 'lucide-react'

type PlayerCardProps = {
  playerNumber: number
  instruction?: string
} & (
  | { variant: 'word'; word: string }
  | { variant: 'imposter'; hint?: string }
)

const RAY_LIGHT = '#F6D75C'
const RAY_DARK = '#EBC22F'
const RAY_SEGMENT_DEG = 15

const raysBackground = `repeating-conic-gradient(from ${
  -RAY_SEGMENT_DEG / 2
}deg at 50% 100%, ${RAY_LIGHT} 0deg ${RAY_SEGMENT_DEG}deg, ${RAY_DARK} ${RAY_SEGMENT_DEG}deg ${
  RAY_SEGMENT_DEG * 2
}deg)`

export default function PlayerCard({
  playerNumber,
  instruction = 'Do not tell the word to other players.',
  ...variantProps
}: PlayerCardProps) {
  const [isHolding, setIsHolding] = useState(false)

  const startHold = () => setIsHolding(true)
  const endHold = () => setIsHolding(false)

  return (
    <div className="[perspective:1400px]">
      <div
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        className="relative w-72 h-96 cursor-pointer select-none touch-none transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{
          transform: isHolding
            ? 'rotateY(180deg) rotateX(6deg) scale(1.04)'
            : 'rotateY(0deg) rotateX(0deg) scale(1)',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex flex-col items-center rounded-[28px] px-6 py-9 shadow-2xl [backface-visibility:hidden]"
          style={{ backgroundImage: raysBackground }}
        >
          <h1 className="mt-2 text-4xl font-extrabold tracking-wide text-black">
            PLAYER {playerNumber}
          </h1>
          <p className="mt-4 max-w-[80%] text-center text-[15px] leading-snug text-black/80">
            {instruction}
          </p>

          <div className="flex flex-1 items-center justify-center">
            <Pointer size={56} strokeWidth={2} className="text-black" />
          </div>

          <p className="mb-2 text-xl font-extrabold tracking-wide text-black">
            HOLD TO REVEAL
          </p>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[28px] bg-neutral-900 px-8 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          {variantProps.variant === 'word' ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                The word is
              </span>
              <span className="text-center text-3xl font-extrabold tracking-wide text-white">
                {variantProps.word}
              </span>
            </>
          ) : (
            <>
              <VenetianMask size={48} strokeWidth={2} className="text-white" />
              <span className="text-center text-2xl font-extrabold tracking-wide text-white">
                YOU ARE THE IMPOSTER
              </span>
              {variantProps.hint ? (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
                  <Lightbulb size={20} strokeWidth={2} className="shrink-0 text-yellow-300" />
                  <span className="text-sm text-white/90">{variantProps.hint}</span>
                </div>
              ) : (
                <span className="text-sm text-white/60">
                  No hint this time — good luck blending in.
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
