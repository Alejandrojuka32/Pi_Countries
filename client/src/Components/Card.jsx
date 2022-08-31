import React from "react";
import s from "../ComponentsStyles/Card.module.css"

export default function Card({imagen, nombre, continente}){
    return(
        <div className={s.card}>
            
         <div className={s.divimg}>
        <img className={s.imgCard} src={imagen} alt="No se pudo encontrar la bandera"/>
        </div>

        <div className={s.text}>
        <h1 className={s.nameCard}>{nombre}</h1>
        <h2>{continente}</h2>
        </div>

        </div>
    )
}