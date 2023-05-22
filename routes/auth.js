const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	try {
		const savedUser = await newUser.save()
		res.status(200).send(savedUser)
	} catch (error) {
		res.status(500).send(error)
		console.log(error)
	}
});

//LOGIN

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(401).json("Wrong credentials!");

		const originalPassword = user.password

		if (originalPassword !== req.body.password) {
			res.status(401).json("Wrong credentials!");
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);


		const { password, ...others } = user._doc;
		res.status(200).json({ ...others, accessToken });

	} catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;