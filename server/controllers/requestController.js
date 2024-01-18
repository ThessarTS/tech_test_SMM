const { Request, RequestedItem, User, Item, sequelize } = require('../models/index')

class RequestController {
    static async findAllRequest(req, res, next) {
        try {
            let requests = await Request.findAll({
                include: User,
                order: [['createdAt', 'DESC'], ['id', 'DESC']]
            })
            res.status(200).json(requests)
        } catch (error) {
            next(error)
        }
    }

    static async findRequestById(req, res, next) {
        try {
            const { id } = req.params
            let request = await Request.findOne({
                where: { id },
                include: [
                    { model: User },
                    {
                        model: RequestedItem,
                        include: Item
                    }
                ],

            })
            res.status(200).json(request)
        } catch (error) {
            next(error)
        }
    }

    static async addNewRequest(req, res, next) {
        const t = await sequelize.transaction()
        try {
            let { UserId, items } = req.body

            let newRequest = await Request.create({ UserId, status: 'requested' }, { transaction: t })
            items.forEach(item => {
                item.RequestId = newRequest.id
            });
            await RequestedItem.bulkCreate(items, { transaction: t })
            await t.commit()
            res.status(201).json({ message: 'success add new request !' })
        } catch (error) {
            await t.rollback()
            console.log(error);
            next(error)
        }
    }

    static async updateRequest(req, res, next) {
        try {
            const { id } = req.params
            const { status } = req.body
            let request = await Request.findByPk(id)

            if (!request) {
                throw { name: 'notFound' }
            }

            await Request.update({ status }, {
                where: { id }
            })

            if (status === 'approved') {
                let reqItems = await RequestedItem.findAll({ where: { RequestId: id } })

                reqItems.forEach(async (reqItem) => {
                    let item = await Item.findByPk(reqItem.ItemId)
                    let stock = item.stock - reqItem.quantity
                    await item.update({ stock })
                })
            }

            res.status(200).json({ message: 'success update request' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RequestController