const {Router} = require('express')
const {levelGetController} = require('../controllers/levels')
const {tankGetController} = require('../controllers/tanks')

function levelsRouter(router){
    router.get('/tanks',tankGetController)
}
function tanksRouter(router){
    router.get('/levels',levelGetController)
}

function mainRouter(){
    const router = Router()
    
    levelsRouter(router)
    tanksRouter(router)
}

module.exports = {mainRouter}