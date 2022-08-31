import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { countriesActivities, getAllCountries } from "../Actions";
import {Link} from "react-router-dom"
import s from "../ComponentsStyles/ActivitiesWithCountries.module.css"

export default function ActivitiesWithCountries(){
    const details = useSelector(state => state.list)
    const Dispatch = useDispatch()

    useEffect(()=>{
        Dispatch(countriesActivities())
    },[])
    return(
        <div className={s.container}>
            <div className={s.tittleDiv}>
                <h1>Lista de actividades</h1>
            </div>

            <div className={s.miniContainer}>
                {
                    details ? details.map(a =>
                        <div className={s.cards}>

                            <div className={s.name}>
                                <h1>{a.name}</h1>
                            </div>

                            <div className={s.disponible}>
                            <div className={s.flagsContainer}>
                                {
                                    a.countries && a.countries.map( c =>
                                        <Link to={`/countries/${c.ccn3}`}>
                                        <div className={s.flag}>
                                            <img src={c.flags} className={s.flags}/>
                                        </div>
                                        </Link>
                                    )
                                }
                            </div>
                            </div>
                                
                            <button className={s.boton}>Agregar Pais</button>
                        </div>

                    ) : null
                }
            </div>
            <div className={s.adiv}>
                <a href="/Cards" className={s.a}>Home</a>
            </div>
        </div>
    )
}