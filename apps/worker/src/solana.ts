import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from "@solana/web3.js";




export  async function sendSolana(to:string,amount: string){
    console.log("Solana sent");
//   const keyPair =   Keypair.fromSecretKey(base58.decode(process.env.SOL_PRIVATE_KEY ?? ""))
//   const transferTransaction = new Transaction().add(
//     SystemProgram.transfer({
//         fromPubkey:keyPair.publicKey,
//         toPubkey: new PublicKey(to),
//         lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
//      })
//   )
//   await sendAndConfirmTransaction(connection, transferTransaction,[keyPair])
}