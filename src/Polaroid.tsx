import React from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string}> = ({path}) => {
    return <div className="polaroid">
        <img src={path} alt="Image" />
    </div>
}