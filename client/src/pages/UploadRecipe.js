import React, { useState } from 'react';

const UploadRecipe = () => {
    const [imageUrl, setimageUrl] = useState(null);
    const [imageAlt, setimageAlt] = useState(null);

    const openWidget = () => {
        // create the widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "",
                uploadPreset: "",
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