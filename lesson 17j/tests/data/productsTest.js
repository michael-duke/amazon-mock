import { Product, Appliance, Clothing } from "../../data/products.js";

describe("Automated tests for Products", () => {
  const p = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  });
  const c = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  });
  const a = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197,
    },
    type: "appliance",
    warrantyLink: "images/appliance-warranty.png",
    instructionsLink: "images/appliance-instructions.png",
    priceCents: 1899,
    keywords: ["toaster", "kitchen", "appliances"],
  });
  describe("Test Suite: Product Class", () => {
    beforeEach(() => {});
    it("Creates an object of instance Product", () => {
      expect(p instanceof Product).toBeTrue();
    });
    it("Has method getPrice", () => {
      expect(typeof p.getPrice).toBe("function");
      expect(p.getPrice()).toBe("$10.90");
    });
    it("Has a method getStarsURL", () => {
      expect(p.getStarsURL()).toContain("images/ratings");
      expect(p.getStarsURL()).toContain(p.rating.stars * 10);
    });
  });
  describe("Test Suite: Clothing Class", () => {
    it("Creates an object of instance CLothing", () => {
      expect(c instanceof Clothing).toBeTrue();
    });
    it("Check property sizeChartLink", () => {
      expect("sizeChartLink" in c).toBeTrue();
      expect(c.renderExtraInfo()).toContain(c.sizeChartLink);
    });
  });
  describe("Test Suite: Appliance Class", () => {
    it("Creates an object of instance Appliance", () => {
      expect(a instanceof Appliance).toBeTrue();
    });
    it("Check properties warrantyLink and instrucstionsLink", () => {
      expect("warrantyLink" in a).toBeTrue();
      expect("instructionsLink" in a).toBeTrue();
      expect(a.renderExtraInfo()).toContain(a.warrantyLink);
      expect(a.renderExtraInfo()).toContain(a.instructionsLink);
    });
  });
});
