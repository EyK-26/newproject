import React, {
    DetailedHTMLProps,
    FunctionComponent,
    MouseEvent,
    useEffect,
    useRef,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImExit } from "react-icons/im";

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
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: Event): void => {
        if (modalRef.current && modalRef.current.contains(e.target as Node)) {
            setIsImageClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className="modal_overlay" ref={modalRef}></div>
            <div className="image__container__overlay">
                <ImExit
                    className="exit_icon"
                    onClick={() => {
                        setIsImageClicked(false);
                    }}
                />
                {imageIndex > 0 && (
                    <FaArrowLeft
                        className="arrowLeft"
                        onClick={() => {
                            setImageIndex((prev: number) => prev - 1);
                        }}
                    />
                )}
                <img
                    src={images[imageIndex]}
                    alt={name}
                    onClick={() => setIsImageClicked(true)}
                />
                {imageIndex < images.length - 1 && (
                    <FaArrowRight
                        className="arrowRight"
                        onClick={() => {
                            setImageIndex((prev: number) => prev + 1);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default ImagePreview;
