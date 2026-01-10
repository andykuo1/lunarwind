# Game

A co-op cooking game where you have to rush to get the ingredients and make stuff before the time runs out!

Chopped, Iron Chef, ....

Being able to prep!

## Pieces

```
face 1: [1]
face 2: [2]
face 3: [3]
face 4: [4]
face 5: [5]
face 6: [6]

cycle 1: [>6]

x1 time: ⏲
x1 heat: 🔥

+1 gold: ⛀
+2 gold: ⛁

solid: ■
liquid: ⬔
no-form: ▲

+1 stress

star: ✦

CUT: 🔪
MIX: 🪇
PLATE: 🍽️

ACTIONS: 💟
```

## Rules

Every tool can only hold 1 type of recipe at a time (can be multiples of the same though).

## Ideas

What about rolling a bunch of dice? And each number would be assigned to be used. This can be action points?

What about tapping a Supply Crate to generate it's resource? Some are unlimited, but others have a finite supply?

LVL 0 Chef (Your prestige), how many cards you can have in your deck. Like being able to have Running Shoes (it helps you move 2 stations at the cost of 1 time). Maybe this is the campaign?

There should be a movement time VS cooking time cost.

Chefs are placed at Stations. They can only move 1 station per turn.

Stations have "walk" borders, meaning they can only connect in 4 directions.

Chefs have engines to generate dice.

Because you can only pull out X supply out of a crate per turn, there needs to be counter stations, where you can hold stuff.

---

# Case Study 1 - Night of the Sweet Moon Festival

The night has just started and our boba stall already has a queue forming up! We gotta get all these thirsty customers satisfied before the unveiling of the Sweet Moon cake at MIDNIGHT!

We serve milk tea, black tea, and taiyaki. Toppings include boba, grass jelly, and jack fruit. Fillings include Custard Cream/Red-bean/Mung-bean. Teas include green/oolong/black.

...so how do you make those?

## Recipes Attempt 4

- Orders come in from the Scenario Deck. Each order gets a Patience Token each turn.
- Each Chef only has 3 actions and can only hold 1 item. Moving to another station is 1 action.
- Recipes are available for everyone and is part of the scenario.
- (no turn order? Could be fun chaos?)
- All timers advance.
- Any disasters resolve.

- Recipe: Simple Salad
  - Type: Salad
  - Chop 🔪 1 tomato ■
  - Chop 🔪 1 lettuce ■
  - Chop 🔪 1 onion ■
  - Optionally add any dressing ⬔
  - Mix 🪇 all together.
  - Serves 🍽️ 1 bowl.
  - // BACK
- ...

- Station: Stained Wooden Board
  - LVL 1 Cutter
  - 💟💟: Chop 🔪 1 item.
  - Cannot exceed 2 🔪🔪 cut per item.
- ...

- Station: Cracked Salad Tossing Bowl
  - LVL 1 Mixer
  - 💟💟: Mix 🪇 1 dish.
  - Cannot exceed 1 🪇 mixed per dish.
- ...

- Station: Take-out Paper Bowls
  - LVL 1 Server
  - 💟: Serve 🍽️ 1 bowl.
- ...

- Station: Supply Crates
  - 💟: Take out 1 item ■/⬔ (max 6).
  - 💟💟💟: Restock
- ...

- Equipment: Running Shoes
  - When moving, can move up to 2 stations instead.
  - Can only perform actions with at most 1 💟 action cost.
- ...

- Equipment: Handy Wooden Mixing Spoon
  - LVL 1 Mixer
  - 💟💟💟: Mix 🪇 1 dish.
  - Cannot exceed 1 🪇 mixed per dish.
- ...

- Equipment: Dandy Waterskin
  - Holds 1 liquid ⬔
- ...

- Equipment: Tattered Anti-Fatigue Mat
  - Can equip on a station
  - At end of turn, recover 💟 1 action if you haven't moved this turn.
- ...

- Station: Dingy Wash Basin
  - Type: LVL1 Cleaner
  - 💟💟💟 + 1 water ⬔: Clean 1 item.
- ...

- Recipe: Black Tea
  - Type: Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep for 4 turns.
  - Serve 2 cups.
  - // BACK
  - Grade: +Bitter per overtime or burned
  - If less than 2 heat, -Quality
- ...

--

Action cards give 1 💟 action OR it does some effect?

building engines, that exponentially compound together.

combo chains.

risk or bust. <-- scrappy

drafting or group selection.

each card does 2 separate things.

## Recipes Attempt 3

> This is to, instead, use dice as ACTIONS. Time will be a cyclic 3-phase counter?

- Station: Dingy Wash Basin
  - Type: LVL1 Cleaner
  - At time > 4 and [1] or [5]: 1 stress 👋; Consume 1 water ⬔ to clean 1 item.
- ...

- Station: Old Silver Kettle
  - Type: LVL1 Heater
  - Requires connected LVL1 Power.
  - 4 uses until dirty.
  - Retains heat.
  - At time < 2 and [1]+[2]+[3]+[4]: Exchange any items.
  - [1]+[2] or [4] or [6]: Heat 1 fluid ⬔.
- ...

- Station: Deviled Egg Timer
  - Tick: add [x][x] to Actions, +1 to time
  - Tock: add [x][x] to Actions, +1 to time
  - Rest: add [x] to Actions, +1 to time
  - If time > 6, burn anything still waiting and reset to 1.
