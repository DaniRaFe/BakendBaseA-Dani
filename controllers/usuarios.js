const { request, response } = require("express");
const pool = require("../db/connection")
const bcryptjs= require("bcryptjs");
const {modeloUsuarios, updateUsuario} = require("../models/usuarios");
const getUsers = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modeloUsuarios, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!users) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({users})
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




const getUserByID = async (req = request, res = response) =>{
    const {id} = req.params
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modeloUsuarios.queryGetUserByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!user) {
            res.status(404).json({msg:`no se encontro registro con el ID ${id}`})
            return
        }
        res.json({user})
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

const deleteUserByID = async (req = request, res = response) =>{
    const {id} = req.query
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const {affectedRows} = await conn.query(modeloUsuarios.queryDeleteByID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el ID ${id}`})
            return
        }
        res.json({msg: `El usuario con id ${id} se elimino correctamente.`})
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

const addUser = async (req = request, res = response) =>{
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario,
        Contrase??a,
        Fecha_Nacimiento = '1900-01-01',
        Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        !Contrase??a ||
        !Activo
        ) {
            res.status(400).json({msg: "Falta informacion del usuario"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [user] = await conn.query(modeloUsuarios.queryUserExists, [Usuario])
        if (user) {
            res.status(403).json({msg: `El usuario ${Usuario} ya se encuentra registrada`})
            return
        }
        const salt = bcryptjs.genSaltSync()
        const Contrase??aCifrada = bcryptjs.hashSync(Contrase??a,salt)
        const {affectedRows} = await conn.query(modeloUsuarios.queryAddUser, [
            Nombre,
            Apellidos,
            Edad,
            Genero || '',
            Usuario,
            Contrase??aCifrada,
            Fecha_Nacimiento,
            Activo
        ], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`no se pudo agregar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg: `El usuario ${Usuario} se agrego correctamente.`})
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

const updateUserByUsuario = async (req = request, res = response) =>{
    const {
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Usuario,
        Contrase??a,
        Fecha_Nacimiento = '1900-01-01'
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario 
        ) {
            res.status(400).json({msg: "Falta informacion del usuario"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Usuario])

        if (!user) {
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrada`})
            return
        }
        const {affectedRows} = await conn.query(updateUsuario(
            Nombre,
            Apellidos,
            Edad,
            Genero,
            Fecha_Nacimiento,
            Usuario
        ), (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados

       if (affectedRows ===0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del usuario ${Usuario}`})
            return
        }
        res.json({msg: `El usuario ${Usuario} se actualizo correctamente.`})
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

const signIn = async (req = request, res = response) =>{
    const {
        Usuario,
        Contrase??a
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Usuario ||
        !Contrase??a
        ) {
            res.status(400).json({msg: "Falta informacion del usuario"})
            return
    }
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        //TAREA como hacer que el usuario no se duplique
        const [user] = await conn.query(modeloUsuarios.querySingin, [Usuario])
        if (!user ||user.Activo === 'N') {
            let code = !user? 1 : 2;
            res.status(403).json({msg: `El usuario o la Contrase??a son incorrectos.`, errorCode: code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrase??a, user.Contrase??a)

        if (!accesoValido) {
            res.status(403).json({msg: `El usuario o la Contrase??a son incorrectos.`, errorCode: 3})
            return
        }
       

        res.json({msg: `El usuario ${Usuario} ha iniciado sesion satisfactoriamente.`})
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

const newPassword = async (req = request, res = response) => {
    const {
        Usuario,
        AcContrase??a,
        NueContrase??a
    } = req.body
    if (
        !Usuario||
        !AcContrase??a||
        !NueContrase??a
    ) {
        res.status(400).json({msg:"Falta informacion"})
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query (`SELECT Usuario, Contrase??a, Activo FROM Usuarios WHERE Usuario = '${Usuario}'`)

        if (!user || user.Activo == 'N') {
            let code = !user.Activo ? 1 : 2;
            res.status(403).json({msg: `El usuario o la Contrase??a son incorrectos`, errorCode:code})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const Contrase??aCifrada = bcryptjs.hashSync(NueContrase??a, salt)
        const {affectedRows} = await conn.query(`
        UPDATE usuarios SET
        Contrase??a = '${Contrase??aCifrada}'
        WHERE Usuario = '${Usuario}'
        `, (error) => {throw new error})

        if(affectedRows === 0) {
            res.status(404).json ({msg: `No se pudo actualizar la Contrase??a de ${Usuario}`})
            return
        }

        res.json({msg: `La Contrase??a de ${Usuario} se actualizo sastifactoriamente`})
    } 
    catch(error) {
        console.log(error)
        res.status(500).json ({error})
    }

    finally {
        if(conn) {
            conn.end()
        }
    }
}


module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario, signIn, newPassword}