const { validUserToken } = require("../services/userService");

const auth = async (req,res,next) => {
    try {
        const userToken = req.headers.authorization;
        const userTokenIsValid = await validUserToken(userToken);
        if(!userTokenIsValid){
            return res.status(401).send();
        }
        req.user = userTokenIsValid.id;
        next();
    } catch (error) {
        return res.status(401).send();
    }
    
}


module.exports = {
    auth
}