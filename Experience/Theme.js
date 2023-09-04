import EventEmitter from "events";

export default class Theme extends EventEmitter{
    constructor(){
        super();
      
        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");
        this.setEventListeners()
    }

    setEventListeners(){
        let clickCounter = 1;

        this.toggleButton.addEventListener("click", ()=>{
            clickCounter % 2 == 0 ? this.toggleCircle.classList.remove("slide"):  this.toggleCircle.classList.add("slide");
            clickCounter += 1;
            /* themeCounter % 2 == 0 ? this.theme = "light" : this.theme = "dark"; */
            this.theme = this.theme === "light"? "dark" : "light" ;
            clickCounter % 2 == 0 ? document.body.classList.add("dark-theme"):  document.body.classList.remove("dark-theme");

            this.emit("switch", this.theme)
        })
    }

}

