import { fill } from 'lodash';

export enum Directions {
    'NORTH' = 0,
    'EAST' = 1,
    'SOUTH' = 2,
    'WEST' = 3,
}
/**
 * x and y represent the position of robot. 
 */
export interface IPosition {
    x: number;
    y: number;
}
/**
 * The position of robot with directions.
 */
export interface IRobotOptions {
    position: IPosition;
    direction: Directions;
}


export class Robot {

    private direction: Directions;
    private position: IPosition;
    private xMax: number;
    private yMax: number;

    constructor() {
        this.position = { x: -1, y: -1 };
        this.direction = -1;
        this.xMax = 5;
        this.yMax = 5;
    }

    //Place the robot at intitial position
    public place(_newx: string, _newy: string, _newDirection: string): void {
        let newx = parseInt(_newx, 10);
        let newy = parseInt(_newy, 10);
        let newDirection = (<any>Directions)[_newDirection.toUpperCase()];
        if (newDirection === undefined)
            throw new Error('Invalid face ' + _newDirection);
        if (newx < 0 || newx > this.xMax)
            throw new Error('x out of range ' + newx);
        if (newy < 0 || newy > this.yMax)
            throw new Error('y out of range ' + newy);
        this.position.x = newx;
        this.position.y = newy;
        this.direction = newDirection;
    }

    public turnLeft(): Directions {
        const newDirection: Directions = this.direction === Directions.NORTH ? Directions.WEST : this.direction - 1;
        return this.direction = newDirection;
    }

    public turnRight(): Directions {
        const newDirection: Directions = this.direction === Directions.WEST ? Directions.NORTH : this.direction + 1;
        return this.direction = newDirection;
    }

    private isRobotOnBoard(): boolean {
        return this.position.x != -1 && this.position.y != -1 && this.direction != -1;
    }

    private canBeMove(): boolean {
        if (!this.isRobotOnBoard())
            return false;
        if ((this.direction == 0 && this.position.y == this.yMax) || (this.direction == 2 && this.position.y == 0) ||
            (this.direction == 3 && this.position.x == 0) || (this.direction == 1 && this.position.x == this.xMax))
            return false;
        return true;
    }

    public move(): boolean {
        if (!this.canBeMove())
            return false;
        switch (this.direction) {
            case Directions.NORTH:
                ++this.position.y;
                break;
            case Directions.EAST:
                ++this.position.x;
                break;
            case Directions.SOUTH:
                --this.position.y;
                break;
            case Directions.WEST:
                --this.position.x;
                break;
            default:
        }
        return true;
    }

    public toString() {
        return `${this.position.x}, ${this.position.y}, ${this.direction}`;
    }

    public getRobotDirectionWithPosition(): IRobotOptions {
        return { position: this.position, direction: this.direction };;
    }

    public getDirections(): Directions {
        return this.direction;
    }

    public setDirections(direction:Directions): void {
        this.direction=direction;
    }

    public getPositions(): IPosition {
        return this.position;
    }
}


export class Table {

    public content: Number[][];

    constructor(public width: number = 5, public height: number = width) {
        this.content = fill(Array(height), fill(Array(width), 0));
    }

    public isBorder(pos: IPosition): boolean {
        return (pos.x === 0)
            || (pos.x === this.width - 1)
            || (pos.y === 0)
            || (pos.y === this.height - 1);
    }
}

export class Command {

    private robot: Robot = new Robot;
    private table: Table;

    constructor(table: Table) {
        this.table = table;
    }

    public execute(command: string): void {

        if (this.robot) {
            switch (command) {
                case 'LEFT':
                    this.robot.turnLeft();
                    break;
                case 'RIGHT':
                    this.robot.turnRight();
                    break;
                case 'MOVE':
                    this.robot.move();
                    break;
                case 'REPORT':
                    process.stdout.write(this.robot.toString() + '\n');
                    break;
                default:
            }
        }

        if (command === 'PLACE' && !this.robot) {
            this.robot = new Robot();
            this.robot.place("3", "3", "EAST");
        }
    }
}
