const { request, response } = require("express");
const pool = require("../db/connection")

const getUsers = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query("SELECT * FROM Usuarios", (error) => {throw new Error(error) })
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
        const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => {throw new Error(error) })
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
        const {affectedRows} = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => {throw new Error(error) })
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
        Contraseña,
        Fecha_Nacimiento = '1900-01-01',
        Activo
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        !Contraseña ||
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
        const user = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)
        if (user) {
            res.status(403).json({msg: `El usuario ${Usuario} ya se encuentra registrada`})
        }
        const {affectedRows} = await conn.query(`INSERT INTO Usuarios (
            Nombre,
             Apellidos,
             Edad,
             Genero,
             Usuario,
             Contraseña,
             Fecha_Nacimiento,
             Activo
        ) VALUES (
            '${Nombre}',
            '${Apellidos}',
            ${Edad},
            '${Genero || ""}',
            '${Usuario}',
            '${Contraseña}',
            '${Fecha_Nacimiento}',
            '${Activo}'
        )
        `, (error) => {throw new Error(error) })
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
        Contraseña,
        Fecha_Nacimiento = '1900-01-01'
    } = req.body
    //estructura basica de cualquier endpoint al conectar en su BD

    if(
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Usuario ||
        !Contraseña 
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
        const [user] = await conn.query(`SELECT Usuario , Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento 
        FROM Usuarios 
        WHERE Usuario = '${Usuario}'
        `)

        if (!user) {
            res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrada`})
            return
        }
        const {affectedRows} = await conn.query(`
        UPDATE Usuarios SET 
           Nombre = '${Nombre || user.Nombre}',
            Apellidos ='${Apellidos || user.Apellidos}',
           Edad = ${Edad || user.Edad},
            Genero ='${Genero || user.Genero}',
            Fecha_Nacimiento ='${Fecha_Nacimiento}'
        WHERE Usuario = '${Usuario}'
        `, (error) => {throw new Error(error) })
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

module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario}