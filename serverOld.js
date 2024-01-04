const express = require('express');
const app = express();
const port = 4000;
require("dotenv").config();
app.use(express.json());
const Moralis = require("moralis").default;
const {EvmChain} = require("@moralisweb3/common-evm-utils");
const { TransactionAlertTemplate } = require('./mailService/emailTemplate');
const { sendMailFun } = require('./mailService/mailService');

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
});

console.log("process.env.MORALIS_API_KEY");
console.log(process.env.MORALIS_API_KEY);
console.log(process.env.address);
console.log(process.env.email);
console.log(`${process.env.baseURL}/webhook`);
console.log(EvmChain.BSC_TESTNET._value);
console.log(EvmChain.BSC_TESTNET._chainlistData.nativeCurrency.symbol);

 async function streams() {
    const options = {
        chains:[EvmChain.BSC_TESTNET,EvmChain.BSC,EvmChain.ETHEREUM],
        description:"Listen transactions",
        tag:"transfers",
        includeContractLogs:false,
        includeNativeTxs:true,
        webhookUrl:`${process.env.baseURL}/webhook`,
    }

    const newStream = await Moralis.Streams.add(options)
    const {id} = newStream.toJSON();
    const address = process.env.address
    await Moralis.Streams.addAddress({address,id})
    console.log("final run")
    console.log(id)
}
streams()

function setCurrency(chainId) {
    let symbol='';
    if(EvmChain.BSC_TESTNET._value == chainId) {
        symbol=EvmChain.BSC_TESTNET._chainlistData.nativeCurrency.symbol
    }else if(EvmChain.BSC._value == chainId){
        symbol=EvmChain.BSC._chainlistData.nativeCurrency.symbol
    }else{
        symbol=EvmChain.ETHEREUM._chainlistData.nativeCurrency.symbol
    }
    return symbol || 'coin'
}

// app.post("/webhook", async (req,res)=>{
//     const {body}= req;
//     try {
//         if(body?.txs[0]?.fromAddress){
//             let payload ={}
//             console.log("body");
//             console.log(body);
           
         
//             if(body?.txs[0]?.value == '0') {
//                 const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
//                     "chain": body?.chainId,
//                     "address": process.env.address
//                 });
//                 payload ={
//                     fromAddress:body?.txs[0]?.fromAddress,
//                     toAddress:body?.txs[0]?.toAddress,
//                     value: response?.result[0]?._data?.value ? (parseInt(response?.result[0]?._data?.value) / (10 ** 18)):0,
//                     symbol: response?.result[0]?._data?.tokenSymbol
//                 }
//                 console.log("token");
//                 console.log(payload);
                
//             }else{
//                 payload ={
//                     fromAddress:body?.txs[0]?.fromAddress,
//                     toAddress:body?.txs[0]?.toAddress,
//                     value: body?.txs[0]?.value ? body?.txs[0]?.value / (10 ** 18) : 0,
//                     symbol: setCurrency(body?.chainId)
//                 }
//                 console.log("Coin");
//                 console.log(payload);
//                 // sendMail
//                 // let template = TransactionAlertTemplate(payload)
//                 // await sendMailFun(process.env.email, template, "Transaction Alert")
//                 //  sendMail
//             }
//         }
//         return res.status(200).json()
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json()
//     }
// })

// app.listen(port,()=>{
//     console.log("Running on: "+ port);
// })