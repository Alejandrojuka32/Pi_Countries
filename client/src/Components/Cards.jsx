import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries, filterByPopulation, filterByContinent,orderByName, filterByActivity,searchBar} from "../Actions";
import { allActivities } from "../Actions";
import Card from "./Card";
import {  NavLink } from "react-router-dom";
import { useState } from "react";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "../ComponentsStyles/Cards.module.css"
import globo from "../images/images-removebg-preview.png"

export default function Cards(){
    let [paginaActual, setpaginaActual] = useState(1)
    let [paisePorPag, setpaisePorPag] = useState(9)

    const pagina = (numeroPag) =>{
        document.documentElement.scrollTop = 0;
        setpaginaActual(numeroPag)
        paginaActual !== 1 && setpaisePorPag(10)
    }

    let ultPaisPag = paginaActual * paisePorPag
    let PrimerPaisPag = ultPaisPag - paisePorPag
   
    const allCountries = useSelector((state)=> state.countries)
    const Activities = useSelector((state)=> state.activities)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(allActivities())
    },[dispatch])

    const [name, setname] = useState("")

    function onChangeBar(e){
        e.preventDefault()
        setname(e.target.value)
    }
    function onClickBar(e){
        e.preventDefault()
        setpaginaActual(1)
        dispatch(searchBar(name))
    }
    const onChanguePop = (e)=>{
        e.preventDefault()
        dispatch(filterByPopulation(e.target.value))
        setpaginaActual(1)
    }
    
    const onChangueCont = (e)=>{
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
        setpaginaActual(1)
    }

   const onChangueName = (e)=>{
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setpaginaActual(1)
   }
   
   const onChangeAct = (e) =>{
    e.preventDefault()
    dispatch(filterByActivity(e.target.value))
    setpaginaActual(1)
   }
   
   
    let paisesArenderizar = allCountries.slice(PrimerPaisPag,ultPaisPag)

    return(
        <div className={s.fatherDiv}>
            
        <nav className={s.nav}>

        <NavLink to={"/"}>
         <img className={s.imgGlobo} src={globo}/>
         </NavLink>

        <select name="a-z" className={s.select} onChange={(e )=> onChangueName(e)}>
            <option value="Pordef" hidden selected>Nombre</option>
           <option value="a-z" className={s.option}>A-Z</option>
           <option value="z-a" className={s.option}>Z-A</option>
         </select>

         <select name="Poblacion" className={s.select} onChange={(e) => onChanguePop(e)}>
           <option value="default" hidden selected>Poblacion</option>
           <option value="asc" className={s.option}>Menos poblacion</option>
           <option value="des" className={s.option}>Mas Poblacion</option>
         </select>

         <select name="byContinent" className={s.select2} onChange={e => onChangueCont(e)}>
            <option value="PorDefecto" className={s.option}>Continente</option>
            <option value="Africa" className={s.option}>Africa</option>
            <option value="Europe" className={s.option}>Europa</option>
            <option value="Oceania" className={s.option}>Oceania</option>
            <option value="Asia" className={s.option}>Asia</option>
            <option value="North America" className={s.option}>America del Norte</option>
            <option value="South America" className={s.option}>America del sur</option>
        </select>

        <select name="byActivity" className={s.select3} onChange={e => onChangeAct(e)} >
            <option value="nada" className={s.option}>Actividades</option>
            {Activities? Activities.map(a =>
                <option value={a.name} key={a.id} className={s.option}>{a.name}</option>
            ): null}
        </select>

        <SearchBar onChangeBar={onChangeBar} onClickBar={onClickBar}/>

        <a href="/countries/activities/new" className={s.activities}>Crear Actividades</a>

        </nav>
        <div className={s.container}>
            {paisesArenderizar.length > 0 ? paisesArenderizar.map(
                c => <div key={c.ccn3} className={s.cards}>
                <NavLink to = {`/countries/${c.ccn3}`} className={s.link}>
                 <Card imagen={c.flags} nombre={c.name} continente={c.continente} />
                </NavLink>
                </div>
            ):
            <div className={s.loaderContainer}>
                <div className={s.loader}></div>
                <div className={s.loader2}></div>
            </div>
        }
       </div>

       <div className={s.list}>
            <a href="/listactivities" className={s.a4}>Lista de actividades</a>
       </div>
       <Paginado paisePorPag={paisePorPag} countries={allCountries.length} pagina ={pagina}/>
    </div>
    )
}