import React from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string, zIndexHooks: {maxZIndex: any, setMaxZIndex: any}}> = ({path, zIndexHooks}) => {
    var movable: boolean = false;
    var offset: {x: number, y: number};

    function setup(div: HTMLDivElement) {
        div.style.top = `${window.innerHeight/2}px`;
        div.style.left = `${window.innerWidth/2}px`;
        div.style.rotate = `${Math.floor(Math.random() * 15) * (Math.random() < 0.5 ? 1 : -1)}deg`;
    }

    function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        movable = !movable;
        const div: HTMLDivElement = e.target as HTMLDivElement;
        offset = {
            x: e.clientX - div.getBoundingClientRect().left,
            y: e.clientY - div.getBoundingClientRect().top
        };
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
        <img src={path} alt="Polaroid Image" />
    </div>
}