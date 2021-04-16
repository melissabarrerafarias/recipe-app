import { useQuery } from '@apollo/react-hooks';
import { QUERY_RECIPES } from '../utils/queries';

import AllRecipes from '../components/AllRecipes.js';

const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_RECIPES);
    const recipes = data?.recipes || [];
    // console.log(recipes);

    return (
        <main>
            <div>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <AllRecipes recipes={recipes} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;