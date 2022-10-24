
const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID} = require("../controllers/usuarios")
const router = Router()

//vamos a definir las rutas del localhost http://localhost:4005/api/v1/usuarios
// http://localhost:4005/api/v1/usuarios?id=6

router.get("/", getUsers)
router.get("/id/:id", getUserByID)
router.delete("/", deleteUserByID)

module.exports = router