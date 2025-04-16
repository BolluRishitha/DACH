import crypto from "crypto";
import BN from "bn.js";
import sha256 from "sha256";
import {
  isChameleonHashEnabled,
  fallbackHash,
  collisionFallback,
} from "../../../common/config";

/**
 * @description Calculates the chameleon hash of the given message
 * @param {string} message Message to calculate the chameleon hash
 * @returns String - Chaemleon hash of the given message
 */

export default function ChameleonHash(message) {
  return isChameleonHashEnabled === "true"
    ? chameleonHashGenerator(message)
    : fallbackHash;
}

const chameleonHashGenerator = (message) => {
  let prime,
    primeOrder,
    generator,
    privateKey,
    trapdoor,
    hash,
    roundOneSecret,
    roundOneSignature,
    computingMessage,
    collisionMessage;

  const keyRes = keygen(128);
  prime = keyRes.prime;
  primeOrder = keyRes.primeOrder;
  generator = keyRes.generator;
  privateKey = keyRes.privateKey;
  trapdoor = keyRes.trapdoor;

  computingMessage = Buffer.from(`${message}`);
  collisionMessage = Buffer.from(collisionFallback);

  roundOneSecret = randgen(primeOrder);
  roundOneSignature = randgen(primeOrder);

  hash = chameleonHash(
    computingMessage,
    roundOneSecret,
    roundOneSignature,
    privateKey,
    prime,
    primeOrder,
    generator
  );
  if (
    generateCollision(
      computingMessage,
      collisionMessage,
      roundOneSecret,
      roundOneSignature,
      trapdoor,
      prime,
      primeOrder,
      generator
    )
  )
    return hash;

  return fallbackHash;
};

const randgen = (upperBoundHex) => {
  const upperBoundBig = new BN(upperBoundHex, 16);
  const randomBig = new BN(
    crypto.randomBytes(upperBoundBig.byteLength()).toString("hex"),
    16
  );
  return randomBig.toString("hex");
};

const keygen = (bits) => {
  const oneBig = new BN(1);
  const twoBig = new BN(2);

  const prime = crypto.randomBytes(Math.ceil(bits / 8));
  const primeBig = new BN(prime.toString("hex"), 16);
  const primeOrderBig = primeBig.sub(oneBig).div(twoBig);
  const gBig = new BN(
    crypto.randomBytes(primeBig.byteLength()).toString("hex"),
    16
  );
  gBig.pow(twoBig, primeBig); // gBig = gBig ^ 2 % primeBig

  const tkBig = randgen(primeOrderBig);
  const hkBig = gBig.pow(new BN(tkBig, 16), primeBig); // hkBig = gBig ^ tkBig % primeBig

  return {
    prime: primeBig.toString("hex"),
    primeOrder: primeOrderBig.toString("hex"),
    generator: gBig.toString("hex"),
    privateKey: hkBig.toString("hex"),
    trapdoor: tkBig.toString("hex"),
  };
};

const chameleonHash = (
  message,
  roundSecret,
  roundSignature,
  privateKey,
  prime,
  primeOrder,
  generator
) => {
  const hkeBig = new BN(privateKey, 16).pow(
    new BN(
      sha256(message + roundSecret, { asBytes: true }).toString("hex"),
      16
    ),
    prime
  );
  const gsBig = new BN(generator, 16).pow(new BN(roundSignature, 16), prime);
  const eBig = new BN(
    sha256(message + roundSecret, { asBytes: true }).toString("hex"),
    16
  );
  const tmpBig = hkeBig.mul(gsBig).mod(prime);
  const hBig = new BN(roundSecret, 16).sub(tmpBig).mod(primeOrder);

  return hBig.toString("hex");
};

const generateCollision = (
  computingMessage,
  collisionMessage,
  roundOneSecret,
  trapdoor,
  prime,
  primeOrder,
  generator
) => {
  const tkBig = new BN(trapdoor, 16);
  const kBig = randgen(primeOrder);
  const hBig = new BN(
    sha256(computingMessage + roundOneSecret, { asBytes: true }).toString(
      "hex"
    ),
    16
  );

  const r2Big = hBig
    .add(new BN(generator, 16).pow(new BN(kBig, 16), prime))
    .mod(primeOrder);
  const eBig = new BN(
    sha256(collisionMessage + r2Big.toString("hex"), {
      asBytes: true,
    }).toString("hex"),
    16
  );
  const tmpBig = eBig.mul(tkBig).mod(primeOrder);
  const s2Big = kBig.sub(tmpBig).mod(primeOrder);

  let roundTwoSecret = r2Big.toString("hex");
  let roundTwoSignature = s2Big.toString("hex");

  return { roundTwoSecret, roundTwoSignature };
};
