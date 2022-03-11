

const Auth = (req, res, next) =>{

    if(!req.user) return res.status(401).send("Unauthorized. Tenes que estar loggeado.")

    next()

}

module.exports = {Auth}