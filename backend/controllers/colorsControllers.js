require("dotenv").config();
const logger = require("npmlog");
const { generateError } = require("../helpers");
const { getConnection } = require("../database/db");


const getColorList = async (id) =>{
  const conexion = await getConnection()
  try {
    const [colors] = await conexion.query(`
        select color from colors where lists_id = ?
      `,[id])
    const list = colors.map(color => {
      return color.color
    })
    return list
  } catch (error) {
    logger.error(error)
  }finally{
    if (conexion) conexion.release()
  }
   
}

const insertColor = async (color, id) =>{
  const conexion = await getConnection()
  try {
     await conexion.query(`
      insert into colors (color, lists_id) values (?,?)
    `,
    [color, id]
    )
  } catch (error) {
    logger.error(error)
  }finally{
    if (conexion) conexion.release()
  }
}
const getColors = async (req, res, next) => {
  const conexion = await getConnection()
  try {
   const [listsList] = await conexion.query(' select * from lists')
    if( listsList.length !== 0) {
      for (let i = 0; i< listsList.length; i++){
        listsList[i].colors =  await getColorList(listsList[i].id)
      }      
    }
    res.send(listsList)
  } catch (error) {
    logger.error(error)
    next(error)
  } finally{
    if (conexion) conexion.release()
  }
}

const deleteColors = async (req, res, next) => {
  const {colorsid} = req.params
  const conexion = await getConnection()
  try {
    const [myColor] = await conexion.query(`select * from lists where id = ?`,[colorsid])
    if (myColor.length === 0) throw generateError(400, 'Color no exite')
    await conexion.query(`delete from colors where lists_id = ?`,[colorsid])
    await conexion.query(`delete from lists where id = ?`,[colorsid])
    res.send({message: 'Color borrado'})
    
  } catch (error) {
    logger.error(error)
    next(error)
  }finally{
    if (conexion) conexion.release
  }
}

const createList = async (req, res, next) =>{
  const conexion = await getConnection()
  try {
    const {name, colors} = req.body
    if (colors.length !== 5) throw generateError(400, 'Colores debe ser un arreglo de 5 posiciones') 
    const [{insertId}] = await conexion.query(`
      Insert into lists (name) values (?)
    `,[name])
    colors.forEach(color => {
      insertColor(color, insertId)
  })
    
    res.send({message: 'Lista creada'})
  } catch (error) {
    logger.error(error)
    next(error)
  }finally{
    if (conexion) conexion.release()
  }
}

const updateList = async (req, res, next) => {
  const {listid} = req.params
  const {name, colors} = req.body
  const conexion = await getConnection()
  try {
    await conexion.query(`
      delete from colors where lists_id = ?
    `,[listid])
    for( let  i = 0; i <colors.length; i++){
      await conexion.query(`
        insert into colors (color, lists_id) values (?,?)
      `,[colors[i], listid])
    }
    await conexion.query(
      `
        update lists set name = ?
      `
    ,[name])
    res.send({message: 'lista actualizada'})
  } catch (error) {
    logger.error(error)
    next(error)
  }finally{
    if (conexion) conexion.release()
  }

}
module.exports = {
  getColors,
  deleteColors,
  createList,
  updateList
}