import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RECIPE } from '../utils/mutations'; 

const UploadRecipe = () => {
    const [imageInputState, setImageInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [recipeDescription, setDescription] = useState('');
    const [recipeTitle, setTitle ] = useState('');

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
        if (event.target.value.length) {
            setTitle(event.target.value);
        }
    };

    const onDescriptionChange = event => {
        if (event.target.value.length <= 300) {
            setDescription(event.target.value)
        };
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
                variables: { recipeTitle, recipeDescription, imageUrl}
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
            <h1 className="text-center">Create a Recipe!</h1>
            <div className="container d-flex justify-content-center">
                <form onSubmit={handleFormSubmit}className="col-md-6">
                    <div className="form-group">
                        <label>Recipe Title</label>
                        <input className="form-control" placeholder="Enter Recipe Title" value={recipeTitle} onChange={onTitleChange}/>
                    </div>
                    <textarea className="form-control" rows="3" placeholder="Describe this recipe!" value={recipeDescription} onChange={onDescriptionChange}></textarea>
                    <input type="file" name="image" onChange={handleImageInput} value={imageInputState} className="form-control"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {previewSource && (
                    <img src={previewSource} alt="chosen image" style={{height: '300px'}}/>
                )}
            </div>
        </main>
    );
}

export default UploadRecipe;