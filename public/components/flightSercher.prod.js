app.component('flight-searcher',{
    props:{
        enLang:{
            type: Boolean,
            required: false
        },
        
    },
        
    template:
    /*html*/
    `
    <form class = "flight-searcher" @submit.prevent = "onSubmit">
    <div class="jngtua" id = "jngtua">
    
                    <h3 v-if = "enLang" @click = "konsolelog(this.enLang)"> Let's booking </h3>
                    <h3 v-else @click = "konsolelog(this.enLang)"> จองบัตรโดยสาร</h3>
                    
                    <p>
                    <span v-if = "enLang">Departure :</span>
                    <span v-else>ต้นทาง :</span>
                    <select v-model="departure" @change = "konsolelog(this.departure)">
                        <option value = "" disabled selected>--please select--</option>
                        <option value = "DMK">Bangkok(DMK)</option>
                        <option value = "HDL">Heartland(HDL)</option>
                        <option value = "CNX">Chiang mai(CNX)</option>
                        <option value = "NST">Nakhon si thammarat(NST)</option>
                    </select>
                    </p>
                    <p>  
                    <span v-if = "enLang">Destination:</span>
                    <span v-else>ปลายทาง :</span>
                    <select v-model="destination" @change = "konsolelog(this.destination)" >
                        <option value = "" disabled selected>--please select--</option>
                        <option value = "HDL" v-if ="departure!=='HDL'">Heartland(HDL)</option>
                        <option value = "DMK" v-if ="departure!=='DMK'">Bangkok(DMK)</option>
                        <option value = "CNX" v-if ="departure!=='CNX'">Chiang mai(CNX)</option>
                        <option value = "NST" v-if ="departure!=='NST'">Nakhon si thammarat(NST)</option>
                    </select>
                    </p>
                    
                    <p>
                    <span v-if = "enLang">Depart Date :</span>
                    <span v-else>วันเดินทาง</span>
                    <input type="date" v-model = "departDate" @change = "isNotPast(departDate)">
                    </p>

                    <p>
                    <span v-if = "enLang">Promocode :</span>
                    <span v-else>โค้ดส่วนลด</span>
                    <input type="text" v-model = "userInputCode" @input = "konsolelog(this.userInputCode)">
                    </p>

                    <p>
                    <span v-if = "enLang">Adults :</span>
                    <span v-else>ผู้ใหญ่ :</span>
                    <select id =  "" v-model = "numAdult" @change = "konsolelog(this.numAdult)">
                        <option value = 1>1</option>
                        <option value = 2>2</option>
                        <option value = 3>3</option>
                        <option value = 4>4</option>
                        <option value = 5>5</option>
                    </select></p>

                    <p>
                    <span v-if = "enLang">Children :</span>
                    <span v-else>เด็ก :</span>
                    <select id =  "" v-model = "numChildren" @change = "konsolelog(this.numChildren)">
                    <option v-if = "numAdult" value = 0>0</option>
                        <option v-if = "numAdult" value = 1>1</option>
                        <option v-if = "numAdult" value = 2>2</option>
                        <option v-if = "numAdult" value = 3>3</option>
                        <option v-if = "numAdult" value = 4>4</option>
                        <option v-if = "numAdult" value = 5>5</option>
                    </select></p>
                    <!--เอาบรรทัดล่างไปใส่ด้านว้ายนี้ในอนาคต-->
                    <button type="submit" value = "submit" class="btn btn-dark" v-if = "!enLang">ค้นหาเที่ยวบิน</button>
                    <button type="submit" value = "submit" class="btn btn-dark" v-else >Search for Flights</button>
                    <!--input class="button" type="submit" value="Submit"-->  
                    
                </div>
    </form>
    
    
    `
    ,
    data() {
        return {
            departure: "",
            destination: "",
            departDate: "",
            userInputCode: "",
            discount50:false,
            numAdult:0,
            numChildren:0,

        }
    },
    methods:{
        konsolelog(what){
            console.log(what + typeof what)
        },
        isNotPast(d){
            let date = new Date(d);
            let today =  new Date();
            if(date >= today) return true
            else{
                alert("Date must not in the past. \n วันเดินทางจะต้องไม่เป็นอดีต")
                this.departDate = ""
            }
        },
        onSubmit(){
            
            if( this.departure === "" || this.destination === "" || this.departDate === "" || this.numAdult === 0){
                if(this.enLang){
                    alert("Please fill all of departure, destination, depart date, adults and child field in the Booking form")
                }
                
                else{
                    alert("กรุณากรอกข้อมูลในการจะจองบัตรโดยสารในส่วนของต้นทาง ปลายทาง วันเดินทาง จำนวนเด็กและผู้ใหญ่ให้ครบ")
                }
                return
            }
            if(this.userInputCode ==="abc"){
                    this.discount50 = true
                    console.log(this.discount)
                }
            
            
            //emit filghtserchfilter to main.js andwill send data to JSON there
            
            let flightsearch = {
                departure:this.departure,
                destination:this.destination,
                departDate:this.departDate,
                discount50:this.discount50,
                numAdult:this.numAdult,
                numChildren:this.numChildren,

            }
            console.table(flightsearch)
            console.log("^^flightSearcher")
            this.$emit('flight-searcher',flightsearch)
            
        
        },
        created(){
            
        }
    },
    
})