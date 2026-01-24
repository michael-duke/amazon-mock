import formatCurrency from "../../scripts/utils/money.js";

describe("Test Suite: Format Currency", () => {
  it("Converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("Works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Works with negative numbers", ()=>{
    expect(formatCurrency(-5201)).toEqual("-52.01")
  })
  describe("Rounding", () => {
    it("Rounds up to the nearest cent", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });
    it("Rounds down to the nearst cent", () => {
      expect(formatCurrency(2000.4)).toEqual("20.00");
    });
  });
});
