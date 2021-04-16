import { useQuery } from '@apollo/react-hooks';
import { QUERY_RECIPE } from '../utils/queries';
import { useParams } from 'react-router-dom';

const SingleRecipe = () => {
    const { id: recipeId } = useParams();

    const { loading, data } = useQuery(QUERY_RECIPE, {
        variables: { id: recipeId }
    });

    console.log(data)

    const recipe = data?.recipe || {};

    // console.log(recipe)

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main> 
            <div>
                <p>this is rendering</p>
            </div>
            <div className="flex-container"> 
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

            </div>
        </main>
    )
}

export default SingleRecipe;