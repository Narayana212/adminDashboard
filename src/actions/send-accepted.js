"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendAcceptedEmail = async (name,price,description,email) => {
  const response = await plunk.emails.send({
    to: email,
    subject: "Product Accepted",
    body:"hi",

  });

  console.log(response)
};