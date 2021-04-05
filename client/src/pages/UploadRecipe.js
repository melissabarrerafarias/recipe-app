import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RECIPE } from '../utils/mutations'; 
import { QUERY_RECIPES } from '../utils/queries'; 

const UploadRecipe = () => {
    const [imageUrl, setimageUrl] = useState(null);
    const [imageAlt, setimageAlt] = useState(null);
    
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const API_PRESET = process.env.REACT_APP_API_PRESET;

    const [recipeDescription, setDescription] = useState('');
    const [recipeTitle, setTitle ] = useState('');

    const [addRecipe] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {

            try {
                // read what's currently in the cache
                const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

                // prepend the newest thought to the front of the array 
                cache.writeQuery({
                    query: QUERY_RECIPES,
                    data: { recipes: [addRecipe, ...recipes] }
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    });
    
    const onTitleChange = event => {
        if (event.target.value.length) {
            setTitle(event.target.value);
        }
    };

    const onDescriptionChange = event => {
        if (event.target.value.length <= 300) {
            setDescription(event.target.value)
        };
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addRecipe({
                variables: { recipeTitle, recipeDescription }
            });
            setDescription('');
            setTitle('');
        }
        catch (e) {
            console.log(e)
        }
    };



    const openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: CLOUD_NAME,
                uploadPreset: API_PRESET,
            },
            (error, result) => {
                if (result.event === "success") {
                    setimageUrl(result.info.secure_url);
                    setimageAlt(`An image of ${result.info.original_filename}`);
                }
            }
        );
        widget.open(); // open up the widget after creation
    };

    return (
        <main>
            <h1 className="text-center">Create a Recipe!</h1>
            <div class="container d-flex justify-content-center">
                <form onSubmit={handleFormSubmit}class="col-md-6">
                <section>
                    {imageUrl && (
                        <img src={imageUrl} alt={imageAlt} />
                    )}
                </section>
                    <div class="form-group">
                        <label>Recipe Title</label>
                        <input class="form-control" placeholder="Enter Recipe Title" value={recipeTitle} onChange={onTitleChange}/>
                    </div>
                    <textarea class="form-control" rows="3" placeholder="Describe this recipe!" value={recipeDescription} onChange={onDescriptionChange}></textarea>
                    <button type="button" onClick={openWidget}>
                        Upload Recipe Photo
                    </button>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </main>
    );
}

export default UploadRecipe;