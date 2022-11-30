require("dotenv").config();
const {
  isReady,
  PrivateKey,
  PublicKey,
  Field,
  Signature,
  Poseidon,
} = require("snarkyjs");

const port = process.env.PORT || 3000;
const url = "http://localhost:" + port + "/";

(async () => {
  try {
    const response = await (await fetch(url + "123")).json();

    // console.log(response);

    const signature = Signature.fromJSON(response.signature);
    const oraclePublicKey = PublicKey.fromBase58(response.publicKey);
    // verify signature
    const isValid = signature.verify(oraclePublicKey, [
      Field(response.data.random),
      Field(123),
    ]);
    isValid.assertTrue("signature is invalid");
    // show test passed in green
    console.log("\x1b[32m%s\x1b[0m", "Test passed");
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", "Test failed");
  }

  //end program
  process.exit(0);
})();
