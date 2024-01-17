import React, { useState } from "react";
import { Polaroid } from "./Polaroid";

export const Wall: React.FunctionComponent<{polaroidCount: number}> = ({polaroidCount}) => {
    const [maxZIndex, setMaxZIndex] = useState(0);

    return <div>
        {[...Array(polaroidCount)].map((_object, i) => <Polaroid key={`${i}`} path={"/vite.svg"} zIndexHooks={{maxZIndex: maxZIndex, setMaxZIndex: setMaxZIndex}} />)}
    </div>
}