
const modeloHill = {
    queryGetCars: "SELECT * FROM hill_climb", 
    queryGetCarsByID:`SELECT * FROM hill_climb WHERE ID = ?`,
    queryDeleteByID: `UPDATE hill_climb SET Activo = 'N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = '?'`,
    queryAddCars: `INSERT INTO hill_climb (
        Vehiculo,
        Etapa,
        Mejoras,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?
    ) `,
    queryGetCarsInfo: `SELECT Vehiculo,Etapa,Mejoras,Activo
    FROM hill_climb 
    WHERE Vehiculo = ?
    `,
    queryUpdateByVehiculos: `
    UPDATE hill_climb SET 
       Etapa =?,
       Mejoras = ?,
       Activo =?
    WHERE Vehiculo = ?
    `,

}

module.exports = modeloHill