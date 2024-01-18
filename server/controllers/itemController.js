const { Item } = require('../models/index')

class ItemController {
    static async findAllItem(req, res, next) {
        try {
            let items = await Item.findAll({
                order: [['id', 'ASC']]
            })

            res.status(200).json(items)

        } catch (error) {
            next(error)
        }
    }

    static async findItemById(req, res, next) {
        try {
            const { id } = req.params
            let item = await Item.findByPk(id)

            if (!item) {
                throw { name: 'notFound' }
            }

            res.status(200).json(item)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = ItemController