#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import User, Recipe, Ingredient, RecipeIngredient, Selection, db
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app

fake = Faker()


def create_users():
    users = []
    for _ in range(30):
        u = User(
            username=fake.first_name(),
            password='testpassword',
            email=fake.email(),
        )
        users.append(u)
    return users


def create_recipes():
    recipes = []
    for _ in range(10):
        r = Recipe(
            name=fake.sentence(2),
            description=fake.sentence(10),
            chef_id=randint(1, 5),
        )
        recipes.append(r)
    return recipes


def create_ingredients():
    ingredients = []
    for _ in range(10):
        i = Ingredient(
            name=fake.word(),
        )
        ingredients.append(i)
    return ingredients


def create_recipe_ingredients():
    recipe_ingredients = []
    for _ in range(10):
        ri = RecipeIngredient(
            recipe_id=randint(1, 10),
            ingredient_id=randint(1, 10),
        )
        recipe_ingredients.append(ri)
    return recipe_ingredients


def create_selections():
    selections = []
    for _ in range(10):
        s = Selection(
            user_id=randint(1, 30),
            recipe_id=randint(1, 10),
        )
        selections.append(s)
    return selections


if __name__ == '__main__':
    fake = Faker()
    try:
        with app.app_context():
            print("Starting seed...")
            # delete current data
            db.create_all()
            print("clearing database")
            User.query.delete()
            Recipe.query.delete()
            Ingredient.query.delete()
            RecipeIngredient.query.delete()
            Selection.query.delete()
            print("database cleared")
            # Seed code goes here!
            print("seeding users...")
            users = create_users()
            db.session.add_all(users)

            print("finished seeding users")

            print("seeding recipes...")
            recipes = create_recipes()
            db.session.add_all(recipes)

            print("finished seeding recipes")

            print("seeding ingredients...")
            ingredients = create_ingredients()
            db.session.add_all(ingredients)

            print("finished seeding ingredients")

            print("seeding recipe ingredients...")
            recipe_ingredients = create_recipe_ingredients()
            db.session.add_all(recipe_ingredients)

            print("finished seeding recipe ingredients")

            print("seeding selections...")
            selections = create_selections()
            db.session.add_all(selections)

            print("finished seeding selections")
            db.session.commit()
            print("finished seeding!!")
    except Exception as e:
        print(f"An error occurred: {e}")
