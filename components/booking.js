app.component('booking-form',{
    props:{
        enLang:{
            type: Boolean,
            required: false
        },
        
    },
        
    template:
    /*html*/
    `
    <form class = "booking-form" @submit.prevent = "onSubmit">
    <div class="jngtua" id = "jngtua">
                    <h3 v-if = "enLang" @click = "konsolelog(this.enLang)"> Let's booking </h3>
                    <h3 v-else @click = "konsolelog(this.enLang)"> จองบัตรโดยสาร</h3>
                    
                    <label for="departFrom">Depart from:</label>
                    <select  id = "departure" v-model="departure" @change = "konsolelog(this.departure)">
                        <option>--please select--</option>
                        <option value = "DMK">Bangkok(DMG)</option>
                    </select>
                    <label for="destination"> To: </label>
                    <select  id = "destination" v-model="destination" @change = "konsolelog(this.destination)">
                        <option >--please select--</option>
                        <option value = "HLD">Heartland(HLD)</option>
                    </select>
                    <br>
                    <p></p>
                    <label for="departDate" >Depart Date:</label>
                    <input type="date" name="date" id="departDate" v-model = "departDate" @change = "konsolelog(this.departDate)">

                    <label for="psw" >Promocode:</label>
                    <input type="text" name="psw" id="promoCode" v-model = "userInputCode" @input = "konsolelog(this.userInputCode)">
                    <br><br>
                    <!--เอาบรรทัดล่างไปใส่ด้านว้ายนี้ในอนาคต-->
                    <button type="submit" value = "submit" class="btn btn-dark" v-if = "!enLang">ค้นหาเที่ยวบิน</button>
                    <button type="submit" value = "submit" class="btn btn-dark" v-else >Serch for Flights</button>
                    <input class="button" type="submit" value="Submit">  
                    
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
            discount50:false

        }
    },
    methods:{
        konsolelog(what){
            console.log(what + typeof what)
        },
        onSubmit(){
            console.log("kkkkkk")
            if( this.departure === "" || this.destination === "" || this.departDate === null ){
                if(this.enLang){
                    alert("Please fill all blanks the Booking form")
                }
                
                else{
                    alert("กรุณากรอกข้อมูลในการจะจองบัตรโดยสารให้ครบทุกช่อง")
                }
            }
            else if(this.userInputCode !== "abc" && this.userInputCode !== ""){
                
                alert("incorrect Promocode but userinput is " + this.userInputCode)
                if(this.userInputCode !== ""){
                    this.discount50 = true
                    console.log(this.discount)
                }
            }
            else{
                //emit filghtserchfilter to main.js andwill send data to JSON there
                
                let flightSearchFilter = {
                    departure:this.departure,
                    destination:this.destination,
                    departDate:this.departDate,
                    discount50:this.discount50
                }
                console.log(flightSearchFilter)
                this.$emit('flight-search-filter',flightSearchFilter)
                
            }
        },
        created(){
            
        }
    },
    
})