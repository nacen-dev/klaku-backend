import config from "config";
import { Request, Response } from "express";
import Stripe from "stripe";
import { Item } from "../middleware/checkIfValidProducts";
import { VerifyProductItemsInput } from "../schema/productSchema";
import { log } from "../utils/logger";

const stripe = new Stripe(config.get("stripeSecretKey"), {
  apiVersion: "2020-08-27",
});

const calculateSubTotal = (items: Item[]) => {
  return items.reduce(
    (subTotal, item) => subTotal + item.price * item.quantity,
    0
  );
};

// Stripe expects amounts to be provided in a currency's smallest unit.
// 1 USD = 100 cents
const STRIPE_USD_CURRENCY_UNIT = 100;

export const paymentHandler = async (
  req: Request<{}, {}, VerifyProductItemsInput>,
  res: Response<{}, { items: Item[] }>
) => {
  const cartItems = res.locals.items;

  const subTotal = calculateSubTotal(cartItems);

  const shippingPrice = 1;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: subTotal * STRIPE_USD_CURRENCY_UNIT,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    subTotal,
    shippingPrice,
  });
};
