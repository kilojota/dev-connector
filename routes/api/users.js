const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with six or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        // As this returns promise, async before.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body; // Destructuring req.body into separate variables

        try {
            // See if user exists
            let user = await User.findOne({ email }); // Using mongoose user model. Finding it by the email
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }]
                });
            }
            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200', // size
                r: 'pg', // no naked ppl
                d: 'mm' // Default if no gravatar
            });

            // Creating new instance of user
            user = new User({
                name,
                email,
                avatar,
                password
            });
            // Encrypt password
            const salt = await bcrypt.genSalt(10); // Setting the encrypting engine, it is an await func because it uses bcrypt website to get the salt value. 10 is the recommended amount, more takes more time.
            user.password = await bcrypt.hash(password, salt); // Encrypting it

            await user.save(); // Gives us a promise

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000 // 3600 an hour
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error.');
        }
    }
);

module.exports = router;
