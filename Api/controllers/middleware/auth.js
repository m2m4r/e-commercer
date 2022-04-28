
const Auth = (req, res, next) =>{
    
    if(!req.user) return res.status(401).send("Unauthorized. Tenes que estar loggeado.")

    next()


}

const AuthAdmin = (req, res, next) =>{

    if(req.user.permiso !== 'admin') return res.status(401).send("Unauthorized. No sos un administrador.")

    next()
}

module.exports = {Auth, AuthAdmin}