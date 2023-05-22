const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")('sk_test_51MuzAULZirzeNvwxPX5y8CZRej2n67YLCepRFQf9vSuvBT3CXKKgvSr2TjUoXlPZWqbvFtAYXkOlapHw1h3oqf3m00t4D6NQzA');
const { v4: uuidv4 } = require('uuid');


router.post('/payment', async (req, res) => {
	const { token, cart } = req.body;
	console.log(cart.products[0].price);
	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		});

		const idempotencyKey = uuidv4();
		const charge = await stripe.charges.create(
			{
				amount: cart.products[0].price * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the product`
			},
			{
				idempotencyKey
			}
		);
		console.log('Charge:', { charge });
		res.status(200).json(charge);

	} catch (error) {
		console.log(error)
		res.status(500).send('It is not working')
	}
});

module.exports = router;