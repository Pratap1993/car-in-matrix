import { expect } from 'chai';
import { Table, Robot, Directions, IPosition } from './robot';

test("should create a 5x5 matrix", () => {
    const tableTop = new Table();
    expect(tableTop.content).to.be.an('Array');
    expect(tableTop.width).to.be.eq(5);
    expect(tableTop.height).to.be.eq(5);
    expect(tableTop.content.length).to.be.equal(5);
    expect(tableTop.content[0].length).to.be.equal(5);
})

test("should create an 9x9 size matrix", () => {
    const tableTop = new Table(9);
    expect(tableTop.width).to.be.eq(9);
    expect(tableTop.height).to.be.eq(9);
    expect(tableTop.content.length).to.be.equal(9);
    expect(tableTop.content[0].length).to.be.equal(9);
})

test("should create an 3x8 size matrix", () => {
    const tableTop = new Table(3, 8);
    expect(tableTop.width).to.be.eq(3);
    expect(tableTop.height).to.be.eq(8);
    expect(tableTop.content.length).to.be.equal(8);
    expect(tableTop.content[0].length).to.be.equal(3);
})

test("should be false when not a border's coordinates", () => {
    const tableTop = new Table();
    const pos = { x: 3, y: 3 };
    expect(tableTop.isBorder(pos)).to.be.false;
})

test("should be true when a border's coordinates", () => {
    const tableTop = new Table();

    expect(tableTop.isBorder({ x: 0, y: 0 })).to.be.true;
    expect(tableTop.isBorder({ x: 0, y: 3 })).to.be.true;
    expect(tableTop.isBorder({ x: 3, y: 0 })).to.be.true;
    expect(tableTop.isBorder({ x: 4, y: 2 })).to.be.true;
    expect(tableTop.isBorder({ x: 2, y: 4 })).to.be.true;
})

test("should be false when not border coordinates", () => {
    const tableTop = new Table();

    expect(tableTop.isBorder({ x: 1, y: 1 })).to.be.false;
    expect(tableTop.isBorder({ x: 3, y: 3 })).to.be.false;
})

test("should be initialized with the given params", () => {
    const robot: Robot = new Robot();
    robot.place("3", "3", "SOUTH")

    expect(robot.toString()).to.eq('3, 3, 2');
    expect(robot.getDirections()).to.eq(Directions.SOUTH);
})

test("should turn the robot left", () => {
    const robot: Robot = new Robot();
    robot.place("3", "3", "NORTH");

    expect(robot.getDirections()).to.eq(Directions.NORTH);

    expect(robot.turnLeft()).to.eq(Directions.WEST);
    expect(robot.getDirections()).to.eq(Directions.WEST);

    expect(robot.turnLeft()).to.eq(Directions.SOUTH);
    expect(robot.getDirections()).to.eq(Directions.SOUTH);

    expect(robot.turnLeft()).to.eq(Directions.EAST);
    expect(robot.turnLeft()).to.eq(Directions.NORTH);
})

test("should turn the robot right", () => {
    const robot2: Robot = new Robot();
    robot2.place("3", "3", "NORTH");
    expect(robot2.getDirections()).to.eq(Directions.NORTH);

    expect(robot2.turnRight()).to.eq(Directions.EAST);
    expect(robot2.getDirections()).to.eq(Directions.EAST);

    expect(robot2.turnRight()).to.eq(Directions.SOUTH);
    expect(robot2.turnRight()).to.eq(Directions.WEST);
    expect(robot2.turnRight()).to.eq(Directions.NORTH);
})

test("should be move in front direction", () => {
    const robot: Robot = new Robot();
    robot.place("3", "4", "NORTH");
    robot.move();
    const position: IPosition = { x: 3, y: 5 };
    expect(robot.getPositions()).to.eql(position);
    expect(robot.getDirections()).to.eq(Directions.NORTH)
})

test("should not be move in front direction, because its on top", () => {
    const robot: Robot = new Robot();
    robot.place("3", "5", "NORTH");
    robot.move();
    const position: IPosition = { x: 3, y: 5 };
    expect(robot.getPositions()).to.eql(position);
    expect(robot.getDirections()).to.eq(Directions.NORTH)
})
