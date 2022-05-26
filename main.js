const app = Vue.createApp({

    data(){
        return {
            chicken : true,
            logo: "ChickenAirlogo.svg",
            navbarPOS : "",
            name:" test "
        }
    },
    beforeMount(){
        this.whichNavBar()
    },
    methods: {
        whichNavBar(){
            if(window.innerHeight<window.innerWidth) navbarPOS = 'under'
            else{navbarPOS = 'side'}
            console.log(navbarPOS)
        }
    }
})
