import React, { useState } from 'react';

const UploadRecipe = () => {
    const [imageUrl, setimageUrl] = useState(null);
    const [imageAlt, setimageAlt] = useState(null);

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME; 
    const API_PRESET = process.env.REACT_APP_API_PRESET;

    console.log(CLOUD_NAME)

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
        <div>
            <button type="button" className="btn widget-btn" onClick={openWidget}>
                Upload Recipe Photo
            </button>
            <section>
                {imageUrl && (
                    <img src={imageUrl} alt={imageAlt} className="displayed-image" />
                )}
            </section>
        </div>
    );
}

export default UploadRecipe; 