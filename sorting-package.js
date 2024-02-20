const MAX_VOLUME_BULKY = 1000000;
const MAX_DIMENSION = 150;
const MAX_HEAVY = 20;
const PACKAGE_TYPE = {
    "STANDARD": "STANDARD",
    "SPECIAL": "SPECIAL",
    "REJECTED": "REJECTED"
}

const isPackageBulky = (width, height, length) => {

    const isDimensionHigher =  [width, height, length].some(d => d >= MAX_DIMENSION);

    if (isDimensionHigher) {
       return true;
    }
    // small optimization => dont multiply if this already exceeds the volume criteria for bulky.
    let v = width * height;

    return v < MAX_VOLUME_BULKY 
            ? v * length >= MAX_VOLUME_BULKY 
            : true;
}

const isPackageHeavy = (mass) => {
    return mass >= MAX_HEAVY
}


const sort = (width, height, length, mass) => {

    const isHeavy = isPackageHeavy(mass);
    const isBulky = isPackageBulky(width, height, length);
  
    if (isHeavy && isBulky) {
        return PACKAGE_TYPE.REJECTED;
    }

    if (isHeavy || isBulky) {
        return PACKAGE_TYPE.SPECIAL;
    }

    return PACKAGE_TYPE.STANDARD;
}

const ans = sort(20, 20, 20, 40); // special because it is heavy
console.log(ans);
const ans1 = sort(100, 1000, 100, 19); // special because it is bulky
console.log(ans1);
const ans2 = sort(100, 1000, 100, 20); // REJECTED
console.log(ans2);
const ans3 = sort(100, 1000, 9, 20); // rejected because it is bulk since dimension exceeds 150
console.log(ans3);
const ans4 = sort(100, 100, 9, 19); // None
console.log(ans4);
