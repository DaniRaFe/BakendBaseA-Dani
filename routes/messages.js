const {Router} = require("express")
const router = Router()
const {
    rootMessage,
    hiMessage, 
    byeMessage} 
    = require('../controllers/messages')

//router.get("", () => {})
router.get('/', rootMessage) //End Point
router.get('/hi', hiMessage) //End Point
router.get('/bye', byeMessage) //End Point

module.exports = router