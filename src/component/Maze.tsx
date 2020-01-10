import { IPosition, Directions } from "../robot";

import React from "react";

interface MazeProps {
    coordinates:IPositions;
}

interface IPositions {
    position: IPosition;
    direction: Directions;
}

var size =5;
function renderRows(position: IPosition, direction: Directions) {
    let rows = [];
    let columns = [];

    for (var j = size; j >= 0; j--) {
        for (var i = 0; i<= size; i++) {
            if(position.x >= -1 && position.y >= -1 && position.x <= size && position.y <= size){
                if (position.x === i && position.y === j) {
                columns.push(<td style={{ height: "70px", width: "70px", border: "1px solid" }}><span style={{fontSize : "15px"}}><img src={require('../images.jpeg') } className={robotDirection(direction)} width="40" height="50" id="image"/></span></td>);
                }
                else {
                    columns.push(<td style={{ height: "70px", width: "70px", border: "1px solid" }}></td>);
                }
            }
        }
        rows.push(<tr>{columns}</tr>)
        columns = []
    }
    return rows
}


const Maze: React.FC<MazeProps> = (props) => {
    return (
        <div>
            <table style={{ border: "1px solid" }}>
                {renderRows(props.coordinates.position,props.coordinates.direction)}
            </table>
        </div>
    );
}

function robotDirection(direction: Directions): string {
    if (direction != null && direction === 0){
        return "rotateimg0";
    }else if(direction != null && direction === 1){
        return "rotateimg90";
    }else if(direction != null && direction === 2){
        return "rotateimg180";
    }else {
        return "rotateimg270";
    }
}

export default Maze;
