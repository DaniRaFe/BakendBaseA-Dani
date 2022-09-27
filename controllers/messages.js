const { request, response } = require("express")

const rootMessage = (req=request, res=response) => {res.status(404).json({msg:"Messages"})}

const hiMessage = (req=request, res=response) => {res.status(405).json({msg:"Hola Mundo"})}

const byeMessage = (req=request, res=response) => {res.status(418).json({msg:"Adios Mundo"})}

const postMessage = (req=request, res=response) => {res.status(400).json({msg:"Mensaje POST"})}

const putMessage = (req=request, res=response) => {res.status(407).json({msg:"Mensaje PUT"})}

const deleteMessage = (req=request, res=response) => {res.status(411).json({msg:"Mensaje DELETE"})}

module.exports  = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage}
