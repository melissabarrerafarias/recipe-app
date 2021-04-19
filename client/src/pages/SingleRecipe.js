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

                   
                        <h1 className="text-center single-title">{recipe.recipeTitle}</h1>

                        <h3 className="text-center single-user"> {recipe.username} on {recipe.createdAt}</h3>

                        <div>
                            <p>{recipe.recipeDescription}</p>
                        </div> 

                        <div>
                            <p>
                                {recipe.recipeInstructions}
                            </p>
                        </div>
                
                    <p className="">Favorited by {recipe.favoritedCount} users</p>

                </div>
            </div>
        </main>
    )
}

export default SingleRecipe;