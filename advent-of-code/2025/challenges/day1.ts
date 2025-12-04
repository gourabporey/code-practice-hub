const POSITION = { MAX: 99, MIN: 0 } as const;
const DIAL_SIZE = POSITION.MAX - POSITION.MIN + 1;

type Direction = "L" | "R";

interface Rotation {
  readonly direction: Direction;
  readonly magnitude: number;
}

interface RotationResult {
  readonly finalPosition: number;
  readonly zerosDuring: number;
}

const rotateLeft = (
  currentPosition: number,
  magnitude: number
): RotationResult => {
  const nextPosition: number = currentPosition - magnitude;

  if (nextPosition < POSITION.MIN) {
    let zerosDuringTraversal = Math.ceil(Math.abs(nextPosition / DIAL_SIZE));
    const delta = nextPosition % DIAL_SIZE;
    const finalPosition = delta === 0 ? 0 : DIAL_SIZE + delta;
    if (finalPosition === 0) zerosDuringTraversal++;
    if (currentPosition === 0) zerosDuringTraversal--;

    return {
      finalPosition,
      zerosDuring: zerosDuringTraversal,
    };
  }

  return {
    finalPosition: nextPosition,
    zerosDuring: nextPosition === 0 ? 1 : 0,
  };
};

const rotateRight = (
  currentPosition: number,
  magnitude: number
): RotationResult => {
  const nextPosition: number = currentPosition + magnitude;

  if (nextPosition > POSITION.MAX) {
    return {
      finalPosition: nextPosition % DIAL_SIZE,
      zerosDuring: Math.floor(nextPosition / DIAL_SIZE),
    };
  }

  return {
    finalPosition: nextPosition,
    zerosDuring: nextPosition === 0 ? 1 : 0,
  };
};

const directionFunctionMapping = {
  L: rotateLeft,
  R: rotateRight,
};

export const getNextPosition = (
  currentPosition: number,
  nextTurn: Rotation
): RotationResult => {
  return directionFunctionMapping[nextTurn.direction](
    currentPosition,
    nextTurn.magnitude
  );
};

const parseRotations = (rotations: string): Rotation[] => {
  return rotations
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const directionChar = line[0];
      if (directionChar !== "L" && directionChar !== "R") {
        throw new Error(`Invalid direction in line: "${line}"`);
      }

      const magnitude = Number.parseInt(line.slice(1), 10);
      if (!Number.isFinite(magnitude) || magnitude < 0) {
        throw new Error(`Invalid magnitude in line: "${line}"`);
      }

      return {
        direction: directionChar as Direction,
        magnitude,
      };
    });
};

export const findPassword = (dialStart: number, rotations: string) => {
  const turns = parseRotations(rotations);
  let totalZeros = 0;
  let currentPosition = dialStart;

  for (const turn of turns) {
    const { finalPosition } = getNextPosition(currentPosition, turn);
    currentPosition = finalPosition;
    if (finalPosition === 0) totalZeros++;
  }

  return totalZeros;
};

export const findPasswordV2 = (dialStart: number, rotations: string) => {
  const turns = parseRotations(rotations);
  let totalZeros = 0;
  let currentPosition = dialStart;

  for (const turn of turns) {
    const { finalPosition, zerosDuring } = getNextPosition(
      currentPosition,
      turn
    );
    totalZeros += zerosDuring;
    currentPosition = finalPosition;
  }

  return totalZeros;
};
