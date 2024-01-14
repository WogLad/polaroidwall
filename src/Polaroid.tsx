import React from "react";
import "./Polaroid.css";

export const Polaroid: React.FunctionComponent<{path: string}> = (data) => {
    return <div className="polaroid">
        <img src={data.path} alt="Image" />
    </div>
}