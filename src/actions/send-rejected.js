"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendRejectedEmail = async (email) => {
  
  const response = await plunk.emails.send({
    to: email,
    subject: "Update on Your SNX Order",
    body: `<div style="font-size: 18px;">
Hello,
<hr style="width: 0px;">

We regret to inform you that the placement of your recent product with SNX was unsuccessful. Unfortunately, we encountered some issues during the process.
If you still wish to proceed with your product or require assistance with placing a new one, please don't hesitate to contact our customer support team at <a href="lr888.snu.edu.in">lr888@snu.edu.in</a>. We're here to help you with any questions or concerns you may have.
We apologize for any inconvenience this may cause and appreciate your understanding.
Thank you for considering SNX for your shopping needs.
<hr style="width: 0px;">
Sincerely,
<hr style="width: 0px;">
SNX Team

</div>`,
})



  console.log(response)
};