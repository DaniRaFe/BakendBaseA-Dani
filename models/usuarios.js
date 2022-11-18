
const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios", 
    queryGetUserByID:`SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = ?`,
    queryAddUser: `INSERT INTO Usuarios (
        Nombre,
         Apellidos,
         Edad,
         Genero,
         Usuario,
         Contraseña,
         Fecha_Nacimiento,
         Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    ) `,
    queryGetUserInfo: `SELECT Usuario , Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento 
    FROM Usuarios 
    WHERE Usuario = ?
    `,
    queryUpdateByUsuarios: `
    UPDATE Usuarios SET 
       Nombre = ?,
        Apellidos = ?,
       Edad = ?,
        Genero = ?,
        Fecha_Nacimiento = ?
    WHERE Usuario = ?
    `,
    querySingin: `SELECT Usuario, Contraseña, Activo FROM Usuarios WHERE Usuario = ?`,

}

const updateUsuario =(
    Nombre,
    Apellidos,
    Edad,
    Genero,
    Fecha_Nacimiento,
    Usuario
    ) => {
        return `
        UPDATE Usuarios SET 
           Nombre = '${Nombre}',
           Apellidos ='${Apellidos}',
           Edad = ${Edad},
           ${Genero ? `Genero ='${Genero}',` : ''}
           Fecha_Nacimiento ='${Fecha_Nacimiento}'
        WHERE Usuario = '${Usuario}'
        `
    }

module.exports = {modeloUsuarios, updateUsuario}