- ...

- Station: Rusty-Wheeled Cooler
  - Requires connected LVL1 Power.
  - Holds 2 crates.
  - Retains cold.
- ...

- Station: 5 Gallon Water Jug
  - Holds 1 crate of liquid.
- ...

- Station: Supply Wagon
  - Holds 3 crates.
- ...

- Station: Supply Wagon
  - Holds 3 crates.
- ...

- Station: Booth Stool
  - Holds 1 customer.
- ...

- Station: Booth Stool
  - Holds 1 customer.
- ...

- Station: Booth Stool
  - Holds 1 customer.
- ...

- Station: Power Supply
  - Type: LVL1 Power
- ...

- Recipe: Black Tea
  - Type: Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep now until 4 time passes
  - Serve 2 cups of Black Tea
  - //-back-//
  - Grade: +Bitter per overtime or burned
  - If less than 2 heat, -Quality
- ...

- Recipe: Oolong Tea
  - Type: Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep now until 3 time passes
  - Serve 2 cups of Oolong Tea
  - //-back-//
  - Grade: +Bitter per overtime or burned
  - If less than 2 heat, -Quality
- ...

- Recipe: Green Tea
  - Type: Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep now until 2 time passes
  - Serve 2 cups of Green Tea
  - //-back-//
  - Grade: +Bitter per overtime or burned
  - If less than 2 heat, -Quality
- ...

- Recipe: Milk Tea
  - Add 1 any tea ⬔
  - Add 1 milk ⬔
  - Add 1 any sweet ▲
  - Mix until blended
  - Serve 1 cup of Milk Tea
  - //-back-//
  - Grade: If mixed less than blended, -Flair
  - If has ice ■, +Cold
  - If cold, +Quality
- ...

> Quality is the goodness of the food. It serves as a bonus.
> Flair is the presentation of the food. You get more flair as you spend more effort arranging the food.
> Mix has different levels: Folded, Stirred, Mixed, Blended, Smooth, Pureed

- Station: Dented Cocktail Shaker
  - Type: LVL1 Mixer
  - 1 use until dirty
  - Can remove any ice while keeping cold
  - [1]: Mix until stirred
  - If time > 3 and [1]+[2]+[3]: Mix until blended and 1 time passes
- ...

> Maybe you spend stress to buy dice?

> Buy re-supply with gold! So how do we earn gold?

> Flip upside down bowls that are dirty

> Move once per turn

## Recipes Attempt 2

> This is using dice counting up as time. And actions are performed on a number face.

- Station: Dingy Wash Basin
  - When on [1] or [5], spend 1 stress 👋 + 1 water ⬔ to clean 1 item.
- ...

- Station: Silver Kettle
  - Add/Remove on [1], [3]
  - Heat 1 on [2], [4], [6]
  - Dirty after use
- ...

- Recipe: Black Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep until [6] [6]
  - Makes 2 cups of Black Tea
  - //-back-//
  - Grade: +Bitter for each [6] used over x2
- ...

- Recipe: Oolong Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep until [4] [4]
  - Makes 2 cups of Oolong Tea
- ...

- Recipe: Green Tea
  - Add 1 cured leaf ■
  - Boil 2 water ⬔ ⬔ (🔥🔥)
  - Steep [6] [6]
  - Makes 2 cups of Green Tea
- ...

## Recipes Attempt 1

- Recipe: Boba Milk Tea
  - 1 Tea + 1 Milk + 1 Sweetner
  - Shake!
  - Add Toppings
  - DONE!
- ...

- Recipe: Green/Black/Oolong Tea
  - 1 Water + 1 Cured Leaf
  - Steep (overtime => +1 Bitter)
  - DONE!
- ...

- Recipe: Taiyaki
  - Medium-low HEAT + Oil
  - Pour 1 batter
  - Scoop filling into center of batter.
  - Cover and flip.
  - Cook.
  - Then flip.
  - Wait until golden brown.
  - DONE!
- ...

- Recipe: Batter
  - 1 flour + 1 baking powder + 1 sweetner
  - Whisk
  - Separately, 1 egg + 1 milk
  - Whisk
  - Combine both
  - Refridgerate for 1 hour.
- ...

- Recipe: Custard Cream
  - Low Heat, Saucepan, constant stirring
  - Mix egg yolk + sugar + flour
  - Heat milk until boiling
  - 20-25 min wait
- ...

- Recipe: Red-bean Paste
  - Red bean + sugar
  - DONE!
- ...

- Recipe: Mung-bean Paste
  - Mung-bean + sugar
  - DONE!
- ...

Boba - Black

Jelly - Yellow

Milk Tea - Brown

Cured Leaf - Yellow

Green Tea - Green

Black Tea - Black

Oolong Tea - Red

Custard Cream - White

Red Bean - Red

Mung Bean - Yellow

Crusted Tayaki Pan
Portable Stovetop
Rusty-Wheeled Cooler
Slippery Brewing Station
Flimsy Tabletop
Silver Kettle => Adds HEAT to liquid.

3 Seats at the booth
1 Power Generator => Gives 1 Power

The Wonderful Bag of Boba => Crate of Boba

TimeKeeper - Advances the time dice.

Steeping tea
Silver Kettle. Accepts ingredients if time < 3. On 6, heat 2 liquid.
