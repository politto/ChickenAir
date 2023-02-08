const app= Vue.createApp({
    data(){
        return{

            logo:"./assets/ChickenAirlogo.svg",
            enLang:true,

            numAdult:0,
            numChildren:0,
            flight:"",
            klass:"",
            depDate:"",
            depart:"",
            arrive:"",
            depTime:"",
            arrTime:"",
            ticketFee:0,
            airportFee:0,
            deluxeBaggage:0,
            vat7:0,
            totalPrice:0,
            today:new Date().getFullYear(),
            paid: false,

            Adults:[],
            Children:[]
        }
    },
    methods:{
        psgObjcreator(){
            console.log(this.numAdult)
            for(i=0;i<this.numAdult;i++){
                this.Adults[i] = ({
                    prefix:"",
                    fname:"",
                    lname:"",
                    email:""
                })
            }

            for(i=0;i<this.numChildren;i++){
                this.Children[i] = ({
                    prefix:"",
                    fname:"",
                    lname:"",
                    email:""
                })
            }
        },
        loadSearchCookie(){
            let ck = document.cookie;
            //If no content in cookies, then create a new one.
            // // if (ck ===""){
            //     ck = '{"numAdult":1, "numChildren":0,"class":"eco","flight":"CKA123","depDate":"28-12-2022","depart":"DMK","arrive":"HDL","depTime":"07.00","arrTime":"08.00","ticketFee":799,"airportFee":49.08,"deluxeBaggage":100,"vat7":66,"totalPrice":"1014.08"}'
            // // }
            ck = JSON.parse(ck)
            // console.log(ck)
            //clear cookies
            document.cookie = document.cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            this.numPsg = ck.numPsg;
            this.flight = ck.flight;
            this.klass = ck.klass;
            this.depDate = ck.depDate;
            this.depTime = ck.depTime;
            this.depart = ck.depart;
            this.arrive = ck.arrive;
            this.numAdult = parseInt(ck.numAdult);
            this.numChildren = parseInt(ck.numChildren);
            this.totalPrice = ck.totalPrice;



            

        },
        testt(){
            console.log(this.Adults)
            console.log(this.Children)
        },
        sendCookies(){

            for(let i=0;i<this.Adults.length;i++){
                
                if(this.Adults[i].fname==="" || this.Adults[i].lname==="" || this.Adults[0].prefix==="" || this.Adults[0].email===""){
                    alert("please fill every field in this form, which is Prefix, Name, Surname, and booker's e-mail address\nกรุณากรอกข้อมูลให้ครบทุกช่อง ตรงคำนำหน้า ชื่อ นามสกุลของผู้โดยสารแต่ละท่าน และอีเมลของผู้โดยสารท่านแรกสุด(ผู้จอง)")
                    
                    return
                }
                if(!this.containCheck(this.Adults[i].fname,"alphabets")) return alert("Firstname must only contains English alphabets. \n ชื่อผู้โดยสารต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น และไม่มีตัวอักษรพิเศษ")
                if(!this.containCheck(this.Adults[i].lname,"alphabets")) return alert("Lastname must only contains English alphabets. \n นามสกุลผู้โดยสารต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น และไม่มีตัวอักษรพิเศษ")

                
            }
            if(!this.containCheck(this.Adults[0].email,"email")) return alert("Please enter correctly e-mail format.")

            // console.log(this.numAdult + ""  + this.numChildren + "" + this.Adults.length + "" + this.Children.length)
            
            for(let i=0;i<this.Children.length;i++){
                if(this.Children[i].fname==="" || this.Children[i].lname==="" || this.Children[0].prefix===""){
                    return                     alert("please fill every field in this form, which is Prefix, Name, Surname, and booker's e-mail address\nกรุณากรอกข้อมูลให้ครบทุกช่อง ตรงคำนำหน้า ชื่อ นามสกุลของผู้โดยสารแต่ละท่าน และอีเมลของผู้โดยสารท่านแรกสุด(ผู้จอง)")
                }

                if(!this.containCheck(this.Children[i].fname,"alphabets")) return alert("Firstname must only contains English alphabets. \n ชื่อผู้โดยสาร(เด็ก)ต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น และไม่มีตัวอักษรพิเศษ")
                if(!this.containCheck(this.Children[i].lname,"alphabets")) return alert("Lastname must only contains English alphabets. \n นามสกุลผู้โดยสาร(เด็ก)ต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น และไม่มีตัวอักษรพิเศษ")
                
            }
            console.log(this.klass)
            let ck = {
                adults:this.Adults,
                children:this.Children,
                flight:this.flight,
                klass: this.klass,
                depart:this.depart,
                arrive:this.arrive,
                depDate:this.depDate,
                depTime:this.depTime,
                arrTime:this.arrTime,
            }
            ck = JSON.stringify(ck);
            // console.log(ck)
            document.cookie = ck;
            window.open("./ticket.html");
        },
        containCheck(str,checkall){
            
            if (checkall === "num") return !(/![0-9]/.test(str))
            if (checkall === "alphabets") return (/[a-zA-Z]+$/.test(str))
            
            // if (check === "numAndSpacial") return /[0-9 -/:-@[-`{-~]/.test(str)
            if (checkall === "email") return /@/.test(str) && /./.test(str)
        }
    },
    created(){
        
    },
    mounted(){
        this.loadSearchCookie();
        this.psgObjcreator();
    },
    updated(){
        
    }
    
})