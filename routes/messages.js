const {Router} = require("express")
const router = Router()

const {
    rootMessage,
    hiMessage, 
    byeMessage,
    postMessage,
    putMessage,
    deleteMessage
} 
    = require('../controllers/messages')

//router.get("", () => {})
router.get('/', rootMessage) //End Point
router.get('/hi', hiMessage) //End Point
router.get('/bye', byeMessage) //End Point

router.post('/', postMessage)
router.put('/', putMessage)
router.delete('/', deleteMessage)

module.exports = router