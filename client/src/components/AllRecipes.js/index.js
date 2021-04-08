import React from 'react';
import './allrecipes.css';

const AllRecipes = ({ recipes }) => {
    if (!recipes.length) {
        return <h3>No Recipes Yet!</h3>;
    }

    return (
        <div>
            <h3 className="text-center home-title">Recipes</h3>
            <div className="flex-container">
            {recipes &&
                recipes.map(recipe => (
                    <div className="row justify-content-center">
                    <div className="col-md-4 recipe-home" key={recipe._id}>
                        <img src={recipe.imageUrl} className="d-block m-auto"></img>
                        <div className="row">
                        <p className="col recipeTitle-home">{recipe.recipeTitle}</p>
                        <p className="col text-right recipe-details mt-2">by {recipe.username} on {recipe.createdAt}</p>
                        </div>
                        <p className="text-right recipe-details">Favorited by {recipe.favoritedCount} users</p>
                    </div>
                    </div>
                ))}
                </div>
        </div>
    );
};

export default AllRecipes;