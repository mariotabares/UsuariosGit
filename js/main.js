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
    //FUNCIONES COMPUTADAS
    computed: {
        //Funcion para mostrar el resultado de la busqueda
        isFavorite() {
            return this.favorites.has(this.result && this.result.id)
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
        },
        removeFavorite(){
            this.favorites.delete(this.result.id)
        }
    }
})