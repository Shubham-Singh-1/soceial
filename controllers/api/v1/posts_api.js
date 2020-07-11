module.exports.index = (req,res) => {
    return res.json(200, {
        messae : "Lists Of Posts",
        posts: [],
    })
}