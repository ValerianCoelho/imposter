export function pickWeightedIndices(weights: number[], count: number): number[] {
  const remaining = weights.map((weight, index) => ({ index, weight }))
  const picked: number[] = []

  for (let i = 0; i < count && remaining.length > 0; i++) {
    const total = remaining.reduce((sum, entry) => sum + entry.weight, 0)
    let roll = Math.random() * total

    let pickedPosition = remaining.length - 1
    for (let position = 0; position < remaining.length; position++) {
      roll -= remaining[position].weight
      if (roll <= 0) {
        pickedPosition = position
        break
      }
    }

    picked.push(remaining[pickedPosition].index)
    remaining.splice(pickedPosition, 1)
  }

  return picked
}
