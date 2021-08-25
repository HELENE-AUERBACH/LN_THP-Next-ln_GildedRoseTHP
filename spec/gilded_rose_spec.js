var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(Item.createItem("+5 Dexterity Vest", 10, 20));
    listItems.push(Item.createItem("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et de 1 le sellIn d'items préfixés par \"Conjured\"", function () {
    listItems.push(Item.createItem("Conjured Dark Blade", 10, 20));
    listItems.push(Item.createItem("Conjured Magic Stick", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 2, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité d'item normaux une fois que la date de péremption est passée", function () {
    listItems.push(Item.createItem("+5 Dexterity Vest", 0, 20));
    listItems.push(Item.createItem("Mana Cake", 0, 6));
    listItems.push(Item.createItem("+5 Dexterity Vest", -5, 10));
    listItems.push(Item.createItem("Mana Cake", -1, 4));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 18 },
      { sellIn: -1, quality: 4 },
      { sellIn: -6, quality: 8 },
      { sellIn: -2, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité d'un produit ne peut jamais être négative", function () {
    listItems.push(Item.createItem("+5 Dexterity Vest", 0, 1));
    listItems.push(Item.createItem("Mana Cake", 1, 0));
    listItems.push(Item.createItem("Conjured Dark Blade", 0, 2));
    listItems.push(Item.createItem("Conjured Magic Stick", -3, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: 0, quality: 0 },
      { sellIn: -1, quality: 0 },
      { sellIn: -4, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(Item.createItem("Aged Brie", 20, 30));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 2 pour Backstage passes quand il reste 10 jours ou moins, mais plus de 5 jours", function () {
    listItems.push(Item.createItem("Aged Brie", 10, 20));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    listItems.push(Item.createItem("Aged Brie", 8, 10));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 6, 8));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 21 },
      { sellIn: 9, quality: 22 },
      { sellIn: 7, quality: 11 },
      { sellIn: 5, quality: 10 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 3 pour Backstage passes quand il reste 5 jours ou moins, mais plus de 0 jour", function () {
    listItems.push(Item.createItem("Aged Brie", 5, 20));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 5, 20));
    listItems.push(Item.createItem("Aged Brie", 3, 10));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 1, 7));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 21 },
      { sellIn: 4, quality: 23 },
      { sellIn: 2, quality: 11 },
      { sellIn: 0, quality: 10 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité d'un produit n'est jamais de plus de 50", function () {
    listItems.push(Item.createItem("Aged Brie", 10, 50));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 8, 50));
    listItems.push(Item.createItem("Aged Brie", 3, 50));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 5, 50));
    listItems.push(Item.createItem("Aged Brie", 0, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 7, quality: 50 },
      { sellIn: 2, quality: 50 },
      { sellIn: 4, quality: 50 },
      { sellIn: -1, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité tombe à 0 après le concert pour Backstage passesi, mais augmente de 2 pour Aged Brie jusqu'à 50", function () {
    listItems.push(Item.createItem("Aged Brie", -1, 20));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    listItems.push(Item.createItem("Aged Brie", 0, 7));
    listItems.push(Item.createItem("Backstage passes to a TAFKAL80ETC concert", -1, 0));
    listItems.push(Item.createItem("Aged Brie", -20, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 22 },
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 9 },
      { sellIn: -2, quality: 0 },
      { sellIn: -21, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité de Sulfuras ne se modifie pas", function () {
    listItems.push(Item.createItem("Sulfuras, Hand of Ragnaros", 20, 80));
    listItems.push(Item.createItem("Sulfuras, Hand of Ragnaros", 10, 80));
    listItems.push(Item.createItem("Sulfuras, Hand of Ragnaros", 5, 80));
    listItems.push(Item.createItem("Sulfuras, Hand of Ragnaros", 1, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 20, quality: 80 },
      { sellIn: 10, quality: 80 },
      { sellIn: 5, quality: 80 },
      { sellIn: 1, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
