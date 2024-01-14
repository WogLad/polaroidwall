import React from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string}> = ({path}) => {
    function setup(div: HTMLDivElement) {
        div.style.top = `${((window.innerHeight - 240) * Math.random())+120}px`;
        div.style.left = `${((window.innerWidth - 240) * Math.random())+120}px`;
        div.style.rotate = `${Math.floor(Math.random() * 15) * (Math.random() < 0.5 ? 1 : -1)}deg`;
    }

    return <div className="polaroid" onLoad={(e) => {setup(((e.target as HTMLDivElement).parentElement) as HTMLDivElement)}}>
        <img src={path} alt="Image" />
    </div>
}