import React from "react";

interface InstructionProps {
    onclick: () => void
}

const InstructionsButtons: React.FC<InstructionProps> = (props) => {
    return (
        <div>
            <button onClick={props.onclick}>{props.children}</button>
        </div>
    )
}

export default InstructionsButtons;
