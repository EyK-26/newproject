import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const ImageToggler = ({ images, name, mainview }) => {
    const [imageIndex, setImageIndex] = useState(0);

    return !mainview ? (
        <div className="image__container">
            <FaArrowLeft
                className="arrowLeft"
                onClick={() => {
                    if (imageIndex > 0) {
                        setImageIndex((prev) => prev - 1);
                    }
                }}
            />
            <img src={images[imageIndex]} alt={name} />
            <FaArrowRight
                className="arrowRight"
                onClick={() => {
                    if (imageIndex < images.length - 1) {
                        setImageIndex((prev) => prev + 1);
                    }
                }}
            />
        </div>
    ) : (
        <div className="image__container--main">
            <img src={images[imageIndex]} alt={name} />
            <div className="controls">
                <FaArrowLeft
                    className="arrowLeft"
                    onClick={() => {
                        if (imageIndex > 0) {
                            setImageIndex((prev) => prev - 1);
                        }
                    }}
                />
                <span>{`${imageIndex + 1} / ${images.length}`}</span>
                <FaArrowRight
                    className="arrowRight"
                    onClick={() => {
                        if (imageIndex < images.length - 1) {
                            setImageIndex((prev) => prev + 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ImageToggler;
