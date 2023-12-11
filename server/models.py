from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, ForeignKey, Float
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)

    recipes = relationship('Recipe', back_populates='chef')
    selections = relationship('Selection', back_populates='patron')
    favorite_recipes = relationship('Recipe', secondary='recipe_patron')

    serializer_rules = {
        'id': lambda obj: obj.id,
        'username': lambda obj: obj.username,
        'email': lambda obj: obj.email,
    }

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('must be a username')
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('must be an email')
        return email

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'


class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(Text)
    user_id = Column(Integer, ForeignKey('users.id'))

    chef = relationship('User', back_populates='recipes')
    recipe_ingredients = relationship(
        'RecipeIngredient', back_populates='recipe')

    def __repr__(self):
        return f'<Recipe {self.id}: {self.name}>'

    serializer_rules = {
        'id': lambda obj: obj.id,
        'name': lambda obj: obj.name,
        'description': lambda obj: obj.description,
    }


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    id = Column(Integer, primary_key=True)
    name = Column(String)

    recipe_ingredients = relationship(
        'RecipeIngredient', back_populates='ingredient')

    serializer_rules = {
        'id': lambda obj: obj.id,
        'name': lambda obj: obj.name,
    }

    def __repr__(self):
        return f'<Ingredient {self.id}: {self.name}>'


class RecipeIngredient(db.Model, SerializerMixin):
    __tablename__ = 'recipe_ingredients'

    recipe_id = Column(Integer, ForeignKey('recipes.id'), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey(
        'ingredients.id'), primary_key=True)

    recipe = relationship('Recipe', back_populates='recipe_ingredients')
    ingredient = relationship(
        'Ingredient', back_populates='recipe_ingredients')

    serializer_rules = {
        'recipe_id': lambda obj: obj.recipe_id,
        'ingredient_id': lambda obj: obj.ingredient_id,
    }

    def __repr__(self):
        return f'<RecipeIngredient {self.recipe_id}: {self.ingredient_id}>'


class Selection(db.Model, SerializerMixin):
    __tablename__ = 'selections'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    recipe_id = Column(Integer, ForeignKey('recipes.id'))

    patron = relationship('User', back_populates='selections')
    recipe = relationship('Recipe')

    serializer_rules = {
        'id': lambda obj: obj.id,
    }

    def __repr__(self):
        return f'<Selection {self.id}>'
