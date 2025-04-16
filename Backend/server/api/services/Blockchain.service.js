import l from "../../common/logger.js";
import Web3 from "web3";
import abiData from "./helpers/abi";
import {
  providerUrl,
  contractAddress,
  privateKey,
} from "../../common/config.js";

const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(abiData, contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

class BlockchainService {
  async storeData(
    userName,
    encryptionKey,
    mutableDataChameleonHash,
    immutableDataHash
  ) {
    try {
      const tx = {
        from: account.address,
        to: contractAddress,
        data: contract.methods
          .storeVerificationData(
            userName,
            mutableDataChameleonHash,
            immutableDataHash,
            encryptionKey
          )
          .encodeABI(),
        gas: 2000000,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      return receipt;
    } catch (error) {
      l.error(error, "[BLOCKCHAIN SERVICE: STORE VERIFICATION]");
      throw error;
    }
  }

  async verifyUser(
    userName,
    encryptionKey,
    mutableDataChameleonHash,
    immutableDataHash
  ) {
    try {
      const recipt = await contract.methods
        .verifyUserIdentity(
          encryptionKey,
          userName,
          mutableDataChameleonHash,
          immutableDataHash
        )
        .call();
      return recipt;
    } catch (error) {
      l.error(error, "[BLOCKCHAIN SERVICE: USER VERIFICATION]");
      throw error;
    }
  }

  async deleteUser(userName, encryptionKey) {
    try {
      const tx = {
        from: account.address,
        to: contractAddress,
        data: contract.methods
          .deleteVerificationData(encryptionKey, userName)
          .encodeABI(),
        gas: 200000,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      return receipt;
    } catch (error) {
      l.error(error, "[BLOCKCHAIN SERVICE: DELETE USER]");
      throw error;
    }
  }

  async updateEncryptionKey(encryptionKey, newEncryptionKey, userName) {
    try {
      const tx = {
        from: account.address,
        to: contractAddress,
        data: contract.methods
          .changeUserEncryptionKey(encryptionKey, newEncryptionKey, userName)
          .encodeABI(),
        gas: 200000,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      return receipt;
    } catch (error) {
      l.error(error, "[BLOCKCHAIN SERVICE: UPDATE ENCRYPTION KEY]");
      throw error;
    }
  }

  async reduceKeyUseCount(encryptionKey, userName, reduceCount) {
    try {
      const tx = {
        from: account.address,
        to: contractAddress,
        data: contract.methods
          .reduceChangeCount(encryptionKey, userName, reduceCount)
          .encodeABI(),
        gas: 200000,
        gasPrice: await web3.eth.getGasPrice(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      return receipt;
    } catch (error) {
      l.error(error, "[BLOCKCHAIN SERVICE: REDUCE KEY USE COUNT]");
      throw error;
    }
  }
}

export default new BlockchainService();