import l from "../../../common/logger";
import StoreVerificationService from "../../services/storeVerification.service";

export class Controller {
  /**
   * @description Store the given verification data into the database and corresponding hashes into the blockchain
   * @returns A message indicating the success or failure of the operation
   */
  async storeVerification(req, res, next) {
    try {
      const { userName, encryptionKey, mutableData, immutableData } = req.body;

      // Validate presence of all required fields
      if (!userName || !encryptionKey || !mutableData || !immutableData) {
        l.warn("Missing required fields in request body", req.body);
        return res.status(400).json({
          message:
            "Please send all the required fields: userName, encryptionKey, mutableData, immutableData.",
        });
      }

      // Call the service to handle storage logic
      const response = await StoreVerificationService.storeData(
        userName,
        encryptionKey,
        mutableData,
        immutableData
      );

      // Success response
      return res.status(200).json(response);
    } catch (error) {
      // Log and propagate error
      l.error(error, "[STORE VERIFICATION CONTROLLER]");
      res.status(500).json({
        message: "An unexpected error occurred while processing your request.",
        error: error.message,
      });
      next(error);
    }
  }
}

export default new Controller();
