import React, { FunctionComponent, LegacyRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import ImagePreview from "./ImagePreview";

interface ImageTogglerProps {
    images: string[];
    name: string;
    mainview: boolean;
}

const ImageToggler: FunctionComponent<ImageTogglerProps> = ({
    images,
    name,
    mainview,
}) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [isImageClicked, setIsImageClicked] = useState<boolean>(false);

    return !mainview ? (
        <>
            <div className="image__container">
                <FaArrowLeft
                    className="arrowLeft"
                    onClick={() => {
                        if (imageIndex > 0) {
                            setImageIndex((prev) => prev - 1);
                        }
                    }}
                />
                <img
                    src={images[imageIndex]}
                    alt={name}
                    onClick={() => setIsImageClicked(true)}
                />
                <FaArrowRight
                    className="arrowRight"
                    onClick={() => {
                        if (imageIndex < images.length - 1) {
                            setImageIndex((prev) => prev + 1);
                        }
                    }}
                />
            </div>
        </>
    ) : (
        <>
            <div className="image__container--main">
                <img
                    src={images[imageIndex]}
                    alt={name}
                    onClick={() => setIsImageClicked(true)}
                />
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
            {isImageClicked && (
                <ImagePreview
                    setIsImageClicked={setIsImageClicked}
                    images={images}
                    imageIndex={imageIndex}
                    setImageIndex={setImageIndex}
                    name={name}
                />
            )}
        </>
    );
};

export default ImageToggler;
