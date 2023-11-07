"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendAcceptedEmail = async (name,price,description,email) => {
  const response = await plunk.emails.send({
    to: email,
    subject: "Your SNX Order Has Been Accepted",
    body: `<div style="font-size: 18px;">
    Hello,
    <hr style="width: 0px;">
    
    We're excited to inform you that your recent product with SNX has been successfully accepted!
Thank you for choosing SNX for your shopping needs. 
Happy shopping!

    <hr style="width: 0px;">
    Warm Regards,
    <hr style="width: 0px;">
    SNX Team
    
    </div>`,

  });

  console.log(response)
};