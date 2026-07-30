import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename;

export const recipes = [
  {
    title: "Open Face Breakfast Sandwich",
    slug: "open-face-breakfast-sandwich",
    mealType: ["breakfast"],
    diet: [],
    style: ["eggs"],
    servings: 1,
    calories: 194, protein: 11, carbs: 15, fat: 9,
    ingredients: ["1/2 tablespoon olive oil","1/2 clove garlic, minced","10g sun-dried tomatoes (not packed in oil), chopped","1 large egg","10g low-fat feta cheese","Coarse rock salt and freshly ground black pepper","1 slice wholegrain bread, toasted","Fresh chopped parsley (optional)"],
    method: ["In a large non-stick pan, heat the oil over medium-low heat.","Add the garlic and sun-dried tomatoes and cook, stirring, for 1-3 minutes or until the garlic is fragrant and translucent.","Crack the egg into the pan and sprinkle with feta, salt, and pepper.","Cover and cook undisturbed until the egg is cooked to your liking.","Jiggling the pan slightly will allow you to check the yolk - a runny yolk will move, a fully cooked yolk will be firm.","Transfer the egg along with some of the tomato and garlic to the toast and sprinkle with parsley if desired."]
  },
  {
    title: "The Cook Up",
    slug: "the-cook-up",
    mealType: ["breakfast"],
    diet: ["high-protein"],
    style: ["eggs"],
    servings: 1,
    calories: 570, protein: 50, carbs: 42, fat: 9,
    ingredients: ["3 turkey bacon rashers","2 chicken chipolatas","1 egg","1 slice of bread","100g mushroom","100g beans"],
    method: ["Place sausages in the grill or oven.","After 5 minutes, add the bacon.","Chop the mushrooms, spray a pan with a couple of 1kcal fry sprays, add the mushrooms then the egg (or poach the egg).","Heat the beans in a small pan.","Toast the bread to your preference.","Plate and enjoy."]
  },
  {
    title: "Oreo Milkshake",
    slug: "oreo-milkshake",
    mealType: ["snack", "dessert"],
    diet: ["high-protein"],
    style: ["shake"],
    servings: 1,
    calories: 493, protein: 45, carbs: 46, fat: 9,
    ingredients: ["2 scoops protein powder","2 Oreos","1 banana","250ml almond milk"],
    method: ["Place all ingredients into a blender.","Blend.","Enjoy."],
    tip: "Reduce 89 kcals by removing the banana if wanted."
  },
  {
    title: "Breakfast Burrito",
    slug: "breakfast-burrito",
    mealType: ["breakfast"],
    diet: ["high-protein"],
    style: ["mexican"],
    servings: 1,
    calories: 535, protein: 55, carbs: 39, fat: 18,
    ingredients: ["1 tortilla wrap","2 eggs","125g 2% turkey mince","50g salsa","1 cheese slice","50g onion","Paprika","Cumin","Salt","Coriander"],
    method: ["Whisk the eggs with paprika and salt, set aside.","Cook the turkey with the rest of the seasoning, adjusting spice to your desired heat level. Once cooked, place the turkey in a dish.","Use the same pan to scramble the egg, then place on a plate when done.","Place the wrap on a plate and add the salsa, turkey, egg and cheese. Wrap them compactly.","Using the cleaned pan, lightly spray with oil and on medium heat cook the wrap seam-side down until golden brown, then flip and cook the other side the same way.","Enjoy."]
  },
  {
    title: "Breakfast Egg Muffin",
    slug: "breakfast-egg-muffin",
    mealType: ["breakfast"],
    diet: ["low-carb"],
    style: ["eggs"],
    servings: 6,
    servingNote: "Makes 6 muffins — macros shown are per muffin",
    calories: 129, protein: 10, carbs: 1, fat: 10,
    ingredients: ["1 kcal cooking spray","6 eggs","Salt and pepper to taste","110g cooked spinach","75g cooked bacon, chopped","35g grated cheese","Diced tomatoes and parsley to garnish"],
    method: ["Preheat your oven to 190°C/375°F/gas 5. Coat six cups of a muffin tin with cooking spray, or line them with paper liners.","Crack the eggs into a large bowl and whisk until smooth - this should only take a minute or less.","Add the spinach, bacon and cheese to the egg mixture and stir until well combined.","Divide the egg mixture evenly between the six muffin cups.","Bake for 15-18 minutes or until the eggs are set.","Serve immediately garnished with diced tomatoes and parsley if desired, or store in the fridge once cooled until ready to eat."]
  },
  {
    title: "Protein Pancakes 1.0",
    slug: "protein-pancakes-1-0",
    mealType: ["breakfast"],
    diet: ["high-protein"],
    style: [],
    servings: 1,
    calories: 463, protein: 52, carbs: 40, fat: 8,
    ingredients: ["1 egg","2 scoops protein powder","40g self-raising flour","1/4 tsp baking powder","80ml almond milk"],
    method: ["Mix the protein powder and flour.","Add the egg and almond milk.","Whisk together with a fork until it's a batter (thicker than a normal pancake mix). If too thick, add a splash of water.","Spray a frying pan with 1kcal sprays and bring to medium heat. Add the mixture in pancake-sized amounts.","Add a lid and cook until the top bubbles, then flip and cook until browned.","Top if you wish - a favourite is honey, or a drizzle made from 1/4 scoop of protein mixed with a dash of almond milk."]
  },
  {
    title: "Coconut Protein Bites",
    slug: "coconut-protein-bites",
    mealType: ["snack"],
    diet: [],
    style: [],
    servings: 12,
    servingNote: "Makes 12 balls — macros shown are per ball",
    calories: 99, protein: 6, carbs: 5, fat: 6,
    ingredients: ["100g almond butter","45g whey protein powder","40g coconut flour","40g honey","1/4 tsp vanilla flavouring","65ml skimmed milk","Desiccated coconut for dressing"],
    method: ["Mix all ingredients in a bowl except the desiccated coconut.","Weigh out the mixture and divide into 12 equal bites, rolling each one in the palms of your hand.","Roll them in the coconut.","Place the balls on a plate or in an airtight container and refrigerate for at least 2 hours before serving."]
  },
  {
    title: "Raspberry Protein Roulade",
    slug: "raspberry-protein-roulade",
    mealType: ["dessert"],
    diet: ["high-protein"],
    style: [],
    servings: 2,
    calories: 289, protein: 32, carbs: 16, fat: 11,
    ingredients: ["4 eggs","400g kefir quark yoghurt","4 tbsp stevia or sweetener","1/2 tsp almond or vanilla extract","A handful of raspberries (or berries of choice)"],
    method: ["Preheat your oven to 180°C.","Separate the eggs into yolks and whites.","Add 200g of quark to the yolks with 2 tbsp of sweetener and 1/4 tsp vanilla or almond extract and combine well.","Whisk the whites into stiff peaks and fold into the yolk mixture, being careful not to knock out the air.","Spray a roasting tray with low-calorie spray and spread the mixture out evenly.","Bake for 15 minutes or until the desired colour, then allow to fully cool.","Meanwhile, add 2 tbsp sweetener to the remaining 200g of quark. Once the roulade is cooled, spring it from the tray and spread the mixture over it. Add the raspberries and roll carefully.","Keeps in the fridge."]
  },
  {
    title: "Cheesecake Berry Pudding",
    slug: "cheesecake-berry-pudding",
    mealType: ["dessert"],
    diet: ["high-protein"],
    style: [],
    servings: 1,
    servingNote: "444 kcal serves 1, or split into 2 portions of 222 kcal each",
    calories: 444, protein: 44, carbs: 24, fat: 20,
    ingredients: ["250g ricotta","1 scoop of flavoured whey protein powder","150g berries of choice","1 tsp lemon juice (optional)","Sweetener (optional)"],
    method: ["Place the protein powder and ricotta into a bowl and mix well until combined.","Add the berries (or any fresh fruit) with a small amount of lemon juice and stir to combine - if they break up slightly it adds to the swirl effect."]
  },
  {
    title: "Pulled Chicken in Slow Roasted Tomatoes",
    slug: "pulled-chicken-in-slow-roasted-tomatoes",
    mealType: ["dinner"],
    diet: ["high-protein", "low-carb"],
    style: ["chicken"],
    servings: 1,
    calories: 400, protein: 47, carbs: 13, fat: 17,
    ingredients: ["1 large beef tomato, diced","1/4 red onion","15g olive oil","1 large chicken breast (180-220g)","1/2 tsp dried oregano","1/2 tsp dried mint","1/2 tsp dried rosemary","1/2 tsp dried thyme","1 generous tsp balsamic vinegar","1 tsp lemon juice","A pinch of flaky sea salt"],
    method: ["Preheat the oven to 180°C.","In a roasting dish, add the diced tomato with the onion, olive oil, a pinch of salt and pepper, balsamic, lemon and herbs, and mix together well.","Place the chicken breast on top of the tomatoes in the tray and add another pinch of salt.","Roast for 30-40 minutes or until the sauce starts to thicken and the chicken is cooked through.","Remove from the oven and, using two forks, shred the chicken and mix it into the sauce."]
  },
  {
    title: "Carpese Frittata",
    slug: "carpese-frittata",
    mealType: ["breakfast", "lunch"],
    diet: ["low-carb"],
    style: ["eggs"],
    servings: 4,
    calories: 212, protein: 18, carbs: 4, fat: 16,
    ingredients: ["1 tsp olive oil","2 tsp minced garlic (or 2 large cloves, minced)","250g baby plum tomatoes","10g fresh basil leaves, finely sliced","Salt to season (optional)","8 large eggs","60ml unsweetened almond milk (or skimmed/low-fat milk)","100g baby spinach leaves","125g fresh mozzarella, thinly sliced into rounds","2 tbsp grated mozzarella (optional)","Balsamic glaze"],
    method: ["Preheat your oven or grill to medium heat.","Slice the tomatoes in half horizontally.","Heat the oil in a non-stick pan over medium-high heat. Once hot, add the garlic and cook for about a minute until fragrant. Add the tomatoes and basil and cook until the tomatoes are slightly blistered and soft.","While the tomatoes cook, whisk the eggs, milk and a pinch of salt together until well combined.","Transfer half the tomato mixture to a warmed plate, cover and set aside.","Pour the egg mixture into the remaining tomatoes in the pan and stir briefly to combine.","Reduce the heat to low-medium and add the spinach. Arrange the mozzarella slices over the top, pressing them in slightly, and cook until the eggs are almost set (around 8 minutes).","Sprinkle the extra cheese over the top if using, then transfer the pan to the preheated oven/grill until golden and cooked through.","To serve, warm the reserved tomato and basil mixture and spoon over the top, then drizzle with balsamic glaze."]
  },
  {
    title: "Red Pesto Meatball Pasta",
    slug: "red-pesto-meatball-pasta",
    mealType: ["dinner"],
    diet: ["high-protein"],
    style: ["pasta", "beef", "italian"],
    servings: 1,
    calories: 594, protein: 42, carbs: 56, fat: 22,
    ingredients: ["150g 5% beef mince","75g pasta of choice","50g red pesto","1/2 clove garlic, finely diced","1/2 red onion, diced","1/2 stick celery, finely sliced","2 sprigs fresh thyme (or 1/2 tsp dried)","1 tbsp chopped walnuts","Sea salt and black pepper"],
    method: ["Preheat the oven to 180°C.","Combine the beef, garlic, half the onion and thyme in a bowl with a pinch of salt and 25g of the pesto and mix together.","Roll into 1-inch meatballs and place on a roasting tray. Bake for 16-18 minutes, turning halfway - or cook smaller meatballs in a non-stick pan on low for 6-8 minutes a side with a lid on.","Bring salted water to the boil and cook the pasta according to pack instructions. Drain and toss with the remaining onion, walnuts, celery, black pepper and pesto.","Remove the meatballs from the oven, adding any juices to the pasta. Toss together and serve with crisp salad greens."]
  },
  {
    title: "Smashburger with Mash, Cheese & Pickles",
    slug: "smashburger-with-mash-cheese-pickles",
    mealType: ["dinner"],
    diet: ["high-protein"],
    style: ["beef", "fakeaway"],
    servings: 2,
    calories: 497, protein: 32, carbs: 45, fat: 21,
    ingredients: ["200g 5% beef mince","2 tsp olive oil","1/2 red onion, diced","1 clove garlic, diced","1 tbsp balsamic vinegar","1/2 tsp sugar","1 tsp reduced-fat hummus","1/2 tsp Dijon mustard","300g white potato, diced","1 bay leaf","60ml buttermilk","60g cheddar","Pickles of your choice (pink onions or sandwich pickles)","Greens to serve"],
    method: ["Add sea salt, bay leaf and water to a pot and boil the potatoes for 8-10 minutes.","Meanwhile, preheat a non-stick pan over medium heat, add the olive oil, red onion, garlic, salt and sugar, and sauté for 2-3 minutes. Once slightly soft, add the balsamic vinegar, stir to coat for 15-20 seconds, then decant into a mixing bowl. Clean the pan and return to the heat.","Add the beef mince and hummus to the onions, mix well with your hands and roll into two balls.","Place the patties in the pan and press down with the back of a spatula. Add a pinch of salt and leave untouched for 2-3 minutes or until the edges start to look done.","Flip the burger, coat this side with Dijon mustard and cook for 2 more minutes.","Meanwhile, drain the potato water, discard the bay leaf, and return the potatoes to the pan on low heat. Add the buttermilk and a pinch of salt and mash well.","Plate the mash, lay the burger on top, dice the cheddar over it, and serve with pickles and your favourite steamed greens, coleslaw or fresh salsa."]
  },
  {
    title: "Quick & Easy Naan Bread",
    slug: "quick-easy-naan-bread",
    mealType: ["side"],
    diet: [],
    style: ["bread", "indian"],
    servings: 5,
    servingNote: "Makes 5 naans",
    calories: 265, protein: 6, carbs: 42, fat: 8,
    ingredients: ["250g plain flour","2 tsp sugar","1/2 tsp salt","1/2 tsp baking powder","120ml milk","2 tbsp vegetable oil, plus extra for greasing"],
    method: ["For the dough, sift the flour, sugar, salt and baking powder into a bowl.","In another bowl, mix together the milk and oil. Make a well in the centre of the flour mixture and pour in the liquid, slowly mixing from the centre outwards to make a smooth, soft dough.","Knead well for 8-10 minutes, adding a little flour if the dough is too sticky.","Place the dough in an oiled bowl, cover with a damp tea towel and leave in a warm place for 10-15 minutes.","Form the dough into five balls.","Preheat the grill to medium and place a heavy baking sheet on the upper shelf to heat.","Roll the dough balls out thinly and pull into a teardrop shape (not essential, but makes them look authentic). Sprinkle over your chosen topping and press into the surface.","Place the naans onto the hot baking sheet and grill for 1-2 minutes, or until lightly browned.","Brush with butter and serve hot."]
  },
  {
    title: "Sirloin Steak Salad",
    slug: "sirloin-steak-salad",
    mealType: ["dinner"],
    diet: ["high-protein", "low-carb", "zero-carb"],
    style: ["beef", "salad"],
    servings: 2,
    calories: 391, protein: 62, carbs: 0, fat: 17,
    ingredients: ["2 x 200g sirloin steaks, 2-3cm thick","1 tbsp sunflower oil","Sea salt","Black pepper"],
    method: ["Take the steaks out of the fridge 60 minutes before cooking. Pat dry and season both sides with sea salt.","Heat a large frying pan over very high heat until hot. Add the oil, then immediately place the steaks in. Turn every minute for an even brown crust. Cook for approx. 3 minutes total for rare, 5 for medium, 8 for well done. Use a thermometer for accuracy: 50°C rare, 60°C medium, 70°C well done. If the steak has a fat cap, hold it on its side with tongs to render it golden.","Plate, cover with foil and rest for 5 minutes. Serve with a salad of your choice."]
  },
  {
    title: "Prawn Stir Fry",
    slug: "prawn-stir-fry",
    mealType: ["dinner"],
    diet: ["high-protein"],
    style: ["seafood", "asian"],
    servings: 2,
    calories: 652, protein: 73, carbs: 105, fat: 11,
    ingredients: ["2 carrots, sliced thin lengthways","130g baby corn","100g tenderstem broccoli","100g courgettes","1 large red pepper","1/2 a medium white cabbage","1 tbsp olive oil","1 garlic clove, sliced","1cm piece fresh ginger, grated","1 1/2 tbsp soy sauce","200g cooked prawns","200g noodles of choice"],
    method: ["Finely slice all the veg into roughly equal-sized pieces. Heat the oil in a large wok and fry the garlic and ginger for 60 seconds.","Add the veg to the wok and toss to coat. Fry for 2-3 minutes, then pour over the soy sauce and mix well. Cook for another 2-3 minutes until the veg starts to soften.","Add the prawns, stir and heat through. Serve over the cooked noodles."]
  },
  {
    title: "Sweet Potato Fajitas",
    slug: "sweet-potato-fajitas",
    mealType: ["dinner"],
    diet: ["vegetarian"],
    style: ["mexican"],
    servings: 2,
    calories: 488, protein: 12, carbs: 87, fat: 13,
    ingredients: ["2 large sweet potatoes","1 white onion","2 red onions","1 large red pepper","1 tbsp vegetable oil","30g sachet fajita seasoning","4 large tortilla wraps","A handful of coriander, chopped","Low-fat soured cream, to serve","Iceberg lettuce","A small amount of reduced-fat feta, diced"],
    method: ["Heat the oven to 200°C/180°C fan. Chop all the veg into large chunks and toss in a bowl with the oil and fajita seasoning. Spread in a single layer on a large baking tray and bake for 40 minutes, turning at the 20-minute mark.","Sprinkle the cooked veg with coriander. Warm the wraps, load with veg, add a dollop of soured cream, some lettuce and diced feta. Roll up and serve."]
  },
  {
    title: "Cous Cous Salad",
    slug: "cous-cous-salad",
    mealType: ["lunch"],
    diet: ["vegetarian"],
    style: ["salad"],
    servings: 1,
    calories: 414, protein: 17, carbs: 51, fat: 18,
    ingredients: ["100g couscous","200ml hot vegetable stock","1 spring onion","1 red pepper","1/2 cucumber","50g feta cheese, crumbled","2 tbsp pesto","2 tbsp pine nuts (or nuts of choice)"],
    method: ["Pour the hot vegetable stock over the couscous, cover and leave for 10 minutes until all the stock is absorbed and the couscous is fluffy.","Slice the spring onion, pepper and cucumber and add to the couscous along with the pesto and crumbled feta. Scatter the pine nuts over to serve."]
  },
  {
    title: "Breakfast Muffin",
    slug: "breakfast-muffin",
    mealType: ["breakfast"],
    diet: ["high-protein"],
    style: ["fakeaway", "eggs"],
    servings: 1,
    calories: 481, protein: 30, carbs: 26, fat: 29,
    ingredients: ["1 breakfast muffin","2 lean bacon rashers","1 pork sausage","1 egg"],
    method: ["Cook the sausage for 5 minutes, then add the bacon.","Cook the egg - for that classic round shape, cook it in a mini pancake mould.","Lightly toast the muffin.","Slice the sausage lengthways.","Add your favourite sauce and assemble."]
  },
  {
    title: "Carrot Cake Protein Porridge",
    slug: "carrot-cake-protein-porridge",
    mealType: ["breakfast"],
    diet: ["high-protein"],
    style: [],
    servings: 1,
    calories: 456, protein: 29, carbs: 49, fat: 13,
    ingredients: ["50g oats","1/2 carrot, finely grated","20g raisins","150ml almond milk","1 scoop vanilla protein powder","1 tsp cinnamon","Walnuts, to top"],
    method: ["Place the almond milk in a saucepan on low heat, add the oats, cinnamon and carrot.","Stir continually until the oats are cooked, adding more liquid if needed.","Once cooked, remove from the heat and stir in the protein powder.","Stir in the raisins and transfer to a bowl.","Top with walnuts and enjoy."]
  },
  {
    title: "Chicken Carbonara",
    slug: "chicken-carbonara",
    mealType: ["dinner"],
    diet: ["high-protein"],
    style: ["pasta", "chicken", "italian"],
    servings: 2,
    calories: 612, protein: 47, carbs: 60, fat: 20,
    ingredients: ["250g chicken breast","1 shallot, diced","1 clove garlic, finely chopped","8g olive oil","150g dry weight wholegrain pasta","60g grated cheddar","80g light Philadelphia","2 sprigs fresh thyme","1 tsp dried parsley","1 tsp smoked paprika","1/8 tsp nutmeg","Fresh black pepper and sea salt"],
    method: ["Boil water, add sea salt and cook the pasta according to pack instructions.","Meanwhile, slice the chicken breast and preheat a non-stick pan over medium heat. Add the olive oil and chicken and cook for 2-3 minutes until white through. Add the shallot and garlic and cook for 1-2 minutes, then add the paprika, thyme and parsley and cook the chicken through completely.","Drain the pasta, reserving 2 tbsp of the water, and add to the chicken along with the cheese and reserved water. Turn to a low heat, stir the cheese through and add the light Philadelphia, combining well. Grate over the nutmeg and add plenty of black pepper."]
  }
];

