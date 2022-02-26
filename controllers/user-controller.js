const { User, Thought } = require("../models");

module.exports = {
    //Get all Users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Single User Get 
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId
        }).then((user) => 
        !user
            ? res.status(404).json({message: "This ID doesn't exist"})
            : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    // Create new User
    createUser(req, res) {
        User.create(req.body).then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true})
        .then((user) => 
            !user
                ? res.status(404).json({message: "No user with this ID!"})
                : res.json(course)
        ).catch((err) => res.status(500).json(err));
    },
}