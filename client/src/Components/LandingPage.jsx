import React from "react";
import {Link} from "react-router-dom"
import s from "../ComponentsStyles/LandingPage.module.css"
import globo from "../images/images-removebg-preview.png"
import ski from "../images/images__4_-removebg-preview.png"

export default function LandingPage(){
    return(
        <div className={s.container}>
            <div className={s.inicio}>
                <img src={globo} className={s.imageGlobo}/>
                <div className={s.tittleDiv}>
                <h1 className={s.tittle}>COUNTRIES APP</h1>
                </div>
                <div className={s.texto}>
                <p className={s.p}>Encuentra actividades turisticas y lugares iconicos a lo largo de todos los paises del mundo</p>
                </div>
            <Link to = "/Cards">
                <button className={s.boton}>Ingresar</button>
            </Link>
            </div>
            <div className={s.ski}>
            <div>
                <img src={ski} className={s.imgSki} />
                <div className={s.activitiesDiv}>
                    <h1 className={s.activities}>CREAR ACTIVIDADES</h1>
                </div>
                <div className={s.activitiesTextDiv}>
                    <p className={s.activitiesText}>Crea actividades para ayudar a los turistas a conocer un pais en particular</p>
                </div>
                <Link to="/countries/activities/new">
                  <button className={s.botonActivities}>Crear actividad</button>
                </Link>
            </div>
            </div>
        </div>
    )
}