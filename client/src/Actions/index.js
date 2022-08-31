import axios from "axios"

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_FILTERES_POP = "GET_FILTERES_POP"
export const GET_FILTERED_CON = "GET_FILTERED_CON"
export const GET_ORDER_NAME = "GET_ORDER_NAME"
export const COUNTRY_DETAIL = "COUNTRY_DETAIL"
export const SEARCH_BAR = "SEARCH_BAR"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES"
export const FILTER_ACTIVITY = "FILTER_ACTIVITY"
export const ACTIVITIES_COUNTRIES = "ACTIVITIES_COUNTRIES"

export const getAllCountries = () => {
    return function(dispatch){
        return axios.get("http://localhost:3002/countries")
        .then(info => info.data)
        .then(data => dispatch({type:GET_ALL_COUNTRIES,payload: data}) )
    }
} 

export const filterByPopulation = (payload) =>{
    return{
        type: GET_FILTERES_POP,
        payload: payload
    }
}

export const filterByContinent = (payload) =>{
    return{
        type: GET_FILTERED_CON,
        payload: payload
    }
}

export const orderByName = (payload) =>{
    return{
        type: GET_ORDER_NAME,
        payload: payload
    }
}

export const countryDetail = (payload) =>{
    return function(dispatch){
        return axios.get(`http://localhost:3002/countries/${payload}`)
        .then(d => d.data)
        .then(data => dispatch({type:COUNTRY_DETAIL,payload: data}))
    }
}

export const searchBar = (name) =>{
    return function(dispatch){
        return axios.get(`http://localhost:3002/countries/?name=${name}`)
        .then(p => p.data)
        .then(data => dispatch({type:SEARCH_BAR, payload:data}))
    }
}

export const CreateActivities = (payload) =>{
    return function(dispatch){
        return  axios.post(`http://localhost:3002/activities`,payload)
        .then(e => dispatch({type:CREATE_ACTIVITY, payload: payload}))
    }
}

export const allActivities = () =>{
    return function(dispatch){
        return axios.get("http://localhost:3002/getActivities")
        .then(info => info.data)
        .then(data => dispatch({type:GET_ALL_ACTIVITIES, payload:data}))
    }
}

export const filterByActivity = (payload)=>{
    return {
        type: FILTER_ACTIVITY,
        payload: payload
    }
}

export const countriesActivities = () =>{
    return function(dispatch){
        return axios.get("http://localhost:3002/getCountriesAct")
        .then(info => info.data)
        .then(data => dispatch({type:ACTIVITIES_COUNTRIES, payload: data}))
    }
}
