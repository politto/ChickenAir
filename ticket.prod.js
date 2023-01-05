const app = Vue.createApp({
    data(){
        return{
            adult:{},
            children:{},
            flight:"",
            klass:"",
            seat:[],
            depart:"",
            arrive:"",
            depDate:"",
            depTime:"",
            arrTime:"",
            gate:"",
            enLang: true
        }
    },
    methods:{
        recieveCookies(){
            let ck = document.cookie;
            console.log(ck)
            // if(ck===""){
            //     ck = '{"adults":[{"prefix":"Mrs.","fname":"test","lname":"test","email":"test"},{"prefix":"Mr.","fname":"test2","lname":"test2","email":"test2"}],"children":[{"fname":"ss","lname":"ll","email":",,","prefix":"Ms."},{"prefix":"kk","fname":"fgfg","lname":"dd","email":""}],"flight":"CKA123","depart":"DMK","arrive":"HDL","depDate":"28-12-2022","depTime":"07.00","arrTime":"","klass":"eco"}'
            // }
            ck = JSON.parse(ck);
            this.adult = ck.adults;
            this.children = ck.children;
            this.flight = ck.flight;
            this.klass = ck.klass;
            this.depart = ck.depart;
            this.arrive =ck.arrive;
            this.depDate = ck.depDate;
            this.depTime = ck.depTime;
            console.log(ck)

            console.log(this.klass)
            if(this.klass==="eco") {
                this.randomSeat("eco");
                this.klass = "ECONOMY"
            }
            else{
                this.randomSeat("bsn");
                this.klass = "BUSSINESS"
            }
            
            
        },
        async fetchJSON(){
            let response = await fetch("./components/data.json")
            let data =  await response.json();
            let airports = data.airports;
            
            this.gate = airports[this.depart].gate
            this.depart = airports[this.depart].name + "(" + this.depart + ")"
            this.arrive = airports[this.arrive].name + "(" + this.arrive + ")"
            
        },
        randomSeat(klass){

            if(klass==="eco") {
                for(i=0;i<this.adult.length;i++){
                    let randInt = Math.floor(Math.random()*20)+6
                    let randStr = String.fromCharCode(Math.floor(Math.random()*5)+65)
                    console.log(randStr + "" +randInt)
                    this.seat[i] = randInt + "" + randStr;
                }
                for(i=0;i<this.children.length;i++){
                    let randInt = Math.floor(Math.random()*20)+6
                    let randStr = String.fromCharCode(Math.floor(Math.random()*5)+65)
                    console.log(randStr + "" +randInt)
                    this.seat[this.adult.length +i] = randInt + "" + randStr;
                }
            }
            else{
                for(i=0;i<this.adult.length;i++){
                    let randInt = Math.floor(Math.random()*4)+1
                    let randStr = String.fromCharCode(Math.floor(Math.random()*5)+65)
                    console.log(randStr + "" +randInt)
                    this.seat[i] = randInt + "" + randStr;

                }
                for(i=0;i<this.children.length;i++){
                    let randInt = Math.floor(Math.random()*4)+1
                    let randStr = String.fromCharCode(Math.floor(Math.random()*5)+65)
                    console.log(randStr + "" +randInt)
                    this.seat[this.adult.length +i] = randInt + "" + randStr;
                }
            }
            let seat = this.seat
            for(i=0;i<seat.length;i++){
                console.log(i)
                for(j=i+1;j<seat.length;j++){
                    if(seat[i]===seat[j]) this.randomSeat(klass)
                    console.log(j)
                    console.log(seat)
                    if(seat[i]===seat[j]) console.log(seat[i] + " " + seat[j])
                }
            }
            
        },
        upperCase(){
            for(i=0;i<this.adult.length;i++){
                this.adult[i].fname = this.adult[i].fname.toUpperCase()
                this.adult[i].lname = this.adult[i].lname.toUpperCase()
            }
            for(i=0;i<this.children.length;i++){
                this.children[i].fname = this.children[i].fname.toUpperCase()
                this.children[i].lname = this.children[i].lname.toUpperCase()
            }
        }
    },
    mounted(){
        this.fetchJSON();
        this.recieveCookies();
        this.upperCase();
        
    }
})