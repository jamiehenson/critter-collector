const critters = [
  {
    id: 1,
    name: "dog",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐶"
  },
  {
    id: 2,
    name: "cat",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐱"
  },
  {
    id: 3,
    name: "mouse",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐭"
  },
  {
    id: 4,
    name: "rabbit",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐰"
  },
  {
    id: 5,
    name: "gerbil",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐹"
  },
  {
    id: 6,
    name: "fox",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🦊"
  },
  {
    id: 7,
    name: "bear",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐻"
  },
  {
    id: 8,
    name: "panda",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐼"
  },
  {
    id: 9,
    name: "koala",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐨"
  },
  {
    id: 10,
    name: "tiger",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐯"
  },
  {
    id: 11,
    name: "lion",
    type: "fire",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🦁"
  },
  {
    id: 12,
    name: "cow",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐮"
  },
  {
    id: 13,
    name: "pig",
    type: "grass",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐷"
  },
  {
    id: 14,
    name: "frog",
    type: "water",
    healthPoints: 100,
    combatPoints: 100,
    icon: "🐸"
  },
  {
    id: 15,
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