# This is the Math saga

Because there are finite ingredients (11 total) represented, all operations are basically math operations on a finite and discrete number set.

For example, let's look at some operations through math:

For prep

`+` as mixing ingredients

`-` as taking ingredients out

`x` as scaling a recipe

`//` as portioning a recipe

`%` as leftovers;

`clamp` as keep within;

We can also use modulus as a wrap-around clock.

For filtering or layering, we can use bitwise operations, with each bit acting as a bitmask (I think this itself should be named an action, and then all operations are done like this).

For recipe science

`GCD` as the smallest measuring unit of both numbers

`LCM` as when timers sync up

`prime` as when the flavor cannot divide evenly?

`totient` as flavor combo that won't clash?

--

For example, you may need to split a batch of ingredients into different serving amounts? And maybe leftovers are a penalty?

- Interesting ideas:
  - LCM as finding the common time both recipes need to be done-- or like when they both need to check time.
  - Double something for STRONG flavor (or advantage!)
  - Dilute or portion something for division.
- ...
- Interesting math ideas for finite sets.
  - Closure under min, max, bitwise AND/OR and clamp.
  - Modulus arithmetic to keep things in the set.
  - Exponentiation can loop with modulus.
  - integer division is irreversible.
  - Small-world (due to finite set) is good for graph traversal and state machines.
- ...

--

So let's take boba for example.

1. add milk (white)
2. add sugar (pink)
3. add boba (brown)
4. MIX

Steeping tea. Maybe this multiplies?

# How to represent food

This is so ingredients can be swapped. It should make generally sensible recipes.

By color. (white, brown, green, etc)
By form. solid cube/clear cube/solid pyramid (solid, liquid, mutable)

Jelly => Mutable/Flowable/Shifting/Amorphous

Paste => Liquid Powder

Frozen => Cold Solid

Powder => High Granularity

What is foam? A fluffy texture + ??? Is it a solid, liquid, or jelly? Maybe it's a fluffy jelly.

Textures: Soft/Fluffy, Crispy/Crackly, Chewy, Dense/Firm, Grainy/Coarse, Liquid/Slippery, Fiberous/Stringy, Sticky, Gelatinous.

By texture?

By temp. This is unique as it should be a WHOLE BOWL property. Mixing these will balance out temp.

By taste? Umami, Bitter, Sweet, Sour, Salty, Spicy
By texture?
By smell? Floral, Woody, Fruity, Ethereal, Peppermint, Sweet, Smoky, Citrus, Putrid, Moldy

Viscocity?
Granularity?
Density?

Boba => Brown + White + Black
Salad => Green + Red + White + Black
Guacamole => Green + Red + White + Black
Spagetti => Yellow + Red + Brown
Sushi Roll => White + Black + Red + Green
Fried Rice => Yellow + Orange + Green + Red

The outcome of a card should be on a banner at the top or bottom of the card, so you can stack them and display all the outputs together in a list.

---

# How to represent the game

Cocktail Shakers.

- With ICE, it will chill it to be consumed immediately, without putting in ICE in the final product.

"Stirred not shaken"

Scenario

Chef

Recipes

The FIREMASTER is in charge of increasing the timers on all fire sources (this could be just one, or some chefs can have their personal stoves). This is usually denoted by the fire source card (which should be provided by the scenario).

Maybe there's a table EGG TIMER that times each turn.

Fire, Time, Fatigue, Gold, Power

Recipe cards on one side is the recipe steps, the other is the grading criteria, for example, being well-mixed.

maybe you have pawns to "man" a station.

Running shoes, does not get fatigue from changing stations, but cannot do labor.

TIMEKEEPER? Instead of a real clock, a time keeper advances time.

Certain actions only play on even or odd time.

- Like all flips happen on even time.

A good chef reduces stress and makes the team function.

STRESSMANAGER

---

I would think TimeKeeper keeps track of time given stress. FireMaster controls fire levels is correct given time. StressManager manages stress so no one person is burned out. And... gold.

## How does time work?

Time advances by the call of the time keeper through trading in stress. Actions usually only happen on certain time numbers.

Stress is usually only accumulated by playing actions. The day ends if everyone is exhausted, limiting "play time".

Fire changes by the call of the fire master through trading in time.

Yellow, Orange, Red, Blue, White?
LOW, MED, MED-HIGH, HIGH, ULTRA

Power is usually fixed by the scenario. Sometimes it requires fuel to activate. Power is used when connecting tools, limiting "power level".

Supply advances by the stock caller through trading in gold. Once a re-supply is called, all supply if refilled. It gets more expensive each time. This also advances the scenario.

- Coal Generator
  - Spend 1 coal to burn this turn.
- ...

# What are the transformations?

So we have stations and recipes.

Recipes have steps and it is up to the chef to transform those colors. And most of the transformations must be used with a tool.

Given so many different colors, usually a chef will focus on a certain range of color transforms.... or does the tool have transformation rules?

Should different games have different rarity of colors? OR should like red cubes be a beginner's deck?

If the rarity of color is determined by the scenario through the supply crate, maybe it also lists the primary and secondary colors?

So chef cards refer to primary or secondary colors when performing actions.... but that's kinda hard on new players.

Is there a better way?

If you have tool cards in the supply deck, we could mix it with the scenario deck and then over time, more and more of the scenario deck would be just customer cards, making it harder for the next day.

what are all the recipes?

categorize popular fictoional chefs-- these are our archetypes. maybe the play archetypes of overcooked.

... can this simulate Hell's kitchen?

... can this simulate Delicious in Dungeon?

# Forget that, let's just make the actual cards we know.
