import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RECIPE } from '../utils/mutations';

import '../upload.css';

const UploadRecipe = () => {
    const [imageInputState, setImageInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [recipeDescription, setDescription] = useState('');
    const [recipeTitle, setTitle] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState(''); 

    const [addRecipe] = useMutation(ADD_RECIPE);

    const handleImageInput = (e) => {
        const image = e.target.files[0];
        previewImage(image);
    };

    const previewImage = (file) => { // preview selected image
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const onTitleChange = event => {
        if (event.target.value.length <= 30) {
            setTitle(event.target.value);
        }
    };

    const onDescriptionChange = event => {
        if (event.target.value.length <= 300) {
            setDescription(event.target.value)
        };
    }

    const onInstructionChange = event => {
        if (event.target.value.length <= 1000) {
            setRecipeInstructions(event.target.value)
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        if (!previewSource) return; //if user has not selected an image 
        uploadRecipe(previewSource)
    };

    const uploadRecipe = async imageUrl => {
        console.log(imageUrl);

        try {
            await addRecipe({
                variables: { recipeTitle, recipeDescription, recipeInstructions, imageUrl }
            });
            setDescription('');
            setTitle('');
            window.location.assign('/')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <main>
            <h1 className="text-center mt-4">Create a Recipe!</h1>
            <div className="flex-container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Recipe Title</label>
                                <input className="add-recipe" value={recipeTitle} onChange={onTitleChange} />
                            </div>
                            <label>Recipe Description</label>
                            <textarea className="add-recipe textarea-recipe" rows="3" value={recipeDescription} onChange={onDescriptionChange}></textarea>

                            <label>Recipe Instructions</label>
                            <textarea className="add-recipe textarea-recipe" row="3" value={recipeInstructions} onChange={onInstructionChange}></textarea>
                            
                            <input type="file" name="file" id="file"  onChange={handleImageInput} value={imageInputState} className="inputfile" />
                            <label for ="file" className="mt-3">Choose an image</label>
                            <div>
                            <button type="submit" className="recipe-submit-btn mt-2">Upload Recipe</button>
                            </div>
                        </form>
                    </div>

                    <div className="col">
                        <div>
                        <p>Chosen Image:</p>
                            {previewSource && (
                                <img src={previewSource} alt="chosen image" style={{ height: '300px' }} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UploadRecipe;