const { default: Ajv } = require("ajv");
const ajv = new Ajv();

const iceCreamSchema = {
  type: "object",
  properties: {
    flavour: { type: "string" },
    price: { type: "number" },
  },
  required: ["flavour", "price"],
};

const isIceCream = ajv.compile(iceCreamSchema);

const main = () => {
  const iceCreamWithPriceAndDecentFlavour = {
    flavour: "Vanilla",
    price: 12,
  };
  const iceCreamWithoutFlavour = {
    price: 20,
  };
  console.log(
    iceCreamWithPriceAndDecentFlavour,
    isIceCream(iceCreamWithPriceAndDecentFlavour)
  );
  console.log(iceCreamWithoutFlavour, isIceCream(iceCreamWithoutFlavour));
};

main();
