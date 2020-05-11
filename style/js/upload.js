const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    titrep: null,
    descp: null,
    titree: null,
    desce: null,
    date: null,
    lieu: null
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if(this.titrep == "") {
        this.titrep = null;
      } else if(this.descp == "") {
        this.descp = null;
      } else if(this.titree == "") {
        this.titree = null;
      } else if(this.desce == "") {
        this.desce = null;
      } else if(this.date == "") {
        this.date = null;
      } else if(this.lieu == "") {
        this.lieu = null;
      }

      if (!this.titrep && !this.titree) {
        this.errors.push("Un titre est requis")
      }
      else if(this.titrep && this.titree) {
        this.errors.push("Vous remplissez deux formulaires différents");
      }
      //cas pour publication
        //si on a pas de desc
        //si on a un champ event
      else if(this.titrep) {
        if(!this.descp) {
          this.errors.push("Une description est requise")
        } else if(this.titree || this.desce || this.date || this.lieu) {
          this.errors.push("Vous remplissez deux formulaires différents");
        }
      }

      //cas pour event
        //si on a pas de desc
        //si on a pas de date
        //si on a pas de lieu
        //si on a un champ publi
      else if(this.titree) {
        if(!this.desce) {
          this.errors.push("Une description est requise")
        } else if(!this.date) {
          this.errors.push("Une date est requise")
        } else if(!this.lieu) {
          this.errors.push("Un lieu est requis")
        } else if(this.titrep || this.descp) {
          this.errors.push("Vous remplissez deux formulaires différents");
        }
      }

      if (!this.errors.length) {
        if(!this.titree) {
          console.log("publication")
          console.log(localStorage.mail)
          console.log(this.titrep)
          console.log(this.descp)
          this.registerp();
        } else {
          console.log("publication")
          console.log(localStorage.mail)
          console.log(this.titree)
          console.log(this.desce)
          console.log(this.date)
          console.log(this.lieu)
          this.registere();
        }
        //return true;
      }

    e.preventDefault();
    },
    registerp: function () {
            console.log("je passe dans la fonction")
            axios.get('http://localhost:3000/AjoutPost', {
                params: {
                    mail: localStorage.mail,
                    titre: this.titrep,
                    message: this.descp,
                    ville: this.ville,
                    date_event: this.date,
                }
            }).then(response => {
              console.log("c'est là", response.data)
            });
        },
    registere: function () {
            axios.get('http://localhost:3000/AjoutPost', {
                params: {
                    mail: localStorage.mail,
                    titre: this.titree,
                    message: this.desce,
                    ville: this.ville,
                    date_event: this.date,
                }
            }).then(response => {
              console.log("c'est là", response.data)
            });
        }
  }
})