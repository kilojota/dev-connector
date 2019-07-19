const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
// @route  GET api/auth
// @desc   Test route
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // with select and -password we are removing the password from the selection.
        // Remember that the id from req.user.id is passed in from the decoded.user in the middleware authorization (verifying it with jwt.verify).
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
}); // By setting the second parameter as auth, we are setting it as protected

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public

router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // As this returns promise, async before.
        const errors = validationResult(req); // Goes with 'check'
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body; // Destructuring req.body into separate variables

        try {
            // See if user exists
            let user = await User.findOne({ email }); // Using mongoose user model. Finding it by the email

            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid credentials.' }]
                });
            }

            const isMatch = await bcrypt.compare(password, user.password); // Comparing the not encrypted password passed in the req.body to the one encrypted attached to the user's from the database.
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid credentials.' }]
                });
            }
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
