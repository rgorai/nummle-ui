import { getRandomElements } from '../utils/arrays'
import { allergiesOptions } from '../utils/optionValues'

export const dummyMenuData: RestaurantMenu = [
  {
    categoryName: 'Appetizers',
    items: [
      {
        id: 'appetizer-1',
        name: 'Spinach Artichoke Dip',
        price: 8.99,
        ingredients: [
          'Parmesan Cheese',
          'Romano Cheese',
          'Garlic',
          'Basil',
          'Artichoke',
          'Spinach',
        ],
        description: 'Creamy dip with fresh spinach and artichoke hearts.',
        imagePath:
          'https://lilluna.com/wp-content/uploads/2022/12/spinach-artichoke-dip3-resize-16.jpg',
      },
      {
        id: 'appetizer-2',
        name: 'Chicken Wings',
        price: 10.99,
        ingredients: ['Chicken'],
        description: 'Crispy chicken wings with your choice of sauce.',
        imagePath:
          'https://www.tasteofhome.com/wp-content/uploads/2018/01/Crispy-Chicken-Wings-Appetizer_exps2596_BEA1449745D47A_RMS.jpg?fit=700%2C1024',
      },
      {
        id: 'appetizer-3',
        name: 'Mozzarella Sticks',
        price: 6.99,
        ingredients: ['Mozzerella Cheese', 'Breadcrumbs', 'Oil'],
        imagePath:
          'https://www.spendwithpennies.com/wp-content/uploads/2013/10/Cheese-Sticks-SpendWithPennies-2-22.jpg',
      },
      {
        id: 'appetizer-4',
        name: 'Bruschetta',
        ingredients: [
          'Oil',
          'Tomato',
          'Garlic',
          'Parmesan Cheese',
          'French Bread',
          'Balsamic Vinegar',
        ],
        price: 7.49,
        imagePath:
          'https://natashaskitchen.com/wp-content/uploads/2020/07/Tomato-Bruschetta-Recipe-7.jpg',
      },
      {
        id: 'appetizer-5',
        name: 'Potato Skins',
        price: 7.99,
        ingredients: [
          'Cheddar Cheese',
          'Bacon',
          'Chives',
          'Butter',
          'Sour Cream',
        ],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus nisl ut porttitor convallis. Aliquam eleifend efficitur est, eget venenatis turpis. Vivamus aliquam venenatis purus et euismod. Aenean nec eros enim. Vestibulum vestibulum rutrum placerat. Fusce dictum finibus ultrices. Pellentesque a molestie quam. Vivamus vel auctor quam.',
      },
    ],
  },
  {
    categoryName: 'Main Courses',
    items: [
      {
        id: 'main-course-1',
        name: 'Grilled Steak',
        price: 18.99,
        ingredients: [
          'Sirloin steak',
          'green beans',
          'mashed potatoes',
          'herbs',
        ],
        description: 'Juicy sirloin steak cooked to perfection.',
        imagePath:
          'https://www.cookingclassy.com/wp-content/uploads/2022/07/grilled-steak-15.jpg',
      },
      {
        id: 'main-course-2',
        name: 'Roasted Chicken',
        price: 14.99,
        ingredients: [
          'Chicken',
          'green beans',
          'corn',
          'peas',
          'carrots',
          'herbs',
        ],
        description: 'Herb-infused roasted chicken served with vegetables.',
        imagePath:
          'https://www.foodandwine.com/thmb/RzOlfEjnolhLOZDYGIcGLpz5aJw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Zuni-Chicken-FT-RECIPE0323-b8ac598b9bab4db5b492099f008dae66.jpg',
      },
      {
        id: 'main-course-3',
        name: 'Salmon Fillet',
        price: 16.99,
        ingredients: ['Salmon', 'yams', 'asparagus'],
        imagePath:
          'https://www.cookingclassy.com/wp-content/uploads/2017/02/skillet-seared-salmon-2.jpg',
      },
      {
        id: 'main-course-4',
        name: 'Vegetable Stir-Fry',
        price: 12.99,
        ingredients: [
          'Olive oil',
          'bell pepper',
          'snap peas',
          'mushrooms',
          'carrots',
          'broccoli',
          'sesame seeds',
          'soy sauce',
          'sesame oil',
        ],
      },
      {
        id: 'main-course-5',
        name: 'Pasta Carbonara',
        ingredients: ['Bacon', 'garlic', 'spaghetti', 'parmesan', 'eggs'],
        price: 13.99,
      },
      {
        id: 'main-course-6',
        name: 'Burger Deluxe',
        price: 11.99,
        ingredients: [
          'Beef',
          'tomato',
          'lettuce',
          'onion',
          'sesame seed bun',
          'french fries',
        ],
        imagePath:
          'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3456,w_5184,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/superdeluxe_owgtql.jpg',
      },
    ],
  },
  {
    categoryName: 'Beverages',
    items: [
      {
        id: 'beverage-1',
        name: 'Soft Drinks',
        price: 2.49,
        description: 'Assorted soft drinks and sodas.',
        imagePath:
          'https://cdn.britannica.com/35/122035-050-89905EFE/bottles-polyethylene-terephthalate.jpg',
      },
      {
        id: 'beverage-2',
        name: 'Iced Tea',
        price: 2.99,
        description: 'Refreshing iced tea with a hint of lemon.',
        imagePath:
          'https://natashaskitchen.com/wp-content/uploads/2021/07/Iced-Tea-3-1.jpg',
      },
      {
        id: 'beverage-3',
        name: 'Lemonade',
        price: 2.99,
        imagePath:
          'https://www.simplyrecipes.com/thmb/FRO32gZ8AbLrsCz-oz7HvN8i6fw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Perfect-Lemonade-LEAD-06-B-a488322e63604cd6a1442de661722553.jpg',
      },
      {
        id: 'beverage-4',
        name: 'Coffee',
        price: 1.99,
      },
      {
        id: 'beverage-5',
        name: 'Mango Smoothie',
        price: 4.49,
        ingredients: ['Mango', 'banana'],
        imagePath:
          'https://www.dinneratthezoo.com/wp-content/uploads/2018/05/mango-smoothie-2.jpg',
      },
      {
        id: 'beverage-6',
        name: 'Mineral Water',
        price: 1.99,
      },
    ],
  },
  {
    categoryName: 'Desserts',
    items: [
      {
        id: 'dessert-1',
        name: 'Chocolate Cake',
        price: 6.99,
        ingredients: ['Flour', 'sugar', 'eggs', 'milk', 'cocoa'],
        description: 'Decadent chocolate cake with layers of rich frosting.',
        imagePath:
          'https://www.cookingclassy.com/wp-content/uploads/2022/04/easy-chocolate-cake-2.jpg',
      },
      {
        id: 'dessert-2',
        name: 'Cheesecake',
        price: 7.49,
        ingredients: ['Cream cheese', 'eggs', 'sugar', 'graham crackers'],
        description:
          'Classic New York-style cheesecake with a graham cracker crust.',
        imagePath:
          'https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-7.jpg',
      },
      {
        id: 'dessert-3',
        name: 'Fruit Tart',
        ingredients: [
          'Strawberries',
          'blueberries',
          'blackberries',
          'vanilla custard',
          'shortbread',
        ],
        price: 5.99,
      },
      {
        id: 'dessert-4',
        name: 'Tiramisu',
        ingredients: [
          'Coffee',
          'lady fingers',
          'mascarpone cream',
          'cocoa powder',
        ],
        price: 8.99,
        imagePath:
          'https://sallysbakingaddiction.com/wp-content/uploads/2019/06/Tiramisu-6.jpg',
      },
      {
        id: 'dessert-5',
        name: 'Ice Cream Sundae',
        ingredients: [
          'Chocolate ice cream',
          'vanilla ice cream',
          'strawberry ice cream',
          'chocolate fudge',
          'whipped cream',
          'cherries',
        ],
        price: 4.99,
        imagePath:
          'https://www.keep-calm-and-eat-ice-cream.com/wp-content/uploads/2022/08/Ice-cream-sundae-hero-10.jpg',
      },
      {
        id: 'dessert-6',
        name: 'Creme Brulee',
        ingredients: ['Vanilla cake', 'buttercream', 'caramelized sugar'],
        price: 7.99,
      },
    ],
  },
  {
    categoryName: 'Salads',
    items: [
      {
        id: 'salad-1',
        name: 'Caesar Salad',
        price: 9.49,
        ingredients: ['Romaine', 'croutons', 'parmesan cheese'],
        description: 'Crisp romaine lettuce, croutons, and parmesan cheese.',
        imagePath:
          'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg',
      },
      {
        id: 'salad-2',
        name: 'Greek Salad',
        price: 10.99,
        ingredients: [
          'Mixed greens',
          'olives',
          'feta cheese',
          'Greek dressing',
        ],
        description: 'Mixed greens, olives, feta cheese, and Greek dressing.',
      },
      {
        id: 'salad-3',
        name: 'Cobb Salad',
        ingredients: [
          'Lettuce',
          'bacon',
          'eggs',
          'chicken',
          'tomatoes',
          ' blue cheese',
          'avocado',
        ],
        price: 11.99,
        imagePath:
          'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/1520887441-cobb-salad-delish-1.jpg',
      },
      {
        id: 'salad-4',
        name: 'Caprese Salad',
        ingredients: ['Balsamic Dressing', 'tomato', 'mozzerella'],
        price: 8.99,
        imagePath:
          'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2003/9/22/0/tm1a35_caprese_salad.jpg.rend.hgtvcom.1280.720.suffix/1530799984231.jpeg',
      },
      {
        id: 'salad-5',
        name: 'Asian Noodle Salad',
        price: 7.99,
        ingredients: [
          'Rice noodles',
          'carrots',
          'red peppers',
          'peanut butter',
          'tamari sauce',
          'sriracha',
          'ginger',
          'sugar',
          'garlic',
        ],
      },
    ],
  },
  {
    categoryName: 'Sandwiches',
    items: [
      {
        id: 'sandwich-1',
        name: 'Club Sandwich',
        ingredients: [
          'Rye bread',
          'chicken',
          'bacon',
          'lettuce',
          'tomato',
          'mayo',
        ],
        price: 11.99,
        description:
          'Triple-decker sandwich with turkey, bacon, lettuce, and tomato.',
        imagePath:
          'https://hips.hearstapps.com/hmg-prod/images/delish-200511-seo-club-sandwich-pin-14363-eb-1590780714.jpg?crop=1.00xw:0.667xh;0,0.237xh&resize=980:*',
      },
      {
        id: 'sandwich-2',
        name: 'BLT Sandwich',
        ingredients: ['White bread', 'bacon', 'lettuce', 'tomato', 'mayo'],
        price: 9.99,
        description: 'Classic bacon, lettuce, and tomato sandwich.',
      },
      {
        id: 'sandwich-3',
        name: 'Turkey Panini',
        ingredients: ['Turkey', 'stuffing', ' cranberry sauce', 'gravy'],
        price: 10.99,
        imagePath:
          'https://potatorolls.com/wp-content/uploads/2020/10/Mediterranean-Turkey-Panini1-1-960x640.jpg',
      },
      {
        id: 'sandwich-4',
        name: 'Veggie Wrap',
        ingredients: [
          'Flour tortilla',
          'spinach',
          'avocado',
          'carrot',
          'cucumber',
          'edamame',
        ],
        price: 8.99,
        imagePath:
          'https://tastesbetterfromscratch.com/wp-content/uploads/2014/04/Veggie-Wrap-2.jpg',
      },
      {
        id: 'sandwich-5',
        name: 'Grilled Cheese',
        ingredients: ['White bread', 'butter', 'cheddar cheese'],
        price: 6.99,
        imagePath:
          'https://natashaskitchen.com/wp-content/uploads/2021/08/Grilled-Cheese-Sandwich-3.jpg',
      },
    ],
  },
  {
    categoryName: 'Soups',
    items: [
      {
        id: 'soup-1',
        name: 'Tomato Soup',
        ingredients: [
          'Tomatoes',
          'onion',
          'garlic',
          'olive oil',
          'butter',
          'cream',
        ],
        price: 4.99,
        description: 'Homemade tomato soup with a touch of cream.',
      },
      {
        id: 'soup-2',
        name: 'Chicken Noodle Soup',
        ingredients: ['Chicken', 'chicken broth', 'carrots', 'celery'],
        price: 5.49,
        description: 'Hearty chicken noodle soup with vegetables.',
        imagePath:
          'https://i0.wp.com/www.onceuponachef.com/images/2022/10/chicken-noodle-soup.jpg?w=1612&ssl=1',
      },
      {
        id: 'soup-3',
        name: 'Minestrone Soup',
        price: 4.99,
        ingredients: ['Pasta', 'beans', 'tomatoes', 'veggies', 'herbs'],
        imagePath:
          'https://cdn.loveandlemons.com/wp-content/uploads/2021/11/minestrone-soup.jpg',
      },
      {
        id: 'soup-4',
        name: 'Lentil Soup',
        ingredients: [
          'Carrots',
          'peas',
          'celery',
          'parsley',
          'tomato',
          'pumpkin',
          'olive oil',
          'lentils',
        ],
        price: 4.49,
        imagePath:
          'https://veggiedesserts.com/wp-content/uploads/2021/04/lentil-soup-3-1024x1536.jpg',
      },
      {
        id: 'soup-5',
        name: 'Clam Chowder',
        price: 6.49,
        ingredients: [
          'Clams',
          'cream',
          'carrots',
          'potatoes',
          'celery',
          'onion',
        ],
        description: 'A thick slurry of smashed clam.',
      },
      {
        id: 'soup-6',
        name: 'Miso Soup',
        ingredients: ['Dashi stock', 'tofu', 'green onions'],
        price: 3.99,
        imagePath:
          'https://www.justonecookbook.com/wp-content/uploads/2022/06/Miso-Soup-8271-II.jpg',
      },
    ],
  },
].map((category) => ({
  ...category,
  items: category.items.map((item) => ({
    ...item,
    allergens: getRandomElements(allergiesOptions, 2, 6),
  })),
}))
