const rootMessage = (req, res) => {res.send("Messages")}

const hiMessage = (req, res) => {res.send("Hola Mundo")}

const byeMessage = (req, res) => {res.send("Adios Mundo")}

const postMessage = (req, res) => {res.send("Mensaje POST")}

const putMessage = (req, res) => {res.send("Mensaje PUT")}

const deleteMessage = (req, res) => {res.send("Mensaje DELETE")}

module.exports  = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage}
