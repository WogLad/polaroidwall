import React from "react";
import { Polaroid } from "./Polaroid";

export const Wall: React.FunctionComponent<{polaroidCount: number}> = ({polaroidCount}) => {
    return <div>
        {[...Array(polaroidCount)].map((object, i) => <Polaroid key={`${i}`} path={"/vite.svg"} />)}
    </div>
}