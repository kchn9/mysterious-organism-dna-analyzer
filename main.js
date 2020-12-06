// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns obj indexed with species number and dna strand
const pAequorFactory = (speciemenNum, dna) => {
  return {
    speciemenNum,
    dna,
    // changes one randomly picked base
    mutate() {
      const selectRandomBase = Math.floor(Math.random() * this.dna.length);
      this.dna.splice(selectRandomBase, 1, returnRandBase());
    },
    // compares with other dna strand, checks percent match
    compare(dna) {
      let commonCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === dna[i]) {
          commonCounter++;
        }
      }
      const percentMatch = Math.round((commonCounter / this.dna.length) * 100.0);
      return `speciman #1 and speciman #2 have ${percentMatch}% DNA in common.`
    },
    // if dna is made at least 60% 'C' or 'G' its likely to survive
    willLikelySurvive() {
      let cgsCounter = 0;
      this.dna.forEach(base => {
        if (base === 'C' || base === 'G') {
          cgsCounter++;
        }
      })
      const cgsByPercent = (cgsCounter / this.dna.length) * 100.0;
      if (cgsByPercent >= 60.0) {
        return true;
      }
      return false;
    },
    // returns complement dna strand
    complementStrand() {
      const complementStrandArr = [];
      this.dna.forEach(base => {
        switch (base) {
          case 'A':
            complementStrandArr.push('T');
            break;
          case 'T':
            complementStrandArr.push('A');
            break;
          case 'C':
            complementStrandArr.push('G');
            break;
          case 'G':
            complementStrandArr.push('C');
            break;
        }
      })
      return complementStrandArr;
    }
  }
};