import { Robot, Directions, IPosition } from "../robot";
import React, { useState } from "react";
import Maze from "./Maze";
import InstructionsButtons from "./instructionButtons";

interface RoboContainerProps {
    robo: Robot;
}

interface Input {
    direction: Directions,
    position: IPosition
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
        setCoordinates(robo.getRobotDirectionWithPosition());
    }

    function move() {
        robo.move();
        setCoordinates(robo.getRobotDirectionWithPosition());
    }

    function place() {
        robo.place("0","0","NORTH");
        setCoordinates(robo.getRobotDirectionWithPosition());
    }

    return (
        <div className="App" >
            <Maze coordinates={coordinates} />
            <InstructionsButtons onclick={turnLeft}>LEFT</InstructionsButtons>
            <InstructionsButtons onclick={turnRight}>RIGHT</InstructionsButtons>
            <InstructionsButtons onclick={move}>MOVE</InstructionsButtons>
            <InstructionsButtons onclick={place}>PLACE</InstructionsButtons>
            <Report direction={coordinates.direction} position={coordinates.position}></Report>
        </div>
    );
}

const Report: React.FC<Input> = (props) => {
    let robotPositionMsg = "";
    if (props.direction === -1)
        robotPositionMsg = robotPositionMsg + " Not Placed.";
    else if (props.direction === 0)
        robotPositionMsg = robotPositionMsg + " Dir: NORTH at ";
    else if (props.direction === 1)
        robotPositionMsg = robotPositionMsg + " Dir: EAST at ";
    else if (props.direction === 2)
        robotPositionMsg = robotPositionMsg + " Dir: SOUTH at ";
    else
        robotPositionMsg = robotPositionMsg + " Dir: WEST at ";
    robotPositionMsg = robotPositionMsg + " X : " + props.position.x + ", Y : " + props.position.y;
    return (
        <div className="App-blue-text">{robotPositionMsg} </div>
    )
};


export default RoboContainer;
