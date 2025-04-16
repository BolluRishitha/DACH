import l from "../../../common/logger";
import UserVerificationService from "../../services/userVerification.service";

export class Controller {
  /**
   * @description Store the given verification data into the database and corresponding hashes into the blockchain
   * @returns A message indicating the success or failure of the operation
   */
  async userVerification(req, res, next) {
    try {
      const { userName, encryptionKey } = req.body;
      const { mutableDataChameleonHash, immutableDataHash } =
        req.body.userDecryptedData;

      const response = await UserVerificationService.verifyUser(
        userName,
        encryptionKey,
        mutableDataChameleonHash,
        immutableDataHash
      );

      return res.status(200).json(response);
    } catch (error) {
      l.error(error, "[STORE VERIFICATION CONTROLLER]");
      next(error);
    }
  }

  /**
   * @description Delete the user encryption data from the database
   * @returns A message indicating the success or failure of the operation
   */
  async deleteUserEncryption(req, res, next) {
    try {
      const { userName, encryptionKey } = req.body;
      const { mutableDataChameleonHash, immutableDataHash } =
        req.body.userDecryptedData;

      const response = await UserVerificationService.deleteUser(
        userName,
        encryptionKey,
        mutableDataChameleonHash,
        immutableDataHash
      );

      return res.status(200).json(response);
    } catch (error) {
      l.error(error, "[STORE VERIFICATION CONTROLLER]");
      next(error);
    }
  }

  /**
   * @description Update the user encryption key
   * @returns A message indicating the success or failure of the operation
   */
  async updateEncryptionKey(req, res, next) {
    try {
      const { userName, encryptionKey, newEncryptionKey } = req.body;

      const response = await UserVerificationService.updateEncryptionKey(
        userName,
        encryptionKey,
        newEncryptionKey
      );

      return res.status(200).json(response);
    } catch (error) {
      l.error(error, "[STORE VERIFICATION CONTROLLER]");
      next(error);
    }
  }
  /**
   * @description Reduce the encryption key use count
   * @returns A message indicating the success or failure of the operation
   */
  async reduceKeyUseCount(req, res, next) {
    try {
      const { userName, encryptionKey, reduceCount } = req.body;

      const response = await UserVerificationService.reduceKeyUseCount(
        userName,
        encryptionKey,
        reduceCount
      );

      return res.status(200).json(response);
    } catch (error) {
      l.error(error, "[STORE VERIFICATION CONTROLLER]");
      next(error);
    }
  }
}
export default new Controller();
