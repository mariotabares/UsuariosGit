//El endpoint de la API de GitHub es https://api.github.com/users/

const API = "https://api.github.com/users/";


//INTANCIA DE VUE SIN HERRAMIENTA DE EMPAQUETADO
//ESTRUCTURA
const app = Vue.createApp({
    //funcion de valores
    data() {
        return {
            search: null,
            result: null,
            error: null,
            favorites: new Map()
        }
    },
    //FUNCIONES DE CICLO DE VIDA
    //Funcion para cargar los datos del local storage
    created(){
        const savedFavorites = JSON.parse(window.localStorage.getItem("favorites"))
        if(savedFavorites.length){
            const favorites= new Map(savedFavorites.map(favorite=>[favorite.id,favorite]))
            this.favorites=favorites
        }
        
    },
    //FUNCIONES COMPUTADAS
    computed: {
        //Funcion para mostrar el resultado de la busqueda
        isFavorite() {
            return this.favorites.has(this.result && this.result.id)
        }
        ,
        //Funcion para mostrar los favoritos
        allFavorites() {
            return Array.from(this.favorites.values())
        }
    },
    //METODOS
    // En vue los metodos deben ir dentro de la funcion 
    methods: {
        //Busqueda
        async doSearch() {
            //Estructura para mostar error con limpiado de caja
            this.result = this.error = null
            try {
                //Estructura para mostrar la informacion formato JSON
                const response = await fetch(API + this.search)
                if (!response.ok) throw new Error("User no fount")
                //Descomprime el JSON
                const data = await response.json()
                console.log(data)
                this.result = data

            } catch (error) {
                this.error = error
            } finally {
                this.search = null
            }
        },
        addFavorite(){
            this.favorites.set(this.result.id,this.result)
            this.updateStorage()
        },
        removeFavorite(){
            this.favorites.delete(this.result.id)
            this.updateStorage()
        },
        //mostrar favoritos ya guardados 
        showFavorite(favorite){
            this.result=favorite
        },
        // funcion persistencia de datos en el local storage
        updateStorage(){
            window.localStorage.setItem("favorites",JSON.stringify(this.allFavorites))
        }
    }
})