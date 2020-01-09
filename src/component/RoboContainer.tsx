import { Robot } from "../robot";
import React, { useState } from "react";
import Maze from "./Maze";
import InstructionsButtons from "./instructionButtons";

interface RoboContainerProps {
    robo: Robot
}

const RoboContainer: React.FC<RoboContainerProps> = (props) => {
    const robo = props.robo;
    const [coordinates, setCoordinates] = useState(robo.getRobotDirectionWithPosition());
    function turnLeft() {
        robo.turnLeft();
        setCoordinates(robo.getRobotDirectionWithPosition());
    }

    function turnRight() {
        robo.turnRight();
        setCoordinates(robo.getRobotDirectionWithPosition())
    }

    function move() {
        robo.move();
        setCoordinates(robo.getRobotDirectionWithPosition())
    }

    function place() {
        robo.place("0","0","NORTH");
        setCoordinates(robo.getRobotDirectionWithPosition())
    }
    return (
        <div className="App" >
            <Maze coordinates={coordinates} />
            <InstructionsButtons onclick={turnLeft}>LEFT</InstructionsButtons>
            <InstructionsButtons onclick={turnRight}>RIGHT</InstructionsButtons>
            <InstructionsButtons onclick={move}>MOVE</InstructionsButtons>
            <InstructionsButtons onclick={place}>PLACE</InstructionsButtons>
        </div>

    );
}

export default RoboContainer;
