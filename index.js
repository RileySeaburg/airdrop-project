const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

console.log(`Public key: ${publicKey}`);
console.log(`Secret key: ${secretKey}`);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(publicKey);
    console.log(`Wallet balance: ${walletBalance}`);
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch {
    console.log(err);
  }
};
const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();
