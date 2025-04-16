import crypto from "crypto";
import l from "../../common/logger";
import { secureMorphSecret } from "../../common/config";
import ChameleonHash from "./helpers/chameleonHash";
import UserEncryptionModel from "../../models/UserEncryptionModel";
import BlockchainService from "./Blockchain.service";

class StoreVerificationService {
  /**
   * @description Store the given verification data into the database and corresponding hashes into the blockchain
   * @param {string} userName User Name of the user
   * @param {string} encryptionKey Encryption key of the user
   * @param {object} mutableData Mutable data of the user
   * @param {object} immutableData Immutable data of the user
   */
  /*
  async storeData(userName, encryptionKey, mutableData, immutableData) {
    try {
      const privateKeySalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const userEncryptionInstance = await UserEncryptionModel.findOne({
        privateKeySalt,
      });
      if (userEncryptionInstance) {
        return {
          message: "Data already stored",
        };
      }

      const mutableDataChameleonHash = ChameleonHash(
        JSON.stringify(mutableData)
      );
      const immutableDataHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(immutableData))
        .digest("hex");

      const intializationVector = crypto.randomBytes(16).toString("hex");

      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(secureMorphSecret, "hex"),
        Buffer.from(intializationVector, "hex")
      );
      const encryptedData =
        cipher.update(
          JSON.stringify({
            userName,
            mutableDataChameleonHash,
            immutableDataHash,
          }),
          "utf8",
          "hex"
        ) + cipher.final("hex");

      // Blockchain service call
      await BlockchainService.storeData(
        userName,
        encryptionKey,
        mutableDataChameleonHash,
        immutableDataHash
      );
      await UserEncryptionModel.create({
        privateKeySalt,
        intializationVector,
        encrytpedData: encryptedData,
      });

      return {
        message: "Data stored successfully",
      };
    } catch (error) {
      l.error(error, "[STORE VERIFICATION SERVICE]");
      throw error;
    }
  }*/
  async storeData(userName, encryptionKey, mutableData, immutableData) {
    try {
      const privateKeySalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");
  
      const userEncryptionInstance = await UserEncryptionModel.findOne({
        privateKeySalt,
      });
  /*
      if (userEncryptionInstance) {
        return {
          message: "Data already stored",
        };
      }*/
      if (userEncryptionInstance) {
        if (userEncryptionInstance.keyUseCount <= 0) {
          return { message: "Key has no remaining uses" };
        }
      
        // Decrement keyUseCount and update
        userEncryptionInstance.keyUseCount -= 1;
        await userEncryptionInstance.save();
      
        return {
          message: `Key used successfully. Remaining uses: ${userEncryptionInstance.keyUseCount}`,
        };
      }
      
  
      const mutableDataChameleonHash = ChameleonHash(
        JSON.stringify(mutableData)
      );
  
      const immutableDataHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(immutableData))
        .digest("hex");
  
      const intializationVector = crypto.randomBytes(16).toString("hex");
  
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(secureMorphSecret, "hex"),
        Buffer.from(intializationVector, "hex")
      );
  
      const encryptedData =
        cipher.update(
          JSON.stringify({
            userName,
            mutableDataChameleonHash,
            immutableDataHash,
          }),
          "utf8",
          "hex"
        ) + cipher.final("hex");
  
      // Blockchain service call
      await BlockchainService.storeData(
        userName,
        encryptionKey,
        mutableDataChameleonHash,
        immutableDataHash
      );
  
      // ✅ Store everything in MongoDB, including keyUseCount and userName
      await UserEncryptionModel.create({
        userName,
        privateKeySalt,
        intializationVector,
        encrytpedData: encryptedData,
        keyUseCount: 3, // Set your initial usage count here
      });
  
      return {
        message: "Data stored successfully",
      };
    } catch (error) {
      l.error(error, "[STORE VERIFICATION SERVICE]");
      throw error;
    }
  }
  

  /**
   * @description Updates the encryption key of the user and reflects the change in MongoDB as well
   * @param {string} encryptionKey
   * @param {string} newEncryptionKey
   * @param {string} userName
   */
  async updateEncryptionKey(encryptionKey, newEncryptionKey, userName) {
    try {
      // 1. Update on Blockchain
      await BlockchainService.updateEncryptionKey(
        encryptionKey,
        newEncryptionKey,
        userName
      );

      // 2. Generate old and new salts
      const oldSalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const newSalt = crypto
        .createHash("sha256")
        .update(newEncryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const newIV = crypto.randomBytes(16).toString("hex");

      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(secureMorphSecret, "hex"),
        Buffer.from(newIV, "hex")
      );

      const encryptedData =
        cipher.update(
          JSON.stringify({
            userName,
            encryptionKey: newEncryptionKey,
          }),
          "utf8",
          "hex"
        ) + cipher.final("hex");

      // 3. Update MongoDB document
      await UserEncryptionModel.updateOne(
        { privateKeySalt: oldSalt },
        {
          $set: {
            privateKeySalt: newSalt,
            intializationVector: newIV,
            encrytpedData: encryptedData,
          },
        },
        { upsert: true }
      );

      return { message: "Encryption key updated successfully" };
    } catch (error) {
      l.error(error, "[STORE VERIFICATION SERVICE: UPDATE ENCRYPTION KEY]");
      throw error;
    }
  }
}

export default new StoreVerificationService();
