import React, { ChangeEvent, useState } from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string, zIndexHooks: {maxZIndex: any, setMaxZIndex: any}}> = ({path, zIndexHooks}) => {
    var movable: boolean = false;

    const [selectedImage, setSelectedImage] = useState<string | null>(path);

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataURL = reader.result as string;
                setSelectedImage(imageDataURL);
            };
            reader.readAsDataURL(file);
        }

        (e.target as HTMLInputElement).remove();
    }

    function setup(div: HTMLDivElement) {
        div.style.top = `${window.innerHeight/2}px`;
        div.style.left = `${window.innerWidth/2}px`;
        div.style.rotate = `${Math.floor(Math.random() * 15) * (Math.random() < 0.5 ? 1 : -1)}deg`;
    }

    function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        movable = !movable;
        const div: HTMLDivElement = e.target as HTMLDivElement;
        if (movable) {return} // For some reason the movement logic breaks without this. The zIndex now updates when the div is placed down instead of when it is picked up.
        div.style.zIndex = zIndexHooks.maxZIndex + 1;
        zIndexHooks.setMaxZIndex(zIndexHooks.maxZIndex + 1);
    }

    function dragLogic(e: React.PointerEvent<HTMLDivElement>) {
        if (movable == false) {return}
        (e.target as HTMLDivElement).style.top = `${e.clientY-(e.target as HTMLDivElement).clientHeight}px`;
        (e.target as HTMLDivElement).style.left = `${e.clientX-(e.target as HTMLDivElement).clientWidth}px`;
    }

    return <div className="polaroid"
        onClick={(e) => {onClick(e)}}
        onPointerMove={(e) => {dragLogic(e)}}
        onLoad={(e) => {setup(((e.target as HTMLDivElement).parentElement) as HTMLDivElement)}}
    >
        <img style={{backgroundImage: `url(${selectedImage as string})`}} alt="Polaroid Image" src={"https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"} />
        <br />
        <input style={{width: "88px"}} type='file' accept='image/*' onChange={(e) => {handleImageChange(e)}} />
    </div>
}