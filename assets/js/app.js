import {createApp} from 'https://unpkg.com/vue@3.2.31/dist/vue.esm-browser.js'
import { options,arrIfConnent,optionsZodiac} from './options.js'
const appConfig = {
  data() {
    return {
      calendaryAnimal: [],
      calendaryZodiac: [],
      title: "IHH VUE",
      logo: "./assets/image/logo.svg",
      search: "",
      IhhifConnent:'start',
      dataUser: null,
      age: null,
      genderUser: null,
      zodiacAnimal: "",
      zodiac: '',
      symbolZodic: ''
    };
  },
  methods: {
    getArr() {
      return this.search.split("");
    },//getArr() 
    ifConnent() {
      let calc = this.getArr().map((item, index) => item * arrIfConnent[index]);
      calc.pop();
      let sum = calc.reduce((sum, i) => sum + i, 0);
      let corrent =
        sum % 11 ==
        (this.getArr()[this.getArr().length - 1] == 0
          ? 10
          : this.getArr()[this.getArr().length - 1]);

      return (this.IhhifConnent =
        this.getArr().length == 10 && corrent ? true : false);
    },//ifConnent()
    birth() {
      let dataUser = new Date(1900, 0, 31);
      dataUser.setDate(this.getArr().splice(0, 5).join(""));
      this.dataUser = dataUser.toLocaleString("ru", options);
      return dataUser;
    }, // birth()
    howManyYears() {
      let dataNow = new Date();
      let deff = 0;
      deff = dataNow.getFullYear() - this.birth().getFullYear();
      if (dataNow.getMonth() < this.birth().getMonth()) {
        deff -= 1;
      } else if (dataNow.getMonth() == this.birth().getMonth()) {
        if (dataNow.getDate() < this.birth().getDate()) {
          deff -= 1;
        }
      }
      return (this.age = deff);
    },//howManyYears()
    gender() {
      if (this.search.length >= 9) {
        return (this.genderUser =
          this.getArr()[8] % 2 == 0 ? "Женщина" : "Мужчина");
      }
      return (this.genderUser = "");
    },//gender()
    searchCalendaryAnimal() {
      let getFullYear = this.birth().getFullYear();
      for (let year in this.calendaryAnimal) {
        let result = this.calendaryAnimal[year].map((item) => {
          if (item == getFullYear) {
            console.log(item);
            return (this.zodiacAnimal = year);
          }
        });
      }
    },
    searchCalendaryZodiac(){
        let dateUser = this.birth()
                        .toLocaleString("ru", optionsZodiac)
                        .split('.')
                        .slice(0,2)
                        .reverse();
        console.log(dateUser);
        let zodiacs = this.calendaryZodiac;
        for(let zodiac in zodiacs){
            let dateMin = zodiacs[zodiac].dateMin.split('-');
            let dateMax = zodiacs[zodiac].dateMax.split('-');
                
            
            if (dateMin[0]==dateUser[0] && dateUser[1]>= dateMin[1]){
                this.symbolZodic = zodiacs[zodiac].symbol;
                //console.log(this.symbolZodic);
                return this.zodiac = zodiac;
                 
            }else if (dateMax[0]==dateUser[0] && dateUser[1]<= dateMax[1]){
                this.symbolZodic = zodiacs[zodiac].symbol;
                //console.log(this.symbolZodic);
                
                return this.zodiac = zodiac;
            }
        }
    },//searchCalendaryZodiac()
    render() {
        
      
        this.searchCalendaryZodiac();
        this.ifConnent();
        this.birth();
        this.howManyYears();
        this.gender();
        this.searchCalendaryAnimal();
      
    },
  },
  
  
  computed: {
    showifConnent() {
        if (this.search) {
            return this.IhhifConnent;
        }
        return this.IhhifConnent = 'start'
       
    },
    showAge() {
      if (this.search.length >= 5) {
        return this.age + " лет.";
      }
      return (this.age = "");
    },
    showDataUser() {
      if (this.search.length >= 5) {
        return this.dataUser;
      }
      return (this.dataUser = "");
    },
    showZodiacAnimal() {
      if (this.search.length >= 5) {
        return this.zodiacAnimal + ".";
      }
      return (this.zodiacAnimal = "");
    },
    showZodiac(){
        if (this.search.length >= 5) {
          return this.zodiac + ' ' + this.symbolZodic;
        }
        return (this.zodiac = "");
      },
  },
  
  
  async mounted() {
    let data = await fetch("./assets/json/calendaryAnimal.json");
    let data2 = await fetch("./assets/json/zodiac.json");
    data = await data.json();
    data2 = await data2.json();
    this.calendaryAnimal = data;
    this.calendaryZodiac = data2;
  },
};

const app = createApp(appConfig);

app.mount('#app');


