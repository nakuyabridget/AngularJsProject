import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  // inserting ingedients to our recipe using the recipe service
  private recipes: Recipe[] = [
    new Recipe(

      'Plantain',
      'The best in town for sure',
      'https://www.seriouseats.com/recipes/images/2016/12/20161201-crispy-roast-potatoes-29-1500x1125.jpg',

      [
        new Ingredient('Onions', 2),
        new Ingredient('French Fries', 20),
        new Ingredient('dodo', 2)
      ]),

    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',

      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
