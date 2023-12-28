
const TransactionAlertTemplate = (payload) => {
        return (
            `<div>
                <h5 style="margin-bottom:15px">Hi Waqar Zaka,</h5>
                <p>You have ${payload.fromAddress.toLowerCase() == process.env.address.toLowerCase()?"Sent":"Received"} ${payload.value} ${payload?.symbol} from ${payload.fromAddress} to this ${payload.toAddress}.</p>
                <p>Thank you.</p>
                <p style="margin:0" >Best Regards,</p>
                <p style="margin:0" >Tenup</p>
            </div>`
        );
}
module.exports = {
    TransactionAlertTemplate,
}
