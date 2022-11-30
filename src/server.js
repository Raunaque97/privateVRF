require("dotenv").config();
const Koa = require("koa");
const Router = require("@koa/router");
const { isReady, PrivateKey, Field, Signature, Poseidon } = require("snarkyjs");

const app = new Koa();
const router = new Router();

// We need to wait for SnarkyJS to finish loading before we can do anything
// await for isReady
const port = process.env.PORT || 3000;

isReady.then(() => {
  const privateKey = PrivateKey.fromBase58(process.env.PRIVATE_KEY);
  const publicKey = privateKey.toPublicKey();

  async function getData(commitHash = undefined) {
    // generate 256bit randomness
    const random = Field.random();
    // create signature
    const signature = commitHash
      ? Signature.create(privateKey, [random, commitHash])
      : Signature.create(privateKey, [random]);

    return {
      data: { random },
      signature,
      publicKey,
    };
  }

  router
    .get("/", async (ctx) => {
      ctx.body = await getData();
    })
    .get("/:commit([0-9]*)", async (ctx) => {
      ctx.body = await getData(Field(ctx.params.commit));
    });
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
