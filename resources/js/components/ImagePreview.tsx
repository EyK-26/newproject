import React, { DetailedHTMLProps, FunctionComponent } from "react";

type ImagePreviewProps = {
    setIsImageClicked(arg: boolean): void;
    images: string[];
    imageIndex: number;
    name: string;
};

const ImagePreview: FunctionComponent<ImagePreviewProps> = ({
    setIsImageClicked,
    images,
    imageIndex,
}) => {
    return (
        <div>
            <div className="modal_overlay"></div>
            <img src={images[imageIndex]} alt={String(name)} />
        </div>
    );
};

export default ImagePreview;
