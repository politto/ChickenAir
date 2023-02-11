//cut from main.js on  methods() hook/async getData(fi_le) on Vue framework.

const myObj = {kb : "keyboard", mu : "mouse"}
            const farkJSON = JSON.stringify(myObj)
            localStorage.setItem("iyangWa",farkJSON)
            
            let jaaoJSON = localStorage.getItem("iyangWa")
            console.log(jaaoJSON)
            let obj = JSON.parse(jaaoJSON)
            console.log(typeof obj) 
            for(let e in obj){
                console.log(e)
            }