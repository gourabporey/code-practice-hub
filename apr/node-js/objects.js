const paddy = "paddy";
const wheat = "wheat";
const millet = "millet";
const barley = "barley";
const maize = "maize";
const corns = "corns";
const oilSeeds = "oil seeds";

const india = {
  countryName: "India",
  gdpGrowthRate: 3.7,
  noOfStates: 30,
  population: 1.3e9,
  crops: [
    {
      name: paddy,
      production: 2000
    },
    {
      name: wheat,
      production: 20411
    }, 
    {
      name: corns,
      production: 2345
    }
  ],
  countryCode: "+91"
}

const nepal = {
  countryName: "Nepal",
  gdpGrowthRate: 5.04,
  noOfStates: 4,
  population: 30000,
  crops: [
    {
      name: paddy,
      production: 4000
    },
    {
      name: wheat,
      production: 2411
    }, 
    {
      name: corns,
      production: 2005
    }
  ],
  countryCode: "+977"
}

const france = {
  countryName: "France",
  gdpGrowthRate: 6.8,
  noOfStates: 12,
  population: 130000,
  crops: [
    {
      name: paddy,
      production: 4000
    },
    {
      name: wheat,
      production: 2411
    }, 
    {
      name: corns,
      production: 2005
    }
  ],
  countryCode: "+33"
}

const srilanka = {
  countryName : "Sri Lanka",
  gdpGrowthRate : 4,
  noOfStates : 23,
  population : 1.2e7,
  crops: [
    {
      name: paddy,
      production: 4000
    },
    {
      name: wheat,
      production: 2411
    }, 
    {
      name: corns,
      production: 2005
    }
  ],
  countryCode : "12"
}

const countries = {
  india,
  srilanka,
  nepal,
  france
}

const allCrops = function(countries) {
  for (let index = 0; index < countries.length; index++) {
    const current = countries[index];
    console.log(current.countryName, ":", current.crops.toString());
  }
}

const countryWithHighest = function(countries, criteria) {
  let highestValue = countries[0][criteria];
  let country = countries[0].countryName;

  for (let index = 1; index < countries.length; index++) {
    const currentValue = countries[index][criteria];
    const currentCountryName = countries[index].countryName;

    if (currentValue > highestValue) {
      country = currentCountryName;
      highestValue = currentValue;
    }
  }

  return country;
}

console.log(countries);
console.log("Country with highest population", countryWithHighest(countries, "population")); 
console.log("Country with highest GDP Growth Rate", countryWithHighest(countries, "gdpGrowthRate")); 
