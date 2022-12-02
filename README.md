# Private VRF

Generate a random number along with a zk proof that it was generated randomly. And no one will know your secret random number until you reveal it.

It's build following [this](https://docs.minaprotocol.com/zkapps/tutorials/oracle). to be used in mina zkapps

## How it works?

It's simple node.js backend which returns a random 256 random bits along with a signature, proving that the server generated the randomness. However to be more trustless the single server should be replaced with a decentralized group like chainlink's vrf, to make it difficult to corrupt.

#### how it is private

One can also pass a hash of a random number along with the normal request and the signature in the response will also contain the commit. Then to calculate the random number just simply xor or add both numbers to produce a truly private provably random number !!!

deployed on [cyclic](https://random-secret.cyclic.app)
