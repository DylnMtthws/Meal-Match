from models import User, Recipe, Ingredient, RecipeIngredient, Selection
# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

    def post(self):
        data = request.get_json()
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201


class UserById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            abort(404, message="User not found")
        return jsonify(user.to_dict())

    def patch(self, id):
        user = User.query.get(id)
        if not user:
            abort(404, message="User not found")
        data = request.get_json()
        user.update(data)
        db.session.commit()
        return user

    def delete(self, id):
        user = User.query.get(id)
        if not user:
            abort(404, message="User not found")
        db.session.delete(user)
        db.session.commit()
        return "User was successfully deleted"


class Recipes(Resource):
    def get(self):
        recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        return recipes, 200

    def post(self):
        data = request.get_json()
        new_recipe = Recipe(**data)
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict(), 201


class RecipeById(Resource):
    def get(self, id):
        recipe = Recipe.query.get(id)
        if not recipe:
            abort(404, message="Recipe not found")
        return jsonify(recipe.to_dict())

    def patch(self, id):
        recipe = Recipe.query.get(id)
        if not recipe:
            abort(404, message="Recipe not found")
        data = request.get_json()
        recipe.update(data)
        db.session.commit()
        return recipe

    def delete(self, id):
        recipe = Recipe.query.get(id)
        if not recipe:
            abort(404, message="Recipe not found")
        db.session.delete(recipe)
        db.session.commit()
        return "Recipe was successfully deleted"


class Ingredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict()
                       for ingredient in Ingredient.query.all()]
        return ingredients, 200

    def post(self):
        data = request.get_json()
        new_ingredient = Ingredient(**data)
        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.to_dict(), 201


class IngredientById(Resource):
    def get(self, id):
        ingredient = Ingredient.query.get(id)
        if not ingredient:
            abort(404, message="Ingredient not found")
        return jsonify(ingredient.to_dict())

    def patch(self, id):
        ingredient = Ingredient.query.get(id)
        if not ingredient:
            abort(404, message="Ingredient not found")
        data = request.get_json()
        ingredient.update(data)
        db.session.commit()
        return ingredient

    def delete(self, id):
        ingredient = Ingredient.query.get(id)
        if not ingredient:
            abort(404, message="Ingredient not found")
        db.session.delete(ingredient)
        db.session.commit()
        return "Ingredient was successfully deleted"


class RecipeIngredients(Resource):
    def get(self):
        recipe_ingredients = [recipe_ingredient.to_dict()
                              for recipe_ingredient in RecipeIngredient.query.all()]
        return recipe_ingredients, 200

    def post(self):
        data = request.get_json()
        new_recipe_ingredient = RecipeIngredient(**data)
        db.session.add(new_recipe_ingredient)
        db.session.commit()
        return new_recipe_ingredient.to_dict(), 201


class RecipeIngredientById(Resource):
    def get(self, id):
        recipe_ingredient = RecipeIngredient.query.get(id)
        if not recipe_ingredient:
            abort(404, message="RecipeIngredient not found")
        return jsonify(recipe_ingredient.to_dict())

    def patch(self, id):
        recipe_ingredient = RecipeIngredient.query.get(id)
        if not recipe_ingredient:
            abort(404, message="RecipeIngredient not found")
        data = request.get_json()
        recipe_ingredient.update(data)
        db.session.commit()
        return recipe_ingredient

    def delete(self, id):
        recipe_ingredient = RecipeIngredient.query.get(id)
        if not recipe_ingredient:
            abort(404, message="RecipeIngredient not found")
        db.session.delete(recipe_ingredient)
        db.session.commit()
        return "RecipeIngredient was successfully deleted"


class Selections(Resource):
    def get(self):
        selections = [selection.to_dict()
                      for selection in Selection.query.all()]
        return selections, 200

    def post(self):
        data = request.get_json()
        new_selection = Selection(**data)
        db.session.add(new_selection)
        db.session.commit()
        return new_selection.to_dict(), 201


class SelectionById(Resource):
    def get(self, id):
        selection = Selection.query.get(id)
        if not selection:
            abort(404, message="Selection not found")
        return jsonify(selection.to_dict())

    def patch(self, id):
        selection = Selection.query.get(id)
        if not selection:
            abort(404, message="Selection not found")
        data = request.get_json()
        selection.update(data)
        db.session.commit()
        return selection

    def delete(self, id):
        selection = Selection.query.get(id)
        if not selection:
            abort(404, message="Selection not found")
        db.session.delete(selection)
        db.session.commit()
        return "Selection was successfully deleted"


api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Recipes, "/recipes")
api.add_resource(RecipeById, "/recipes/<int:id>")
api.add_resource(Ingredients, "/ingredients")
api.add_resource(IngredientById, "/ingredients/<int:id>")
api.add_resource(RecipeIngredients, "/recipe_ingredients")
api.add_resource(RecipeIngredientById, "/recipe_ingredients/<int:id>")
api.add_resource(Selections, "/selections")
api.add_resource(SelectionById, "/selections/<int:id>")

if __name__ == "__main__":
    app.run(debug=True)
