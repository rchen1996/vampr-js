class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberFromOriginal = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      numberFromOriginal++;
      currentVampire = currentVampire.creator;
    }
    return numberFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const vamp1FromOriginal = this.numberOfVampiresFromOriginal;
    const vamp2FromOriginal = vampire.numberOfVampiresFromOriginal;
    return vamp1FromOriginal < vamp2FromOriginal ? true : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisFromOriginal = this.numberOfVampiresFromOriginal;
    let otherFromOriginal = vampire.numberOfVampiresFromOriginal;
    if (this.name === vampire.name) {
      return this;
    } else if (thisFromOriginal === otherFromOriginal && this.creator === vampire.creator) {
      return this.creator;
    } else if (!this.creator || !vampire.creator) {
      return thisFromOriginal < otherFromOriginal ? this : vampire;
    } else if (thisFromOriginal > otherFromOriginal) {
      let currentVampire = this;
      while (currentVampire.numberOfVampiresFromOriginal > otherFromOriginal) {
        currentVampire = currentVampire.creator;
      }
      if (currentVampire.name === vampire.name) {
        return vampire;
      } else if (currentVampire.creator === vampire.creator) {
        return vampire.creator;
      } else {
        let otherVampire = vampire;
        while (currentVampire.creator !== otherVampire.creator) {
          currentVampire = currentVampire.creator;
          otherVampire = otherVampire.creator;
        }
        return currentVampire.creator;
      }
    } else if (otherFromOriginal > thisFromOriginal) {
      let currentVampire = vampire;
      while (currentVampire.numberOfVampiresFromOriginal > thisFromOriginal) {
        currentVampire = currentVampire.creator;
      }
      if (currentVampire.name === this.name) {
        return this;
      } else if (currentVampire.creator === this.creator) {
        return this.creator;
      } else {
        let thisVampire = this;
        while (currentVampire.creator !== thisVampire.creator) {
          currentVampire = currentVampire.creator;
          thisVampire = thisVampire.creator;
        }
        return currentVampire.creator;
      }
    }
  }
}

module.exports = Vampire;

