class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
   
  static createItem(name, sellIn, quality) {
    if (name === "Aged Brie")
      return new AgedBrie(sellIn, quality);
    else if (name === "Backstage passes to a TAFKAL80ETC concert")
      return new BackstagePass(sellIn, quality);
    else if (name === "Sulfuras, Hand of Ragnaros")
      return new Sulfuras(sellIn, quality);
    else if (name.slice(0,8) === "Conjured")
      return new Conjured(name, sellIn, quality);
    else
      return new Item(name, sellIn, quality);
  }
   
  updateQuality() {
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn < 0) {
      if (this.quality > 0) {
        this.quality = this.quality - 1;
      }
    }
  }
}

class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }
   
  updateQuality() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.quality = this.quality + 1;
      }
    }
  }
}

class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super('Backstage passes to a TAFKAL80ETC concert', sellIn, quality);
  }
   
  updateQuality() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
      if (this.sellIn < 11) {
        if (this.quality < 50) {
          this.quality = this.quality + 1;
        }
      }
      if (this.sellIn < 6) {
        if (this.quality < 50) {
          this.quality = this.quality + 1;
        }
      }
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn < 0) {
      this.quality = this.quality - this.quality;
    }
  }
}

class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super('Sulfuras, Hand of Ragnaros', sellIn, quality);
  }
   
  updateQuality() {
  }
}

class Conjured extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
   
  updateQuality() {
    if (this.quality > 0) {
      this.quality = this.quality - 1;
      if (this.quality > 0) {
        this.quality = this.quality - 1;
      }
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn < 0) {
      if (this.quality > 0) {
        this.quality = this.quality - 1;
      }
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
