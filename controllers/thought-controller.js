const { User, Thought, Reaction } = require("../models");


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
    // Create Thought then add to the user's thought array
    createThought(req, res) {
        Thought.create(req.body).then((thought) => {
            User.findOneAndUpdate({username: req.body.username}, { $addToSet: {thoughts: thought._id}}, {new: true})
            .then(thoughtArray => {
                console.log(thoughtArray)
            });
            res.json(thought);
        }).catch((err) => res.status(500).json(err));
    },
    // Update Thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true})
        .then((thought) =>  
            !thought
                ? res.status(404).json({message: "No Thought with this ID"})
                : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },
    // Delete Thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId}).then((thought) => 
            !thought
                ? res.status(404).json({message: "NO thought with this ID"})
                : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },
    // Gets all Reactions 
    getReactions(req, res) {
        Reaction.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Creates a Reaction
    createReaction(req, res) {
        Reaction.create(req.body).then((reaction) => {
            Thought.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {reactions: reaction}},
                {new: true}
            ).then((reactionArray)  => {
                console.log(reactionArray);
            });
            res.json(reaction);
        }).catch((err) => res.status(500).json(err));
    },
    // Delete a Reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $pull: { reactions: { _id: req.params._id } } },
            { new: true }
        ).then((reaction) =>
            !reaction
                ? res.status(404).json({message: "Reaction Has Been Removed"})
                :res.json(reaction)
        ).catch((err) => res.status(500).json(err));
    },
};