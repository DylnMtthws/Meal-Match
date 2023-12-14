#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Recipe, Ingredient, RecipeIngredient


class Recipes(Resource):
    def get(self):
        recipes = [recipe.to_dict(only=("name", "recipe_ingredients.ingredient.name"))
                   for recipe in Recipe.query.all()]
        return recipes, 200

    def post(self):
        data = request.get_json()
        try:
            new_recipe = Recipe(
                name=data['name'],
            )
            db.session.add(new_recipe)
            db.session.commit()
            return new_recipe.to_dict(), 200
        except ValueError:
            return {
                "errors": ["validation errors"]
            }, 400


api.add_resource(Recipes, "/recipes")


class RecipeById(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        return recipe.to_dict(only=("name")), 200

    def patch(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return {
                "error": "Event not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(recipe, key, data[key])
            db.session.add(recipe)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return {
                "error": "validation errors"
            }, 400

        return recipe.to_dict(only=("name")), 200

    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return {"error": "Event not found"}, 404

        db.session.delete(recipe)
        db.session.commit()
        return "", 204


api.add_resource(RecipeById, "/recipes/<int:id>")


class Ingredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict()
                       for ingredient in Ingredient.query.all()]
        return ingredients, 200

    def post(self):
        data = request.get_json()
        try:
            new_ingredient = Ingredient(
                name=data["name"],
            )
            db.session.add(new_ingredient)
            db.session.commit()
            return new_ingredient.to_dict(), 201
        except Exception as e:
            print(e.__str__())
            return {
                "errors": ["validation errors"]
            }, 400


api.add_resource(Ingredients, "/ingredients")


class IngredientById(Resource):
    def get(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        return ingredient.to_dict(), 200

    def patch(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return {
                "error": "Event not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(ingredient, key, data[key])
            db.session.add(ingredient)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return {
                "error": "validation errors"
            }, 400

        return ingredient.to_dict(only=("name")), 200

    def delete(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return {
                "error": "Event not found"
            }, 404
        db.session.delete(ingredient)
        db.session.commit()
        return "", 204


api.add_resource(IngredientById, "/ingredients/<int:id>")


class RecipeIngredients(Resource):
    def get(self):
        recipe_ingredients = [recipe_ingredient.to_dict()
                              for recipe_ingredient in RecipeIngredient.query.all()]
        return recipe_ingredients, 200

    def post(self):
        data = request.get_json()
        try:
            new_recipe_ingredients = RecipeIngredient(
                recipe_id=data["recipe_id"],
                ingredient_id=data["ingredient_id"]
            )
            db.session.add(new_recipe_ingredients)
            db.session.commit()
            return new_recipe_ingredients.to_dict(only=("recipe_id", "ingredient_id")), 201
        except ValueError as e:
            print(e.__str__())
            return {
                "errors": ["validation errors"]
            }, 400


api.add_resource(RecipeIngredients, "/recipe_ingredients")


class RecipeIngredientById(Resource):

    def get(self, id):
        recipe_ingredient = RecipeIngredient.query.filter_by(id=id).first()
        return recipe_ingredient.to_dict(only=("recipe_id", "ingredient_id")), 200

    def delete(self, id):
        recipe_ingredient = RecipeIngredient.query.filter_by(id=id).first()
        if not recipe_ingredient:
            return {"error": "Event not found"}, 404

        db.session.delete(recipe_ingredient)
        db.session.commit()
        return "", 204

    def patch(self, id):
        recipe_ingredient = RecipeIngredient.query.filter_by(id=id).first()
        if not recipe_ingredient:
            return {
                "error": "Event not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(recipe_ingredient, key, data[key])
            db.session.add(recipe_ingredient)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return {
                "error": "validation errors"
            }, 400

        return recipe_ingredient.to_dict(only=("recipe_id", "ingredient_id")), 200


api.add_resource(RecipeIngredientById, "/recipe_ingredients/<int:id>")


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
