"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendRejectedEmail = async (email) => {
  const response = await plunk.emails.send({
    to: email,
    subject: "Product Rejected",
    body:"hi",

  });

  console.log(response)
};