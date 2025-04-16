import * as express from "express";
import controller from "./controller";
import verifyUserEncryption from "../../middlewares/verifyUserEncryption.handler";

export default express
  .Router()
  .post("/", verifyUserEncryption, controller.userVerification)
  .delete("/delete", verifyUserEncryption, controller.deleteUserEncryption)
  .put(
    "/updateEncryptionKey",
    verifyUserEncryption,
    controller.updateEncryptionKey
  )
  .put(
    "/reduceKeyUseCount",
    verifyUserEncryption,
    controller.reduceKeyUseCount
  );
