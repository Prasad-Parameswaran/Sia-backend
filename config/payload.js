const env = require("../env");
const config = require("../config/appConfig");
const accountSid = config[env.instance].twilio.accountSid;
const authToken = config[env.instance].twilio.authToken;
const sender = config[env.instance].twilio.from;
const client = require("twilio")(accountSid, authToken);

module.exports = async payload => {
    console.log('Payload of sending OTP', payload)
    try {
        let twilioObj = {
            body: payload.message,
            to: payload.to,
            from: sender
        }

        let sendSMS = await client.messages.create(twilioObj)
        console.log('SMS sent successfully from twilio', sendSMS)
        return true
    } catch (e) {
        console.log('Error in sending OTP in sms', e)
        return false
    }
}