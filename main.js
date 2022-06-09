//I want to create a fake airline website which have ticket reservation system
const app = Vue.createApp({

    data(){
        return {
            chicken : true,
            logo: "./assets/ChickenAirlogo.svg",
            
            enLang: false ,
            wipwup: false ,
            //varile value below willget fron data.json
            //datajsncopy:" test",
            flightSerchData : {}
        }
    },
    
        
    
    methods: {
        //whichNavBar(){
            //if(window.innerHeight<window.innerWidth) this.navbarUnd = false
            //else{this.navbarUnd = true}
            //console.log(" windowinnerheight is " +window.innerHeight + " windowinnerwidth is "+ window.innerWidth + " so navbarUnd = " +this.navbarUnd)
        //},
        async getData(){
            
            let response = await fetch('./components/data.json');
            let jsonData = await response.json();
            this.datajsncopy = jsonData
            console.log(jsonData.user.name)
           
        },
        async setData(datafile){
            let putIntoJson = {
                namefile:{
                    //this.flightSerchData
                }
            }
            let response = await fetch('./components/data.json');

        }
        
    },
    created() {
        //this.whichNavBar()
        this.getData();
    }
})
