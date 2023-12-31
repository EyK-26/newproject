import React, { DetailedHTMLProps, FunctionComponent } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ImagePreviewProps = {
    setIsImageClicked(arg: boolean): void;
    setImageIndex(arg: (prev: number) => number): void;
    images: string[];
    imageIndex: number;
    name: string;
};

const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
    setIsImageClicked,
    images,
    imageIndex,
    setImageIndex,
    name,
}) => {
    return (
        <>
            <div className="modal_overlay"></div>
            <div className="image__container__overlay">
                <FaArrowLeft
                    className="arrowLeft"
                    onClick={() => {
                        if (imageIndex > 0) {
                            setImageIndex((prev: number) => prev - 1);
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
                            setImageIndex((prev: number) => prev + 1);
                        }
                    }}
                />
            </div>
        </>
    );
};

export default ImagePreview;
