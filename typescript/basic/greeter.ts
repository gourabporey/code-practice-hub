interface Car {
  model: string;
  price: number;
  priceChanges: number[];
  review: any[] | any;
}

const audi: Car = {
  model: 'a8',
  price: 100000000,
  priceChanges: [1000000, 2349875489],
  review: {},
};

const bmw: Car = {
  model: 'i3',
  price: 1000005600,
  priceChanges: [1000000, 2349875489],
  review: [undefined, 'good', 69],
};

interface Person {
  name: string;
  age: number;
  isMale: boolean;
}

interface Pg {
  name: string;
  owner: Person;
  rent: number;
  guests: Person[] | Person;
}

const reddy: Person = {
  name: 'Surya Narayana Reddy',
  age: 49,
  isMale: true,
};

const reddirChele: Person = {
  name: 'Surya Narayana Reddy Jr',
  age: 35,
  isMale: true,
};

const milan: Person = {
  name: 'Milan Chakraborty',
  age: 20,
  isMale: true,
};

const gourab: Person = {
  name: 'Gourab Porey',
  age: 22,
  isMale: true,
};

const riya: Person = {
  name: 'Riya Ghosal',
  age: 24,
  isMale: false,
};

const swarnaBhairava: Pg = {
  name: 'swarnaBhairava',
  owner: reddy,
  rent: 6000,
  guests: [milan, gourab],
};

const swarnaBhairavaDelux: Pg = {
  name: 'swarnaBhairavaDelux',
  owner: reddirChele,
  rent: 6000,
  guests: riya,
};
