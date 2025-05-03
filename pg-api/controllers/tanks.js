const {pool} = require('../database/index')

async function tankGetController(req,res){
    try{
        const result = await pool.query("SELECT * FROM tanks")

        return res.status(200).json(result.rows)
    } catch(e){
        return res.status(500).json({success:false, message:e.message})
    }
}

module.exports = {tankGetController}