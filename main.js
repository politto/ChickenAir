const app = Vue.createApp({

    data(){
        return {
            chicken : true,
            logo: "./assets/ChickenAirlogo.svg",
            navbarPOS : "",
            enLang: false ,
            wipwup: false ,
            //varile value below willget fron data.json
            //datajsncopy:" test",
            jsonData:"trst"
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
        },
        async getData(fi_le){
            console.log("hhhh")

            const myObj = {kb : "keyboard", mu : "mouse"}
            const farkJSON = JSON.stringify(myObj)
            localStorage.setItem("iyangWa",farkJSON)
            
            let jaaoJSON = localStorage.getItem("iyangWa")
            console.log(jaaoJSON)
            let obj = JSON.parse(Text)
            console.log(obj) 
                
            //const response = await fetch(fi_le);
            //jsonData = await response.json();
            //this.datajsncopy = jsonData
            //console.log(jsonData.user.name)
           
        }
        
    },
    created() {
        
        this.getData('./components/data.json');
    }
})
