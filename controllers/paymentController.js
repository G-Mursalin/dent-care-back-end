const { catchAsync } = require("../utils/catchAsync");
const stripe = require("stripe")(
  "sk_test_51L0ewEEKrvYKu07JrE6YzhNJxaZ96ylORH8jg53TCuT9L0S5Muq7STdm8DBHE6l4776mDX2PE9wOVTW4kUcIUjLz00lBHG5xKP"
);

const createPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = { createPaymentIntent };
