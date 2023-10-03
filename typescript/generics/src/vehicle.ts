type Vehicle = {
  color: string;
  model: string;
  price: number;
};

type Car = Vehicle & {
  doors: number;
};

type Bike = Vehicle & {
  twoSeater: boolean;
};

const sortVehileBasedOnPrice = <T extends Vehicle>(vehicles: T[]): T[] => {
  return [...vehicles].sort((v1, v2) => v1.price - v2.price);
};

export { sortVehileBasedOnPrice, Vehicle, Car, Bike };
