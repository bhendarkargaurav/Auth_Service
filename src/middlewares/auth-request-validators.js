// code to handele client mistakes

const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Somethingwent wrong",
            err: 'Email or password missing in the request'
        })
    } 
    next();
}

module.exports = {
    validateUserAuth
}

