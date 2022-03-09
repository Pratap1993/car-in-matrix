import { Car, Directions, IPosition } from "../car";
import React, { useState } from "react";
import Maze from "./Maze";
import InstructionsButtons from "./instructionButtons";

interface CarContainerProps {
    car: Car;
}

interface Input {
    direction: Directions,
    position: IPosition
}


const CarContainer: React.FC<CarContainerProps> = (props) => {
    const car = props.car;

    const [coordinates, setCoordinates] = useState(car.getCarDirectionWithPosition());
    function turnLeft() {
        car.turnLeft();
        setCoordinates(car.getCarDirectionWithPosition());
    }

    function turnRight() {
        car.turnRight();
        setCoordinates(car.getCarDirectionWithPosition());
    }

    function move() {
        car.move();
        setCoordinates(car.getCarDirectionWithPosition());
    }

    function place() {
        car.place("0","0","NORTH");
        setCoordinates(car.getCarDirectionWithPosition());
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
    let carPositionMsg = "";
    if (props.direction === -1)
        carPositionMsg = carPositionMsg + " Not Placed.";
    else if (props.direction === 0)
        carPositionMsg = carPositionMsg + " Dir: NORTH at ";
    else if (props.direction === 1)
        carPositionMsg = carPositionMsg + " Dir: EAST at ";
    else if (props.direction === 2)
        carPositionMsg = carPositionMsg + " Dir: SOUTH at ";
    else
        carPositionMsg = carPositionMsg + " Dir: WEST at ";
    carPositionMsg = carPositionMsg + " X : " + props.position.x + ", Y : " + props.position.y;
    return (
        <div className="App-blue-text">{carPositionMsg} </div>
    )
};


export default CarContainer;
