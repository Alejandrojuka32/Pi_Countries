import { GET_FILTERES_POP, GET_ALL_COUNTRIES, GET_FILTERED_CON, GET_ORDER_NAME, COUNTRY_DETAIL, SEARCH_BAR, CREATE_ACTIVITY, GET_ALL_ACTIVITIES,FILTER_ACTIVITY, ACTIVITIES_COUNTRIES} from "../Actions";

const initialState ={
    countries: [],
    copia: [],
    countryDetail: [],
    activities: [],
    list: []
}
export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                copia : action.payload,
            }
        case GET_FILTERES_POP:
            let countriess = state.countries
           if(action.payload === "asc"){
                countriess.sort(function(a,b){
                if(a.poblacion >= b.poblacion) return 1
                if(a.poblacion <= b.poblacion) return -1
                else return 0
            })
            return{
                ...state,
                countries:[...countriess]
            }
           }
           if(action.payload === "des"){
                countriess.sort(function(a,b){
                if(a.poblacion < b.poblacion) return 1
                if(a.poblacion > b.poblacion) return -1
                else return 0
            })
            return{
                ...state,
                countries:[...countriess]
            }
           }else{
            return{
                ...state,
                countries: state.countries
            }
           }
        
        case GET_FILTERED_CON:
            const allCountries = state.copia
            const countriesFiltered = action.payload === "PorDefecto" ? allCountries : allCountries.filter(c => c.continente === action.payload)
            return{
                ...state,
                countries: countriesFiltered
            }

        case GET_ORDER_NAME:
            const countri = state.countries
            const countriesInOrden = action.payload === "a-z" ? countri.sort((a,b)=>{
                if(a.name < b.name) return -1
                if(a.name > b.name) return 1
                return 0
            }): countri.sort((a,b)=>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            })
            return{
                ...state,
                countries:[...countriesInOrden]
            }
        case COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload          
            }

        case SEARCH_BAR:
            return{
                ...state,
                countries: action.payload
            }
        case CREATE_ACTIVITY:
            return{
                ...state
            }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }
        case FILTER_ACTIVITY:
            const allCities = state.countries
            let coun = []
            const newArray = allCities.map(c =>{
                for(let i = 0; i < c.activities.length; i++){
                    if(c.activities[i].name === action.payload){
                        coun.push(c)
                    }
                }
            })
            return{
                ...state,
                countries: action.payload === "nada" ? allCities : coun
            }
        case ACTIVITIES_COUNTRIES:{
            return{
            ...state,
            list: action.payload
            }
        }
        default: return{
            ...state
        }
    }
}