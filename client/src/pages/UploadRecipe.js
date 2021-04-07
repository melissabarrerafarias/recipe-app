import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RECIPE, UPLOAD_IMAGE } from '../utils/mutations'; 

const UploadRecipe = ({ url }) => {
    
    const [imageUrl, setimageUrl] = useState(null);
    const [imageAlt, setimageAlt] = useState(null);
    
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const API_PRESET = process.env.REACT_APP_API_PRESET;

    const [recipeDescription, setDescription] = useState('');
    const [recipeTitle, setTitle ] = useState('');

    const [addRecipe] = useMutation(ADD_RECIPE);
    
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
            window.location.assign('/')
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
            <div className="container d-flex justify-content-center">
                <form onSubmit={handleFormSubmit}className="col-md-6">
                <section>
                    {imageUrl && (
                        <img src={imageUrl} alt={imageAlt} />
                    )}
                </section>
                    <div className="form-group">
                        <label>Recipe Title</label>
                        <input className="form-control" placeholder="Enter Recipe Title" value={recipeTitle} onChange={onTitleChange}/>
                    </div>
                    <textarea className="form-control" rows="3" placeholder="Describe this recipe!" value={recipeDescription} onChange={onDescriptionChange}></textarea>
                    <button type="button" onClick={openWidget}>
                        Upload Recipe Photo
                    </button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </main>
    );
}

export default UploadRecipe;