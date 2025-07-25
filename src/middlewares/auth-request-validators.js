// code to handele client mistakes

const validateUserAuth = (req, res, next) => {
    console.log("body is", req.body.email)
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

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: "something went wrong"
        })
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}

