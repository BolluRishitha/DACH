const abiData = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_verifierEncryptedKey",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "userName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "changeCount",
        type: "uint256",
      },
    ],
    name: "VerificationChangeCountReduced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "newEncryptionKey",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldEncryptionKey",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "userName",
        type: "string",
      },
    ],
    name: "VerificationChangeEncryptionKey",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "userName",
        type: "string",
      },
    ],
    name: "VerificationDataDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "userName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "mutableDataHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "immutableDataHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "changeCount",
        type: "uint256",
      },
    ],
    name: "VerificationDataStored",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "VerificationErrorMessage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_newUserEncryptedKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
    ],
    name: "changeUserEncryptionKey",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
    ],
    name: "deleteVerificationData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_reduceCountTo",
        type: "uint256",
      },
    ],
    name: "reduceChangeCount",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mutableDataHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_immutableDataHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_changeCount",
        type: "uint256",
      },
    ],
    name: "storeVerificationData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mutableDataHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_immutableDataHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
    ],
    name: "storeVerificationData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userEncryptedKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mutableDataHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_immutableDataHash",
        type: "string",
      },
    ],
    name: "verifyUserIdentity",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default abiData;
