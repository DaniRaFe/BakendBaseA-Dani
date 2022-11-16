const { request, response } = require("express");
const pool = require("../db/connection")
const bcryptjs= require("bcryptjs");
const modeloHill= require("../models/hillclimb");
const getCars = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const Racing = await conn.query(modeloHill.queryGetCars, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Racing) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({Racing})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}




const getCarsByID = async (req = request, res = response) =>{
    const {id} = req.params
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [Racing] = await conn.query(modeloHill.queryGetCarsByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!Racing) {
            res.status(404).json({msg:`no se encontro registro con el ID ${id}`})
            return
        }
        res.json({Racing})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteCarsByID = async (req = request, res = response) =>{
    const {id} = req.query
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const {affectedRows} = await conn.query(modeloHill.queryDeleteByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg: `El Vehiculo con id ${id} se elimino correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addCars = async (req = request, res = response) =>{
    const {
       Vehiculo,
       Etapa,
       Mejoras,
       Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Vehiculo ||
        !Etapa ||
        !Mejoras ||
        !Activo 
        ) {
            res.status(400).json({msg: "Falta informacion del Vehiculo"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Racing] = await conn.query(modeloHill.queryUserExists, [Vehiculo])
        if (Racing) {
            res.status(403).json({msg: `El vehiculo ${Vehiculo} ya se encuentra registrada`})
            return
        }
        const salt = bcryptjs.genSaltSync()
        const {affectedRows} = await conn.query(modeloHill.queryAddCars, [
            Vehiculo,
            Etapa,
            Mejoras,
            Activo
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo agregar el registro del vehiculo ${Vehiculo}`})
            return
        }
        res.json({msg: `El vehiculo ${Vehiculo} se agrego correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateCarsByUsuario = async (req = request, res = response) =>{
    const {
        Vehiculo,
       Etapa,
       Mejoras,
       Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Vehiculo
        ) {
            res.status(400).json({msg: "Falta informacion del Vehiculo"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [Racing] = await conn.query(modeloHill.queryGetCarsInfo,[Vehiculo])

        if (!Racing) {
            res.status(403).json({msg: `El Vehiculo ${Vehiculo} no se encuentra registrada`})
            return
        }
        const {affectedRows} = await conn.query(modeloHill.queryUpdateByVehiculos, [ 
            Etapa|| Racing.Etapa,
            Mejoras|| Racing.Mejoras,
            Activo|| Racing.Activo,
            Vehiculo
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del vehiculo ${Vehiculo}`})
            return
        }
        res.json({msg: `El vehiculo ${Vehiculo} se actualizo correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports = {getCars, getCarsByID, deleteCarsByID, addCars, updateCarsByUsuario}