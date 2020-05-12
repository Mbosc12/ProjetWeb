let vm = new Vue({
  el: '#app',
  data: {
    errors: [],
    titrep: null,
    descp: null,
    titree: null,
    desce: null,
    date: "00-00-00",
    lieu: null,
    postid: null
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      console.log("titrep", this.titrep);
      console.log("descp", this.descp);
      console.log("titree", this.titree);
      console.log("desce", this.desce);
      console.log("date", this.date);
      console.log("lieu", this.lieu);

      if(this.titrep == "") {
        this.titrep = null;
      } else if(this.descp == "") {
        this.descp = null;
      } else if(this.titree == "") {
        this.titree = null;
      } else if(this.desce == "") {
        this.desce = null;
      } else if(this.lieu == "") {
        this.lieu = null;
      } else if(this.date = "") {
        this.date = "00-00-00";
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
        } else if(this.titree || this.desce || this.date == "00-00-00" || this.lieu) {
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
        this.ajoutPost();
        return true;
      }

    e.preventDefault();
    },
    ajoutPost: function() {
      axios.get('http://localhost:3000/ajoutPost', {
        params: {
          FK_utilisateur_mail: localStorage.mail,
          titre: this.titrep,
          message: this.descp,
          ville: this.ville,
          date_event: ("2020-04-05")
        }
      }).then(response => {
        this.getId(this.titrep);
        console.log("publication créer avec l'id:")
      });
    },
    getId: function(title) {
            axios.get('http://localhost:3000/getPostID', {
                params: {
                    mail: localStorage.mail,
                    titre: title
                }
            }).then(response => {
              this.postid = response.data[0].PK_post_id
              console.log(this.postid)
              this.ajouterPoster(this.postid)
              this.ajoutPhotoPost(this.postid)
            });
    },
    ajouterPoster: function(id) {
            axios.get('http://localhost:3000/ajoutPoster', {
                params: {
                    FK_utilisateur_mail: localStorage.mail,
                    FK_post_id: id
                }
            }).then(response => {
              console.log("poster ok")
            });
    },
    ajoutPhotoPost: function(id) {
            axios.get('http://localhost:3000/ajoutPhotoPost', {
                params: {
                    FK_utilisateur_mail: localStorage.mail,
                    titre: localStorage.upload,
                    FK_post_id: id
                }
            }).then(response => {
              console.log("photo ok")
            });
    }
  }
})