const { User } = require('../models/index')

class UserController {
    static async findAllUser(req, res, next) {
        try {

            let user = await User.findAll()

            res.status(200).json(user)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController