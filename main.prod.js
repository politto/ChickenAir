//I want to create a fake airline website which have ticket reservation system
const app = Vue.createApp({
    
    data(){
        return {
            chicken : true,
            logo: "./assets/ChickenAirlogo.svg",
            enLang: true ,
            wipwup: false ,
            flights: {},
            cookies: document.cookie,
            selectedFlightInfo:{},
            name:"",
            promoCode: "abc",
            depart:"",
            arrive:"",
            depDate: "",
            discnt:false,
            depTime: "Which time will be?",
            arrTime: "Select flight first!",
            numAdult:0,
            numChildren:0,
            ticketFee: 0,
            airportFee: 49.08,
            deluxeBaggage: false,
            vatseven: 0.00,
            summary: 0,
            today:new Date().getFullYear(),
            
            
        }
    },
    
        
    
    methods: {
        
        async getJson(){
            
            let response = await fetch('./components/data.json');
            const jsonData = await response.json();

            this.flights = jsonData.flights

           
        },
        async setData(datafile){
            // NOT USED FUNCTION

            //let dataInput = JSON.stringify(datafile)
            let dataInput = {"name":"john"}
            
            //console.log("setData is acivating and dataInput is " + dataInput)
            //จะนำflightdata จากbooking เข้ามาในนี้เพื่อบันทึกไฟล์ยังไฟล์JSON
            let response = await fetch('api/components/data.json', {
                headers: {
                    "Content-type":"application/json; charset = UTF-8",
                    'Accept': 'application/json'
                  },
                method: 'POST',
                body: dataInput
            });
            let responseText = await response.text()
            //console.log(responseText)
            
            window.open("./flightavalible.html")
        },
        recieveFlightSearchFil(flightsearch){
            
            this.depart = flightsearch.departure;
            this.arrive = flightsearch.destination;
            this.depDate = flightsearch.departDate;
            this.discnt = flightsearch.discount50;
            this.numAdult = flightsearch.numAdult;
            this.numChildren = flightsearch.numChildren;
            depArrDateDis = this.depart+ "+" +this.arrive+ "+" +this.depDate+ "+" + this.discnt + "+" + this.numAdult + "+" + this.numChildren;
            this.setSearchCookies(depArrDateDis);
            window.open("flightavalible.html");
            window.close();
        
        },
        setSearchCookies(cvalue){

            //this function get called when emitted from flightSearcher

            //console.log("Cookie is " + document.cookie)
            //document.cookie = cname + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            //cookie about have set expire date to  past in order to delete this cookies immiediatly
            //document.cookie =  `${key}=${value}`
            
            let date = new Date();
            //console.log(date);
            date.setMinutes(date.getMinutes()+1);
            //console.log(date);
            testCookie = `Flight info = ${cvalue}; expires = ${date}; path=/; `
            // document.cookie = `Flight_info = ${cvalue}; expires = ${date}; path=/; `
            document.cookie = `${cvalue}; expires = ${date}; path=/; `
            //console.log("testCookie : " + testCookie);
            //console.log("cookie now is = " + document.cookie);
        },
        navbarRed(){
            let navbar = document.querySelector(".navbar")
            let barncross = document.querySelector(".barncross")
            let navbarli = document.querySelectorAll(".navbar li")
            if(barncross != null){
                barncross.addEventListener("click", ()=> {
                    barncross.classList.toggle("active");
                    navbar.classList.toggle("active");    
                })
    
                navbarli.forEach(n => n.addEventListener("click", () =>{
                    barncross.classList.remove("active");
                    navbar.classList.remove("active");  
                }))
            }
            //มาต่อJs animation function
        },
        dropdownPrice(){
            let button = document.querySelector(".summaryPriceHead");
            let extend = document.querySelector(".extendSummaryHead");
        
            if(button!=null){
                button.addEventListener("click", ()=>{
                    button.classList.toggle("active");
                    extend.classList.toggle("active");
                })
            }
            
        },
        loadSearchCookies(){
            let ckarr = document.cookie.split("+");

            this.depart = ckarr[0];
            //console.log("depart " +this.depart)
            // if(this.depart===undefined || this.depart==="") this.depart = "DMK";

            this.arrive = ckarr[1];
            //console.log("arrive " +this.arrive)
            // if(this.arrive===undefined || this.arrive==="") this.arrive = "HDL";

            this.depDate = ckarr[2]
            let ddmmyyyy=""
            let dd="",mm="",yy=""
            //If no cookies. vvv
            if(this.depDate===undefined) {
                this.depDate = new Date().toLocaleDateString()
                //console.log(this.depDate)
                //Switch to ddmmyyyy format.
                // dd = this.depDate.slice(3,5)
                // mm = this.depDate.slice(0,2)
                // yy = this.depDate.slice(6,10)
                // ddmmyyyy = dd + "-" + mm + "-"+yy;
                let dateArray = this.depDate.split("/");
                dd = dateArray[1]
                mm = dateArray[0]
                yy = dateArray[2]
                if(dd.length===1) dd = "0" + dd
                if(mm.length===1) mm = "0" + mm
                ddmmyyyy = dd + "-" + mm + "-"+yy;
                //console.log(ddmmyyyy)
            }
            else{
                ddmmyyyy = this.depDate
                dd = this.depDate.slice(8,10)
                mm = this.depDate.slice(5,7)
                yy = this.depDate.slice(0,4)
                ddmmyyyy = dd + "-" + mm + "-"+yy;
                
            } 
            this.depDate = ddmmyyyy ;

            this.discnt = ckarr[3];
            this.numAdult = ckarr[4];
            if(this.numAdult===undefined) this.numAdult=1;
            this.numChildren = ckarr[5];
            if(this.numChildren===undefined) this.numChildren=0;

            document.cookie = document.cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //dep.value = ckarr[0];
            //arri.value = ckarr[1];
            //depDate.value = ckarr[2];
            // dep.value = "DMK";
            // arri.value = "HLD";
            // depDate.value = "2022-11-11";
            //console.log("cookies : " + ckarr)
        },
        calcPrice(selectedFlightInfo){
            // console.log(selectedFlightInfo.flight)
            this.selectedFlightInfo = selectedFlightInfo;
            this.ticketFee = parseFloat(selectedFlightInfo.price)
            if(isNaN(this.ticketFee)) this.ticketFee=0;
            this.depTime = selectedFlightInfo.depTime
            this.arrTime = selectedFlightInfo.arrTime
            let delux =(this.deluxeBaggage? 100 : 0)
            //console.log("delux :" + delux)
            this.vatseven = parseInt(((this.ticketFee + this.airportFee + delux)*0.07).toFixed(2));
            
            this.summary = (this.ticketFee + this.airportFee + delux +  this.vatseven).toFixed(2)
            // console.log(this.vatseven+" "+this.summary)
            // console.log(typeof this.ticketFee)
            // console.log(typeof this.airportFee)
            // console.log(typeof delux)
            // console.log(typeof this.vatseven)

        },
        onPressNext(){
            console.log(this.depTime + this.depDate)
            if(this.depTime==="Which time will be?" || this.selectedFlightInfo.flight===undefined) return alert("Select flight first \n กรุณาเลือกเที่ยวบินก่อน");
            const bookingInfo = {
                flight: this.selectedFlightInfo.flight,
                klass:this.selectedFlightInfo.selectedClass,
                depDate: this.depDate,
                depart: this.depart,
                arrive: this.arrive,
                depTime: this.depTime,
                arrTime: this.arrTime,
                ticketFee: this.ticketFee,
                airportFee: this.airportFee,
                deluxeBaggage: (this.deluxeBaggage? 100 : 0),
                vat7: this.vatseven,
                totalPrice: this. summary,
                numAdult: this.numAdult,
                numChildren: this.numChildren,
            }

            let bookinginfoStr = JSON.stringify(bookingInfo);
            //console.log(bookinginfoStr) 
            document.cookie = bookinginfoStr;
            window.open("./passengerInfo.html")
        },
        closeCK(){
            document.getElementsByClassName("cknotice")[0].remove()
        }

    },
    computed:{

    },
    created() {
        this.getJson();
    },
    mounted(){
        this.navbarRed();
        this.dropdownPrice();
        this.loadSearchCookies();

    },
    updated(){
        //this.calcPrice(this.selectedFlightInfo)
    }

})
