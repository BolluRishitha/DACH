import crypto from "crypto";
import l from "../../common/logger";
import { secureMorphSecret } from "../../common/config";
import ChameleonHash from "./helpers/chameleonHash";
import UserEncryptionModel from "../../models/UserEncryptionModel";
import BlockchainService from "./Blockchain.service";

class UserVerificationService {
  async verifyUser(
    userName,
    encryptionKey,
    mutableDataChameleonHash,
    immutableDataHash
  ) {
    try {
      const privateKeySalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const user = await UserEncryptionModel.findOne({ privateKeySalt });
      if (!user) {
        return {
          message: "Encryption key is incorrect",
        };
      }

      await BlockchainService.verifyUser(
        userName,
        encryptionKey,
        mutableDataChameleonHash,
        immutableDataHash
      );
      return {
        message: "User verified successfully",
      };
    } catch (error) {
      l.error(error, "[USER VERIFICATION SERVICE]");
      throw error;
    }
  }
    
    

  async deleteUser(
    userName,
    encryptionKey,
    mutableDataChameleonHash,
    immutableDataHash
  ) {
    try {
      await BlockchainService.deleteUser(userName, encryptionKey);

      const privateKeySalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      await UserEncryptionModel.deleteOne({
        privateKeySalt,
      });

      return {
        message: "User Deleted Successfully",
      };
    } catch (error) {
      l.error(error, "[USER VERIFICATION SERVICE: DELETE USER]");
      throw error;
    }
  }

  async updateEncryptionKey(userName, encryptionKey, newEncryptionKey) {
    try {
      await BlockchainService.updateEncryptionKey(
        encryptionKey,
        newEncryptionKey,
        userName
      );

      const oldSalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const newSalt = crypto
        .createHash("sha256")
        .update(newEncryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const exists = await UserEncryptionModel.findOne({ privateKeySalt: newSalt });
      if (exists) {
        return { message: "Encryption key already used. Please choose another." };
      }

      await UserEncryptionModel.updateOne(
        { privateKeySalt: oldSalt },
        { $set: { privateKeySalt: newSalt } }
      );

      return {
        message: "Encryption key updated successfully",
      };
    } catch (error) {
      l.error(error, "[USER VERIFICATION SERVICE: UPDATE USER KEY]");
      throw error;
    }
  }

  /*async reduceKeyUseCount(userName, encryptionKey, reduceCount) {
    try {
      const privateKeySalt = crypto
        .createHash("sha256")
        .update(encryptionKey + secureMorphSecret + userName)
        .digest("hex");

      const user = await UserEncryptionModel.findOne({ privateKeySalt });
      if (!user) {
        return {
          message: "Encryption key is incorrect",
        };
      }

      await BlockchainService.reduceKeyUseCount(
        encryptionKey,
        userName,
        reduceCount
      );

      return {
        message: "Encryption key use count reduced successfully",
      };
    } catch (error) {
      l.error(error, "[USER VERIFICATION SERVICE: REDUCE KEY USE COUNT]");
      throw error;
    }
  }*/
    async reduceKeyUseCount(userName, encryptionKey, reduceCount) {
      try {
        const privateKeySalt = crypto
          .createHash("sha256")
          .update(encryptionKey + secureMorphSecret + userName)
          .digest("hex");
    
        const user = await UserEncryptionModel.findOne({ privateKeySalt });
    
        if (!user) {
          return {
            message: "Encryption key is incorrect",
          };
        }
    
        // Check remainingUses is defined and has sufficient count
        if (typeof user.remainingUses !== "number" || user.remainingUses <= 0) {
          return {
            message: "Key has no remaining uses. Cannot reduce further.",
          };
        }
    
        if (reduceCount > user.remainingUses) {
          return {
            message: `Only ${user.remainingUses} uses left. Cannot reduce by ${reduceCount}.`,
          };
        }
    
        user.remainingUses -= reduceCount;
        await user.save();
    
        await BlockchainService.reduceKeyUseCount(
          encryptionKey,
          userName,
          reduceCount
        );
    
        return {
          message: "Encryption key use count reduced successfully",
        };
      } catch (error) {
        l.error(error, "[USER VERIFICATION SERVICE: REDUCE KEY USE COUNT]");
        throw error;
      }
    }
    
    
  
}

export default new UserVerificationService();
