const stripe = require("stripe")(process.env.SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    //chack validate product price ,total amount and shipping fee fron your backand
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  //   console.log(paymentIntent);
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};
module.exports = stripeController;
