import React from 'react';

const AllRecipes = ({ recipes }) => {
    if (!recipes.length) {
        return <h3>No Recipes Yet!</h3>;
    }

    return (
        <div>
            <h3>Recipes</h3>
            {recipes &&
                recipes.map(recipe => (
                    <div key={recipe._id}>
                         <p>{recipe.recipeTitle}</p>
                        <p>
                        {recipe.username}{' '}
                            posted on {recipe.createdAt}
                        </p>
                        <div>
                            <p>
                                Favorited by: {recipe.favoritedCount} users!
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AllRecipes;