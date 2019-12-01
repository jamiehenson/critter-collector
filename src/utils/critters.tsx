const critters = [
  {
    name: "dog",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐶"
  },
  {
    name: "cat",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐱"
  },
  {
    name: "mouse",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐭"
  },
  {
    name: "rabbit",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐰"
  },
  {
    name: "gerbil",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐹"
  },
  {
    name: "fox",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🦊"
  },
  {
    name: "bear",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐻"
  },
  {
    name: "panda",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐼"
  },
  {
    name: "koala",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐨"
  },
  {
    name: "tiger",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐯"
  },
  {
    name: "lion",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🦁"
  },
  {
    name: "cow",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐮"
  },
  {
    name: "pig",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐷"
  },
  {
    name: "frog",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐸"
  },
  {
    name: "monkey",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐵"
  }
]

export const typeModifiers = {
  fire: { fire: 1, water: 0.5, grass: 1.5 },
  water: { fire: 1.5, water: 1, grass: 0.5 },
  grass: { fire: 0.5, water: 1.5, grass: 1 }
}

export default critters