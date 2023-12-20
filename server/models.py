from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from config import db


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String, nullable=False)

    recipe_ingredients = db.relationship(
        'RecipeIngredient', back_populates='recipe', cascade="all, delete")

    selection = db.relationship('Selections', back_populates='recipe')

    serialize_rules = ('-recipe_ingredients.recipe', '-selection.recipe',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name required')
        return name

    def __repr__(self):
        return f'<Recipe {self.id}: {self.name}>'


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String, nullable=False)

    recipe_ingredients = db.relationship(
        'RecipeIngredient', back_populates='ingredient', cascade='all, delete')

    serialize_rules = ('-recipe_ingredients.ingredient',)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name required')
        return name

    def __repr__(self):
        return f'<Ingredient {self.id}: {self.title}>'


class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe_ingredients'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'recipes.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey(
        'ingredients.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='recipe_ingredients')
    ingredient = db.relationship(
        'Ingredient', back_populates='recipe_ingredients')

    serialize_rules = ('-recipe.recipe_ingredients',
                       '-ingredient.recipe_ingredients',)

    def __repr__(self):
        return f'<RecipeIngredients {self.id}>'


class Selections(db.Model, SerializerMixin):
    __tablename__ = 'selections'

    id = db.Column(db.Integer, primary_key=True)

    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'recipes.id'), nullable=False)

    recipe = db.relationship('Recipe', back_populates='selection')

    serialize_rules = ('-recipe.selection',)

    def __repr__(self):
        return f'<Selections {self.id}>'


class GroceryList(db.Model):
    __tablename__ = 'grocery_list'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String)

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name required')
        return name

    def __repr__(self):
        return f'<GroceryList {self.id}>'
