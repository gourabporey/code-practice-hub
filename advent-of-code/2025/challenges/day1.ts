type Direction = "L" | "R";

interface Turn {
  direction: Direction;
  magnitude: number;
}

const POSITION = { MAX: 99, MIN: 0 };
const TOTAL_POSITIONS = POSITION.MAX - POSITION.MIN + 1;

const rotateLeft = (
  currentPosition: number,
  nextTurnMagnitude: number
): number => {
  const nextPosition: number = currentPosition - nextTurnMagnitude;
  return nextPosition < POSITION.MIN
    ? (TOTAL_POSITIONS + nextPosition) % TOTAL_POSITIONS
    : nextPosition;
};

const rotateRight = (
  currentPosition: number,
  nextTurnMagnitude: number
): number => {
  const nextPosition: number = currentPosition + nextTurnMagnitude;
  return nextPosition > POSITION.MAX
    ? nextPosition % TOTAL_POSITIONS
    : nextPosition;
};

const directionFunctionMapping = {
  L: rotateLeft,
  R: rotateRight,
};

export const getNextPosition = (
  currentPosition: number,
  nextTurn: Turn
): number => {
  return directionFunctionMapping[nextTurn.direction](
    currentPosition,
    nextTurn.magnitude
  );
};

const parseRotations = (rotations: String[]): Turn[] => {
  return rotations.map((rotation) => ({
    direction: rotation[0] === "L" ? "L" : "R",
    magnitude: Number.parseInt(rotation.slice(1)),
  }));
};

export const findPassword = (dialStart: number, rotations: String) => {
  const turns = parseRotations(rotations.split("\n"));
  let totalZeros = 0;
  let currentPosition = dialStart;

  for (const turn of turns) {
    const nextPosition = getNextPosition(currentPosition, turn);
    currentPosition = nextPosition;
    if (nextPosition === 0) totalZeros++;
  }

  return totalZeros;
};
