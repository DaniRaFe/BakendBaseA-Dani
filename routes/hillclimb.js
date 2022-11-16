
const {Router} = require("express")
const {getCars, getCarsByID, deleteCarsByID, addCars, updateCarsByUsuario} = require("../controllers/hillclimb")
const router = Router()

//vamos a definir las rutas del localhost 
//http://localhost:4005/api/v1/hillclimb
// http://localhost:4005/api/v1/hillclimb?id=3

//GET//
router.get("/", getCars)
router.get("/id/:id", getCarsByID)

//DELETE//
router.delete("/", deleteCarsByID)

//POST//
router.post("/", addCars)

//put//
router.put("/", updateCarsByUsuario)




module.exports = router