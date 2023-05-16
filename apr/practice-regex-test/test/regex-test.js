const {describe, it} = require("node:test");  
const {strictEqual} = require("assert");
const {substitute, validate} = require("../src/regex.js");

describe("substitute", function() {
  describe("only characters", function() {
    it("Should substitute a with b", function() {
      strictEqual(substitute("gourab", "a", "b"), "gourbb");
    });

    it("Should substitute a followed by one char with b", function() {
      strictEqual(substitute("vidita", "i", "o"), "vodota");
    });
  });

  describe("Regex", function() {
    it("Should substitute a followed by one char with b", function() {
      strictEqual(substitute("gourab", /a./g, "b"), "gourb");
    });
  });
}); 

describe("Validate", function() {
  const emailFormat = /^[a-z]+@[a-z]+\.[a-z]+/; 

  it("Should give true for a valid email", function() {
    strictEqual(validate(emailFormat, "gourab@gmail.com"), true);
  });

  it("Should give false for an email without domain", function() {
    strictEqual(validate(emailFormat, "gourab@gmail"), false);
  });

  it("Should give false for an email that contains capital letters", function() {
    strictEqual(validate(emailFormat, "Gourab@yahoo.in"), false);
  });
});
