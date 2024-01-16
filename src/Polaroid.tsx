import React from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string}> = ({path}) => {
    var movable: boolean = false;
    var offset: {x: number, y: number};

    function setup(div: HTMLDivElement) {
        const wall: HTMLDivElement = div.parentElement as HTMLDivElement;
        var top: number = (Number(wall.style.height.replace("px", "")) * Math.random()) + Number(wall.style.top.replace("px", ""));
        var left: number = (Number(wall.style.width.replace("px", "")) * Math.random()) + Number(wall.style.left.replace("px", ""));

        div.style.rotate = `${Math.floor(Math.random() * 15) * (Math.random() < 0.5 ? 1 : -1)}deg`;
    }

    function onClick(e) {
        movable = !movable;
        console.log(`x:${e.clientX}, y:${e.clientY}`);
        offset = {
            x: e.clientX - (e.target as HTMLDivElement).getBoundingClientRect().left,
            y: e.clientY - (e.target as HTMLDivElement).getBoundingClientRect().top
        };
        console.log(offset);
    }

    function dragLogic(e) {
        if (movable == false) {return}
        console.log(`x:${e.clientX}, y:${e.clientY}`);
        (e.target as HTMLDivElement).style.top = `${e.clientY-(e.target as HTMLDivElement).clientHeight}px`;
        (e.target as HTMLDivElement).style.left = `${e.clientX-(e.target as HTMLDivElement).clientWidth}px`;
    }

    return <div className="polaroid"
        onClick={(e) => {onClick(e)}}
        onPointerMove={(e) => {dragLogic(e)}}
        onLoad={(e) => {setup(((e.target as HTMLDivElement).parentElement) as HTMLDivElement)}}
    >
        <img src={path} alt="Image" />
    </div>
}