const app = Vue.createApp({
    data(){
        return {
            //Acually not use this js file
            enLang: false,
            wipwup: false,
            logo: "./assets/ChickenAirlogo.svg",
            promocode: "abc"
        }
    },

    methods: {
        loadSearchCookies(){
            let ckarr = document.cookie.split("+");
            //continue cookie baking!
            let dep = document.querySelector("#departure");
            let arri = document.querySelector("#destination");
            let depDate = document.getElementById("departDate");
            let pmCode = document.getElementById("promoCode");

            document.cookie = document.cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            //dep.value = ckarr[0];
            //arri.value = ckarr[1];
            //depDate.value = ckarr[2];
            // dep.value = "DMK";
            // arri.value = "HLD";
            // depDate.value = "2022-11-11";
            console.log("cookies : " + ckarr)
        }
    },
    mounted() {
        this.loadSearchCookies();
    }
})