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
        }
    },
    //METODOS
    methods: {
        //Busqueda
        async doSearch() {
            //Estructura para mostar error con limpiado de caja
            this.result = this.error = null
            try {
                const response = await fetch(API + this.search)
                if (!response.ok) throw new Error("User no fount")
                const data = await response.json()
                console.log(data)
                this.result = data
            } catch (error) {
                this.error = error
            } finally {
                this.search = null
            }
        }
    }
})