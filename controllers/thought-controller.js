const { User, Thought } = require("../models");


module.exports = {
    // Get thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get one thought by _id
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
            ? res.status(404).json({message: "This thought doesn't exist"})
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },
    
}