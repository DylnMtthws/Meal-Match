#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Recipe, Ingredient, RecipeIngredient, Selections, GroceryList


class Recipes(Resource):
    def get(self):
        recipes = [recipe.to_dict()
                   for recipe in Recipe.query.all()]
        return recipes, 200

    def post(self):
        data = request.get_json()
        try:
            new_recipe = Recipe(
                name=data['name'],
                category=data['category']
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
                category=data['category']
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


class SelectionsResource(Resource):
    def get(self):
        selections = [selection.to_dict()
                      for selection in Selections.query.all()]
        return selections, 200

    def post(self):
        data = request.get_json()
        try:
            new_selection = Selections(
                recipe_id=data['recipe_id'],
            )
            db.session.add(new_selection)
            db.session.commit()
            return new_selection.to_dict(), 201
        except ValueError as e:
            print(e.__str__())
            return {
                "errors": ["validation errors"]
            }, 400


api.add_resource(SelectionsResource, "/selections")


class SelectionsById(Resource):

    def get(self, id):
        selection = Selections.query.filter_by(id=id).first()
        return selection.to_dict(only=("recipe_id")), 200

    def delete(self, id):
        selection = Selections.query.filter_by(id=id).first()
        if not selection:
            return {"error": "Event not found"}, 404

        db.session.delete(selection)
        db.session.commit()
        return "", 204

    def patch(self, id):
        selection = Selections.query.filter_by(id=id).first()
        if not selection:
            return {
                "error": "Event not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(selection, key, data[key])
            db.session.add(selection)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return {
                "error": "validation errors"
            }, 400

        return selection.to_dict(only=("recipe_id")), 200


api.add_resource(SelectionsById, "/selections/<int:id>")


class GroceryItems(Resource):

    def get(self):
        grocery_items = [item.to_dict()
                         for item in GroceryList.query.all()]
        return grocery_items, 200

    def post(self):
        data = request.get_json()
        try:
            new_item = GroceryList(
                name=data['name'],
                category=data['category']
            )
            db.session.add(new_item)
            db.session.commit()
            return new_item.to_dict(), 200
        except ValueError:
            return {
                "errors": ["validation errors"]
            }, 400

    def delete(self):
        items = GroceryList.query.all()
        if not items:
            return {"error": "Event not found"}, 404

        for item in items:
            db.session.delete(item)
        db.session.commit()
        return "", 204


api.add_resource(GroceryItems, "/grocery_items")


class GroceryItemById(Resource):

    def get(self, id):
        item = GroceryList.query.filter_by(id=id).first()
        return item.to_dict(), 200

    def delete(self, id):
        item = GroceryList.query.filter_by(id=id).first()
        if not item:
            return {"error": "Event not found"}, 404

        db.session.delete(item)
        db.session.commit()
        return "", 204

    def patch(self, id):
        item = GroceryList.query.filter_by(id=id).first()
        if not item:
            return {
                "error": "Event not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(item, key, data[key])
            db.session.add(item)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return {
                "error": "validation errors"
            }, 400

        return item.to_dict(), 200


api.add_resource(GroceryItemById, "/grocery_items/<int:id>")


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