// Real photos sourced from Unsplash (free stock), matched per dish.
const IMAGES = {
  "open-face-breakfast-sandwich": "https://images.unsplash.com/photo-1525351484163-7529414344d8",
  "the-cook-up": "https://images.unsplash.com/photo-1541329351076-600b0f9fdf28",
  "oreo-milkshake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
  "breakfast-burrito": "https://images.unsplash.com/photo-1711488735428-27c6757beb5c",
  "breakfast-egg-muffin": "https://images.unsplash.com/photo-1642463045543-55998f3174fc",
  "protein-pancakes-1-0": "https://images.unsplash.com/photo-1598214886806-c87b84b7078b",
  "coconut-protein-bites": "https://images.unsplash.com/photo-1596723455658-72ebb0d12edd",
  "raspberry-protein-roulade": "https://images.unsplash.com/photo-1762160964274-0aa385e887d7",
  "cheesecake-berry-pudding": "https://images.unsplash.com/photo-1565788049436-bc97046eff42",
  "pulled-chicken-in-slow-roasted-tomatoes": "https://images.unsplash.com/photo-1748864221145-269b4a23a67e",
  "carpese-frittata": "https://images.unsplash.com/photo-1673960729830-76830e8b3db4",
  "red-pesto-meatball-pasta": "https://images.unsplash.com/photo-1632808664408-f8ab196b0523",
  "smashburger-with-mash-cheese-pickles": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9",
  "quick-easy-naan-bread": "https://images.unsplash.com/photo-1640625314547-aee9a7696589",
  "sirloin-steak-salad": "https://images.unsplash.com/photo-1676300185579-ed2b14891d82",
  "prawn-stir-fry": "https://images.unsplash.com/photo-1717072355019-7d993397d0a4",
  "sweet-potato-fajitas": "https://images.unsplash.com/photo-1636044990323-bde911334c5f",
  "cous-cous-salad": "https://images.unsplash.com/photo-1754652327512-3a4166c84cce",
  "breakfast-muffin": "https://images.unsplash.com/photo-1528736235302-52922df5c122",
  "carrot-cake-protein-porridge": "https://images.unsplash.com/photo-1702648982253-8b851013e81f",
  "chicken-carbonara": "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb",
};
const IMG_PARAMS = "?auto=format&fit=crop&w=1200&q=80";
recipes.forEach((r) => {
  r.image = IMAGES[r.slug] ? IMAGES[r.slug] + IMG_PARAMS : "";
});

