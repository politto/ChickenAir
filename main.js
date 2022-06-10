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
            
            let dataInput = JSON.stringify(datafile)
            console.log("setData is acivating and dataInput is " + dataInput)
            //จะนำflightdata จากbooking เข้ามาในนี้เพื่อบันทึกไฟล์ยังไฟล์JSON
            let response = await fetch('chickenAir/components/data.json', {
                method: 'POST',
                body: dataInput
            });
            let responseText = await response.text()
            console.log(responseText)
            window.open("./flightavalible.html")
        }
    },
    created() {
        //this.whichNavBar()
        this.getData();
    }
})
