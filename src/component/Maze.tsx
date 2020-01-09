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
    for (var i = 0; i <= size; i++) {
        for (var j = 0; j <= size; j++) {
            if (position.x>=i&&position.y>=j&&position.x<=size&&position.y<=size) {
                columns.push(<td style={{ height: "70px", width: "70px", border: "1px solid" }}><span style={{fontSize : "50px"}}><i className="fas fa-robot"></i></span></td>);
            }
            else {
                columns.push(<td style={{ height: "70px", width: "70px", border: "1px solid" }}></td>);
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

export default Maze;
