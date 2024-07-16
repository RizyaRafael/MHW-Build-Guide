
function errorHandler(error, req, res, next) {
    switch (error.name) {
        case 'EMAIL_PASSWORD_REQUIRED':
            res.status(401).json({
                message: "Email and password needed"
            })
            break;
        case 'USERNAME_REQUIRED':
            res.status(401).json({
                message: "Username needed"
            })
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(401).json({
                message: error.message
            })
            break;
        case 'UNAUTHORIZED':
            res.status(404).json({
                message: 'Invalid email or password'
            })
            break;
        case 'INVALID_TOKEN':
        case 'JsonWebTokenError':
            res.status(404).json({
                message: 'Invalid token'
            })
            break;
        case 'ID_NOT_FOUND':
            res.status(404).json({
                message: 'Id not found'
            })
            break;
        default:
            res.status(500).json({
                message: "Internal server error"
            })
            break;
    }
}

module.exports = errorHandler
