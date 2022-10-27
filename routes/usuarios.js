
const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario} = require("../controllers/usuarios")
const router = Router()

//vamos a definir las rutas del localhost 
//http://localhost:4005/api/v1/usuarios
// http://localhost:4005/api/v1/usuarios?id=6

//GET//
router.get("/", getUsers)
router.get("/id/:id", getUserByID)

//DELETE//
router.delete("/", deleteUserByID)

//POST//
router.post("/", addUser)

//put//
router.put("/", updateUserByUsuario)

module.exports = router