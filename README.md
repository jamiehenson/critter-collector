# CRITTER COLLECTOR

[Click here to play!](https://jamiehenson.com/critter-collector)

This is a simple Pokémon-style game built using React, Redux, Typescript, and Styled Components. The aim of the game is to catch as many "Critters" as you can without your own "Critters" dying first.

It was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Therefore it uses Webpack as its bundling vehicle, and can be ran locally with `yarn start`, built with `yarn build` and deployed to Github Pages with `yarn deploy`.

The features of the game are as follows: 
- A player can move around a randomly populated and fully-tracked 27x27 grid world with the player occupying the centre of the game's viewpoint (the world is re-rendered around them) in order to match the style of the game that inspired this exercise
- Players are not able to see Critters around the world unless they are within two squares of them, so they have to search for them!
- Players are able to battle Critters, and choose whether they wish to fight or flee from Critters they encounter. Battles are simulated in front of the player with full logged readouts
- If a player wins the battle, the opposing Critter is caught and added to the player's collection
- The world always has ten Critters in it at any one time (if one is caught, a new one spawns), as well as one Clinic, which the player can use to heal their Critters
- New Critter spawning operates on a difficulty ramp - the more that spawn over time, the higher the level they start as, to give the player an increasing challenge
- If a player's Critter is downed in battle, the game automatically selects another Critter as the main fighter. This active status is marked via a green tick icon in the Critter list within the footer UI
- Each Critter has a randomly assigned set of Health and Combat points, as well as a random starting level of between 1 and 3. If a Critter wins a battle, there's a 50% chance they'll level up. A level multiplies the original base stats of the Critter (i.e. L1: HP: 100, CP: 100, L2: HP: 200, CP: 200)
- Critters have different types assigned to them (either Fire, Water, or Grass), which are respectively more or less effective against other types (e.g. Fire is strong versus Grass, but vulnerable against Water)

Additional technical notes:
- The game uses emojis for a lot of its in game art. It was developed and mainly tested on MacOS (some testing was also done on Windows 10), which has a different emoji library to other OSs. Therefore, you may get very slight visual irregularities on OSs other than MacOS
- The game at present is designed for a landscape viewport. The sizing measurements within the game are governed by the viewport height, which makes for a smooth responsive experience on landscape screens (i.e. desktop, landscape mobile), but are not optimised for portrait viewports
- The controls for the game are the WASD keys or the arrow keys, there are no mobile controls at present - though this is not immediately necessary for the exercise
- It's worth mentioning that this exercise uses modern CSS functionality and was not developed with legacy support in mind, so an up-to-date Chromium browser is highly recommended