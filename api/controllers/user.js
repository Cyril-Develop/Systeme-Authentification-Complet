const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

exports.register = (req, res) => {
    const { email, password, lastname, firstname } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new User({
                lastname: lastname,
                firstname: firstname,
                email: email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(401).json({ message: 'Incorrect login/password' });
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({ message: 'Incorrect login/password' });
                    res.status(200).json({
                        userId: user._id,
                        lastname: user.lastname,
                        firstname: user.firstname,
                        token: jwt.sign(
                            { userId: user._id },
                            KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.home = (req, res) => {
    res.status(200).json({ message: 'Welcome to the home page !' });
}