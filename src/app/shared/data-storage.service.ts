import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';


// Note : You can only inject a service into another service by having an injectable 
// in the file and also the service being injected has to be in the providers under app.module.ts
// and the classes being injected are injected privately in constructors

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) { }

    // tslint:disable-next-line:max-line-length
    // we want to store our array of recipes in the url created in firebase, using the method storeRecipes, wc uses the put request, provides the url argument, 
    // followed by accessing the recipeServices unto which we append the getRecipes method.

    storeRecipes() {
        // tslint:disable-next-line:max-line-length
        // we use a put request in our storeRecipes method that is toring all our recipes because it triggers firebase to over write the old data
        return this.http.put('https://ng-recipe-book-60080.firebaseio.com//recipes.json', this.recipeService.getRecipes()); // note, for firebase to work, first change the rules both to true.
    }

    getRecipes() {
        this.http.get('https://ng-recipe-book-60080.firebaseio.com/recipes.json')

        .map(
            (response: Response) => {
              const recipes: Recipe[] = response.json();
              for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                  recipe['ingredients'] = [];
                }
              }
              return recipes;
            }
          )
          .subscribe(
            (recipes: Recipe[]) => {
              this.recipeService.setRecipes(recipes);
            }
          );
      }
    }