import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { countriesActivities, CreateActivities, getAllCountries } from "../Actions";
import { useHistory } from "react-router-dom";
import s from "../ComponentsStyles/CreateActivity.module.css"
import globo from "../images/images__3_-removebg-preview.png"
import { Link } from "react-router-dom";

export default function CreateActivity(){
    const dispatch = useDispatch()
    
    const history = useHistory()

    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(countriesActivities())
    },[dispatch])
    
    const countries = useSelector(state => state.copia)
    const activities = useSelector(state => state.list)

    let activitiesNames = activities.map(a => {return a.name})
    const [input, setinput] = useState({
        name:"",
        dificultad:"",
        duracion: 0,
        temporada: "",
        paises: [],
    })
    const [error, seterror] = useState("")

    function onChange(e){
        e.preventDefault()    
            seterror("")
        setinput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function onSubmit(e){
        e.preventDefault()
        if(error.length > 5 || input.name.length < 2 || input.dificultad === "" || input.duracion < 5 || input.temporada === ""|| input.paises.length < 1){
            alert("Algunos campos son invalidos")
        } 
        else if(activitiesNames.includes(input.name)){
            alert("Ya existe esa actividad")
        }
        else{
            seterror("")
        dispatch(CreateActivities(input))
        setinput({
            name:"",
            dificultad:"",
            duracion: 0,
            temporada: ""
        })
        history.push("/Cards")
        alert("Actividad creada")
      }
    }

    function onChangeName(e){
        e.preventDefault()
        const regExpSoloLetters = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g
        if(!regExpSoloLetters.test(input.name)){
            seterror("Nombre invalido")
            setinput({
                ...input,
                [e.target.name] : e.target.value
            })
        }
        else{
        seterror("")
        setinput({
            ...input,
            [e.target.name] : e.target.value
        })
        }
    }

    function onChangeCountri(e){
        e.preventDefault()
        if(!input.paises.includes(e.target.value)){
        setinput({
            ...input,
            paises: [...input.paises,e.target.value],
        })}
    }

    function onDelete(e){
        e.preventDefault()
        let delte = input.paises.filter(c => c !== e.target.value)
        setinput({
            ...input,
            paises: delte 
        })
    }
    return(
        <div className={s.container}>
            <a href="/" className={s.home}>Home</a>
            <form onSubmit={e => onSubmit(e)} className={s.form}>
                <label className={s.nombre}>Nombre de la actividad</label>
                <input type="text" placeholder="Nombre..." name="name" onChange={e => onChangeName(e)} className={s.input}/>
                {error.length > 4 ? <p className={s.nameError}>{error}</p>:null}
                <br />

                <label className={s.dificultad}>Dificultad</label>
                <select name="dificultad" onChange={e => onChange(e)} className={s.select}>
                    <option value="default" hidden selected>dificultad</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />

                <label className={s.duracion}>Duracion:</label>
                <input type="number" placeholder="en minutos..." name="duracion" onChange={e => onChange(e)} className={s.input}/>
                <br />

                <label className={s.temporada}>Temporada</label>
                <select name="temporada" onChange={e => onChange(e)} className={s.select}>
                <option value="default" hidden selected>temporadas</option>
                <option value="Invierno">Invierno</option>
                <option value="Verano">Verano</option>
                <option value="Primavera">Primavera</option>
                <option value="Otoño">Otoño</option>
                </select>
                <br />

                <label className={s.paises}>Disponible en :</label>
                <select onChange={e => onChangeCountri(e)} className={s.select}>
                    <option value="paises" hidden selected>Selecciones uno o varios paises</option>
                    {
                        countries.length > 0 ? countries.map(c =>
                            <option value={c.name} key={c.ccn3} name={c.name}>{c.name}</option>
                            ) : "No se a podido obtener paises relacionados, porfavor reacargue la pagina"
                    }
                </select>
                <button className={s.boton}>Crear Actividad</button>
            </form>
            <div className={s.containerPaises}>
                <Link to="/Cards">
                <img src={globo} className={s.imgGlobo}/>
                </Link>
                <div className={s.activityName}>
                    <p className={s.p}>{input.name}</p>
                </div>
                <div className={s.tittleDiv}>
                    <h3>Actividad disponible en:</h3>
                </div>
                <div className={s.paisesDiv}>
                    {input.paises? input.paises.map(p =>
                    <div key={p.ccn3} className={s.seleccionadoDiv}>
                        <p><button value={p} onClick={(e) => onDelete(e)} className={s.botonDelete}>X</button> {p} <img src={
                            countries.filter(f => f.name === p)[0].flags
                        } className={s.flags}/></p>
                    </div>
                ): null }
                </div>
            </div>
        </div>
    )
}