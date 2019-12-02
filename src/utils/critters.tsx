const critters = [
  {
    critterId: 1,
    name: "dog",
    type: "fire",
    icon: "🐶"
  },
  {
    critterId: 2,
    name: "cat",
    type: "fire",
    icon: "🐱"
  },
  {
    critterId: 3,
    name: "mouse",
    type: "grass",
    icon: "🐭"
  },
  {
    critterId: 4,
    name: "rabbit",
    type: "grass",
    icon: "🐰"
  },
  {
    critterId: 5,
    name: "gerbil",
    type: "grass",
    icon: "🐹"
  },
  {
    critterId: 6,
    name: "fox",
    type: "water",
    icon: "🦊"
  },
  {
    critterId: 7,
    name: "bear",
    type: "water",
    icon: "🐻"
  },
  {
    critterId: 8,
    name: "panda",
    type: "water",
    icon: "🐼"
  },
  {
    critterId: 9,
    name: "koala",
    type: "water",
    icon: "🐨"
  },
  {
    critterId: 10,
    name: "tiger",
    type: "fire",
    icon: "🐯"
  },
  {
    critterId: 11,
    name: "lion",
    type: "fire",
    icon: "🦁"
  },
  {
    critterId: 12,
    name: "cow",
    type: "grass",
    icon: "🐮"
  },
  {
    critterId: 13,
    name: "pig",
    type: "grass",
    icon: "🐷"
  },
  {
    critterId: 14,
    name: "frog",
    type: "water",
    icon: "🐸"
  },
  {
    critterId: 15,
    name: "monkey",
    type: "fire",
    icon: "🐵"
  }
]

export const typeModifiers = {
  fire: { fire: 1, water: 0.5, grass: 1.5 },
  water: { fire: 1.5, water: 1, grass: 0.5 },
  grass: { fire: 0.5, water: 1.5, grass: 1 }
}

export default critters