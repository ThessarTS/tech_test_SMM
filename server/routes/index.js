const ItemController = require('../controllers/itemController')
const RequestController = require('../controllers/requestController')
const UserController = require('../controllers/userController')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/users/', UserController.findAllUser)

router.get('/items', ItemController.findAllItem)
router.get('/items/:id', ItemController.findItemById)

router.get('/requests', RequestController.findAllRequest)
router.get('/requests/:id', RequestController.findRequestById)
router.post('/requests', RequestController.addNewRequest)
router.patch('/requests/:id', RequestController.updateRequest)

module.exports = router