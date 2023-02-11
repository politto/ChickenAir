app.component('flight-table',{
    props:{
        
        enLang:{
            type: Boolean,
            required: true
        },
        logo:{
            type: String,
            required: false
        },
        depDate:{
            type: String,
            required: true
        },
        filterDepart:{
            type: String
        },
        filterArrive:{
            type: String
        }

    },
    template:
    /*html*/
    `
    
            
            
            <br>
            <div class="ctblk" style = "background-color :white;">
                <h1 v-if = "enLang">Avalible flight</h1>
                <h1 v-else>เลือกเที่ยวบิน</h1>
            <!----------->
        <!--ใช้ div table เป็นตาราง ที่จะมี div.rowheadข้างบน 
        แล้ว div.roww จะอยู๋แถวที่ถัดลงมา ซึ่งทั้งคู่ก็จะมีdiv.cell อยู่ข้างมน อันเป็น
        ที่ที่แสดงข้อมูลต่างๆ-->
        <!--เราจะใช้วิธีการgetข้อมูลจากไฟล์Json ไปก่อน แล้วค่อยศึกษาการส่งข้อมูลทีหลัง-->
    <!----------->
    <div class="table">
    <div class="rowdate">
        <div class="cellDate"></div>
        <div class="cellDate"></div>
        <div class="cellDate"></div>
        <div class="cellDate"></div>
        <div class="cellDate"></div>
    </div>
    </div>
    <div class="table">
        <div class="rowhead" v-if = "enLang">
            <div class="cell">Flight No.</div>
            <div class="cell">Departure</div>
            <div class="cell">Arrival</div>
            <div class="cell">Economy</div>
            <div class="cell">Bussiness</div>
        </div>
        <div class="rowhead" v-else>
            <div class="cell">เที่ยวบินที่</div>
            <div class="cell">เวลาเครื่องออก</div>
            <div class="cell">เวลาเครื่องไปถึง</div>
            <div class="cell">ชั้นประหยัด</div>
            <div class="cell">ชั้นธุรกิจ</div>
        </div>
                
        <div v-if = "callsign.length===0"> 
            <p v-if = "enLang">Tap/click at "back to home" on the top-left to go to index page.</p>
            <p v-else>เลือกเมนู "กลับหน้าหลัก" ทางซ้ายบนของหน้าเว็บ เพื่อกลับไปยังหน้าเริ่มต้น</p>
        </div>
        <div class = "info">
            <div class = "callsign" >
                <div class = "cell" v-for = "cs in callsign">{{cs}}</div>
            </div>
            <div class = "depTime" >
                <div class = "cell" v-for = "dt in depTime">{{dt}}</div>
            </div>
            <div class = "arrTime" >
                <div class = "cell" v-for = "at in arrTime">{{at}}</div>
            </div>
            <div class = "eco" >
                <div class = "celleco" v-for = "ec in eco">{{ec}}</div>
            </div>
            <div class = "bsn" >
                <div class = "cellbsn" v-for = "bs in bsn">{{bs}}</div>
            </div>
            
            


        </div>

        <!--
        <div class="roww" id = "ahhh" v-for = "flight in flights">
            <div class = "cell">
            {{flight.callsign}}
            </div>
            <div class = "cell">
            {{flight.departTime}}
            </div>
            <div class = "cell">
            {{flight.arriveTime}}
            </div>
            <div class = "celleco">
            {{flight.eco}}
            </div>
            <div class = "cellbsn">
            {{flight.bsn}}
            </div>
        </div>
        -->
        
        
    </div>

                
                
            
    <div>
        <br>
        <br>
        <p v-if = "enLang">*Note: All of these flights are not in reality.</p>
        <p v-else>*หมายเหตุ: เที่ยวบินทั้งหมดไม่มีอยู่จริง</p>
        <br>
    </div>
    
</div>
    `
    ,
    data(){
        return{
            data: {},
            flights: [],
            callsign: [],
            depart: [],
            arrive: [],
            depTime: [],
            arrTime: [],
            eco:[],
            bsn:[],
            date:"",
            selectedFlight: "6556565",
            selectedClass: "",
            cookies: document.cookie,
            // dapDate: "",
            tests: ["a","b"],
            emits: ['setSelectedFlightAndClass']
        }
    }
    ,
    methods : {
        async getData(from,to){
            // to = "HDL"
            // from = "DMK"
            //console.log(from + " " + to)

            //get date

            let get = await  fetch('./components/data.json')
            this.data = await get.json();
            let flightData = this.data.flights
            let raw = flightData
            let fil1 = raw.filter((d)=> d.departure === from)
            let fil2 = fil1.filter((d)=> d.destination === to)
            
            for(i=0;i<fil2.length;i++){
                this.callsign[i] = fil2[i].callsign;
                this.depart[i] = fil2[i].departure;
                this.arrive[i] = fil2[i].destination;
                this.depTime[i] = fil2[i].departTime;
                this.arrTime[i] = fil2[i].arriveTime;
                this.eco[i] = fil2[i].eco;
                this.bsn[i] = fil2[i].bsn;

            }

            
            
            
            //this.flights = fil2
            //return console.log(this.flights[0])
        },
        dateLoad(date){
            console.log(this.depDate)
            if(date===""){
            setTimeout(() => {
                date = this.depDate
                for(let i=0;i<5;i++){
                    document.getElementsByClassName("cellDate")[i].innerHTML = this.calculateDate(date,i-2);
                }
            }, 1000);
            }
            //if(date==="") date = "22/11/2022"
            
            else{
                for(let i=0;i<5;i++){
                    document.getElementsByClassName("cellDate")[i].innerHTML = this.calculateDate(date,i-2);
                }
            }
        },
        calculateDate(date,dateInterval){
            console.log(date)
            let dd = parseInt(date.slice(0,2))
            
            let mm = parseInt(date.slice(3,5))
            
            let yy = parseInt(date.slice(6,10))
            
            let yyyymmdd = yy + "-" + mm + "-"+dd;
            // console.log(this.depDate + "whatttt")
            let dayfull = new Date(yyyymmdd);

            mm = dayfull.getMonth()+1;
            yy = dayfull.getFullYear();
            dd = dayfull.getDate();
            dd = dd + dateInterval;

            //positive change
            
            if(dateInterval>0){
                if(mm == 2){
                    //check if its a year with 366 days
                    if(yy % 4 == 0 && (yy % 100 != 0 || yy % 400 ==0)){
                        //check if date>29
                        if (dd>29){
                            mm ++;
                            dd = 1;
                        }
                        
                    }
                    else{
                        if (dd>28){
                            mm ++;
                            dd = 1;
                        }
                    }

                }
    
                if(mm ==4 || mm ==6 || mm ==9 || mm == 11){
                    if(dd>30){
                        mm ++;
                        dd = 1;
                    }
                }
                else if(dd>31){
                        mm ++;
                        dd = 1;
                        if(mm>12) {
                            yy++
                            mm =1
                        }
                    
                }
            }

            //negative change.
            
            if(dateInterval<0){
                if(mm == 2){
                    //check if its a year with 366 days
                    if(yy % 4 == 0 && (yy % 100 != 0 || yy % 400 ==0)){
                        //check if date>29
                        if (dd<1){
                            mm --;
                            dd = 29 + (dateInterval+1);
                        }
                        
                    }
                    else{
                        if (dd<1){
                            mm --;
                            dd = 28 + (dateInterval+1);
                        }
                    }

                }
    
                if(mm ==4 || mm ==6 || mm ==9 || mm == 11){
                    if(dd<1){
                        mm --;
                        dd = 30 + (dateInterval+1);
                    }
                }
                if(mm == 1){
                    if(dd<1){
                        mm =12;
                        dd = 31;
                        yy--;
                    }
                        
                }
            }
            
            //console.log((dd) +"/"+ mm +"/"+ yy )
            dd+="";
            mm+="";
            yy+="";
            if(dd.length===1) dd = "0" + dd;
            if(mm.length===1) mm = "0" + mm;
            if(yy.length===1) yy = "0" + yy; 
            return (dd) +"/"+ mm +"/"+ yy 
        },
        FlightAndClassSelector(){
            let flight = ""
            let klass = ""
            let ref = this
            // detect clicked element.
            document.addEventListener("click", function(e){
                e = e || window.Event
                let target = e.target
                    text = target.textContent || target.innerText;
                    getIdx = target.getAttribute("idx");
                
                if(target.classList.contains("celleco")){
                    // console.log(text);
                    // console.log(getIdx);
                    ref.setSelectFlightAndclass(getIdx,"eco")
                } 
                if(target.classList.contains("cellbsn")){
                    console.log(text);
                    // console.log(target.getAttribute("idx"));
                    ref.setSelectFlightAndclass(getIdx,"bsn")
                } 
                if(target.classList.contains("cellDate")){
                    console.log(this.date + " " + getIdx)
                    this.date = target.textContent
                    console.log(this.date + "dateee")
                    ref.dateLoad(this.date);
                    

                }            
            }, false);

        },
        setSelectFlightAndclass(flight,klass){
            let ahh = parseInt(flight)
            let price = 0;
            
            this.selectedFlight = this.callsign[flight];
            this.selectedClass = klass;
            // console.log(this.selectedClass)
            // console.log(this.selectedFlight)

            //remove previous active element
            let getOld1 = document.getElementsByClassName("celleco active");
            let getOld2 = document.getElementsByClassName("cellbsn active");
            for(i=0;i<getOld1.length;i++){
                getOld1[i].classList.remove("active")
            }
            for(i=0;i<getOld2.length;i++){
                getOld2[i].classList.remove("active")
            }

            //set active eleent.
            if(klass === "eco") {
                document.getElementsByClassName("celleco")[flight].classList.toggle("active");
                price = document.getElementsByClassName("celleco")[flight].textContent;
            }
            if(klass === "bsn") {
                document.getElementsByClassName("cellbsn")[flight].classList.toggle("active");
                price = document.getElementsByClassName("cellbsn")[flight].textContent;
            }

            let selectedFlightInfo = {
                flight: this.callsign[flight],
                depart: this.depart[flight],
                arrive: this.arrive[flight],
                depTime: this.depTime[flight],
                arrTime: this.arrTime[flight],
                selectedClass: this.selectedClass,
                price:price
            }
            //console.log(selectedflightInfo.price + " <---")
            this.$emit('flight-table',selectedFlightInfo)
        },
        flightAndSeatHandler(event){
            console.log(Array.prototype.indexOf.call(event.currentTarget.children, event.target));
        },
        setIdx(elem){
            let get = document.getElementsByClassName(elem)
            for(i = 0; i< get.length;i++) {
                get[i].setAttribute("idx",i)
            }
        },

    },
    created(){

    },
    mounted(){
        this.dateLoad(this.depDate)
        this.FlightAndClassSelector();
    },
    beforeUpdate(){
        this.getData(this.filterDepart,this.filterArrive)
    },
    updated(){
        //this.loadFlightAndClassSelector();
        
        
        this.setIdx("celleco");
        this.setIdx("cellbsn");
        this.setIdx("cellDate");
    }
})