// Real creation timestamps pulled from the Notion database, so "Recently Added"
// reflects when each recipe actually entered the library rather than an
// arbitrary backfilled date.
const DATE_9_24 = "2026-03-20T09:24:00.000Z";
const DATE_10_01 = "2026-03-20T10:01:00.000Z";
const RECENT_SLUGS = new Set(["sirloin-steak-salad", "prawn-stir-fry", "sweet-potato-fajitas", "cous-cous-salad"]);
recipes.forEach((r) => {
  r.dateAdded = RECENT_SLUGS.has(r.slug) ? DATE_10_01 : DATE_9_24;
  r.featured = false;
});
// One recipe pre-featured as a working demo of the "Feature this recipe" toggle —
// change or clear this any time via /admin.
const demo = recipes.find((r) => r.slug === "sirloin-steak-salad");
if (demo) demo.featured = true;

function y(s) { return JSON.stringify(s); }
function yList(arr) {
  if (!arr || arr.length === 0) return " []";
  return "\n" + arr.map(v => `  - ${y(v)}`).join("\n");
}

if (isMain) {
  const dir = "content/recipes";
  fs.mkdirSync(dir, { recursive: true });

  for (const r of recipes) {
    const fm = [
      "---",
      `title: ${y(r.title)}`,
      `slug: ${y(r.slug)}`,
      `dateAdded: ${y(r.dateAdded)}`,
      `featured: ${r.featured ? "true" : "false"}`,
      `mealType:${yList(r.mealType)}`,
      `diet:${yList(r.diet)}`,
      `style:${yList(r.style)}`,
      `servings: ${r.servings}`,
      r.servingNote ? `servingNote: ${y(r.servingNote)}` : null,
      `calories: ${r.calories}`,
      `protein: ${r.protein}`,
      `carbs: ${r.carbs}`,
      `fat: ${r.fat}`,
      `image: ${y(r.image || "")}`,
      `ingredients:${yList(r.ingredients)}`,
      `method:${yList(r.method)}`,
      r.tip ? `tip: ${y(r.tip)}` : null,
      "---",
      ""
    ].filter(Boolean).join("\n");

    fs.writeFileSync(path.join(dir, `${r.slug}.md`), fm);
  }

  console.log(`Wrote ${recipes.length} recipe files.`);
}
