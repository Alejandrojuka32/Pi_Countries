import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { countryDetail } from "../Actions";
import s from "../ComponentsStyles/CountryDetail.module.css"

export default function CountryDetail(props){
    let id = props.match.params.Id
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(countryDetail(id))
    },[dispatch])

    const country = useSelector(state => state.countryDetail)
    console.log(country)
    return(
        <div className={s.global}>
            <a href="/Cards" className={s.a}>Home</a>
           {
             country &&
            <div className={s.container}>
                <div className={s.cardDetail} >
            <img src={country.flags} alt="no se pudo obtener la bandera" className={s.bandera} />
            <h1>{country.name}</h1>
            <h2>{country.continente}</h2>
            <h3>{country.subregion}</h3>
            </div>
            
         <div className={s.miniContainer}>
            <div className={s.information}>
            <h3 className={s.capital}>Capital: {country.capital}</h3>
            <h4>Poblacion: Segun ultimos datos registrados, este pais posee una poblacion de {country.poblacion} habitantes</h4>
            <h4>Territorio :Posee un area de {country.area} km2</h4>
            <span>Codigo pais: {country.ccn3}</span>
            </div>

            <div className={s.tittle}>
            <h1>Actividades para hacer en este pais</h1>
            </div>

            <div className={s.activitiesCard}>
            {country.activities? country.activities.map(a => 
                    <div className={s.activities}>
                    <h2 className={s.name}>{a.name}</h2>
                    <h3>Dificultad: {a.dificultad}/5</h3>
                    <h3>Dura {a.duracion} minutos aprox.</h3>
                    <h3>Disponible en {a.temporada}</h3>
                    </div>
                    
                    ): <h1>No se encontraron actividades para hacer en este pais</h1>}  
               </div>
         </div>     
            </div>}       
            
        </div>
    )
}