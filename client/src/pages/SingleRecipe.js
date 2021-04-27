import { useQuery } from '@apollo/react-hooks';
import { QUERY_RECIPE } from '../utils/queries';
import { useParams } from 'react-router-dom';
import '../singlerecipe.css'

const SingleRecipe = () => {
    const { id: recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_RECIPE, {
        variables: { id: recipeId }
    });

    console.log(data)

    const recipe = data?.recipe || {};

    console.log(recipe.recipeInstructions)

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="flex-container">
                <div className="justify-content-center">

                    <div className="single-img">
                        <img src={recipe.imageUrl} className="d-block m-auto"></img>
                    </div>
                    <div className="text-center">
                        <h1 className="single-title">{recipe.recipeTitle}</h1>
                        <h3 className="single-user"> {recipe.username} on {recipe.createdAt}</h3>
                    </div>
                    <div className="text-center mt-3">
                        <p className="single-description">{recipe.recipeDescription}</p>
                    </div>
                    <div className="text-center">
                    <p className="single-favorites">Favorited by {recipe.favoritedCount} users</p>
                    </div>
                    <div className="text-center mt-3">
                        <h1>How to make it:</h1>
                        <div className="d-flex justify-content-center">
                        <p className="col-6 single-instructions">{recipe.recipeInstructions}</p>
                        </div>
                    </div>

                   

                </div>
            </div>
        </main>
    )
}

export default SingleRecipe;