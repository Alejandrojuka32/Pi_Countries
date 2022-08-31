const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Country, Activity,Activities_country} = require("../db")
const axios = require("axios")
const {Op} = require("sequelize")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let id = 538959189
const apiInfo = async () =>{
    const api = await axios.get("https://restcountries.com/v3/all")
    const justapi = await api.data.map(e =>{return{
        ccn3: e.ccn3 ? e.ccn3 : id++ ,
        name: e.name.common,
        flags: e.flags[0],
        continente: e.continents? e.continents[0]: "sin especificar",
        capital: e.capital? e.capital[0] : "sin capital",
        subregion: e.subregion,
        area: e.area,
        poblacion: e.population
    }})

    return justapi
}

router.get("/countries", async (req,res)=>{
    let {name} = req.query
    let api = await apiInfo()
    
    var hay = await Country.findAll()

    if(!hay.length){
        await Country.bulkCreate(api)
    }
    if(!name){
        let base = await Country.findAll({
            include:[{
                model:Activity,
                through:{
                    attributes:[]
                }
            }]
        })
        res.send(base)
    }

    if(name){
        let base = await Country.findAll({
            where:{
                name:{
                    [Op.iLike]: '%' +name+ '%'
                }
            }
        }) 
        res.send(base)
    }
})

router.post("/activities", async(req,res)=>{
    let {name, dificultad,duracion,temporada,paises} = req.body
    let cou = []
    for(let i = 0; i < paises.length; i++){
        cou.push(await Country.findOne({
            where:{
                name: paises[i]
            }
        }))
    }
    let cou2 = cou.map(p => p.ccn3)

    let activity = await Activity.create({
        name:name,
        dificultad:dificultad,
        duracion:duracion,
        temporada:temporada
    })
     
    activity.addCountry(cou2)

    res.send(activity)
})

router.get("/countries/:Id", async (req,res)=>{
    let {Id} = req.params
    let countri = await Country.findOne({
        where:{
            ccn3:{
               [Op.iLike]: '%' + Id + '%'
            }
        }, 
        include:[{
            model:Activity,
            through:{
                attributes:[]
            }
        }]     
    })

    res.send(countri)

})

router.get("/getActivities", async (req,res)=>{
    const allActivities = await Activity.findAll()
    res.send(allActivities)
})
 
router.get("/getCountriesAct", async (req,res)=>{
    const findActivities = await Activity.findAll({
        include:[{
            model: Country,
            through:{
                attributes: []
            }
        }]
    })

    res.send(findActivities)
})
module.exports = router;
