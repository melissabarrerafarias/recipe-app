import React from 'react';

const AllRecipes = ({ recipes }) => {
    if (!recipes.length) {
        return <h3>No Recipes Yet!</h3>;
    }

    return (
        <div>
            <h3>Recipes</h3>
            <div className="flex-container">
            {recipes &&
                recipes.map(recipe => (
                    <div className="row justify-content-center">
                    <div className="col-md-6" key={recipe._id}>
                        <img src={recipe.imageUrl} style={{height: '300px'}} className="d-block m-auto"></img>
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
                    </div>
                ))}
                </div>
        </div>
    );
};

export default AllRecipes;