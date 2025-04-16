import storeVerification from "./api/controllers/store-verification/router";
import userVerification from "./api/controllers/user-verification/router";

export default function routes(app) {
  app.use("/api/v1/storeVerification", storeVerification);
  app.use("/api/v1/userVerification", userVerification);
}
