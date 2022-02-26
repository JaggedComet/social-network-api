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

}