new Vue({
    el: "#form",
    data: function () {
        return {
            nom: "",
            prenom: "",
            username: "",
            datenaiss: "",
            mail: "",
            adresse: "",
            cp: "",
            ville: "",
            pays: "",
            display_success: false,
        }
    },
    template: `<div id="content">
                    <ul>
                      <li>
                      <label><strong>Nom</strong></label>
                      <input type="text" id="nom" name="nom" v-model="nom" placeholder="Nom">
                      </li>
                      <li>
                      <label><strong>Prénom</strong></label>
                      <input type="text" id="prenom" name="prenom" v-model="prenom" placeholder="prenom">
                      </li>
                      <li>
                      <label><strong>Nom d'utilisateur</strong></label>
                      <input type="text" id="username" name="username" v-model="username" placeholder="Username">
                      </li>
                    </ul>
                    <div id="text">
                        <strong>Informations personnelles</strong><br>
                        Fournissez vos informations personnelles. Elles n’apparaîtront pas sur votre profil public.
                    </div>
                    <ul id="content_ul">
                      <li>
                      <label><strong>Adresse e-mail</strong></label>
                      <input type="email" id="mail" name="mail" v-model="mail" placeholder="Email">
                      </li>
                      <li>
                      <label><strong>Date de naissance</strong></label>
                      <input type="date" id="datenaiss" name="datenaiss" v-model="datenaiss" placeholder="datenaiss">
                      </li>
                      <li>
                      <label><strong>Adresse</strong></label>
                      <input type="text" id="email" name="email" v-model="adresse" placeholder="Email">
                      </li>
                      <li>
                      <label><strong>Code postal</strong></label>
                      <input type="text" id="email" name="email" v-model="cp" placeholder="Email">
                      </li>
                      <li>
                      <label><strong>Ville</strong></label>
                      <input type="text" id="email" name="email" v-model="ville" placeholder="Email">
                      </li>
                      <li>
                      <label><strong>Pays</strong></label>
                      <input type="text" id="email" name="email" v-model="pays" placeholder="Email">
                      </li>
                    </ul>
                    <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="send">Envoyer</button>
                    
                    <!-- Alert : informations changed -->
                    <div class="alert alert-success alert-dismissible fade show" id="alert" role="alert" v-if="display_success">
                      Vos <strong>informations</strong> ont bien été modifiées.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_success">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
               </div>`,
    methods: {
        close_success: function () {
            this.display_success = false;
        },
        getInfo: function () {
            axios.get('http://localhost:3000/unUtilisateur', {
                params: {
                    mail: localStorage.username,
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.username = response.data[0].pseudo;
                    this.nom = response.data[0].nom;
                    this.prenom = response.data[0].prenom;
                    for (let i=0; i<10; i++) {
                        this.datenaiss += response.data[0].date_naissance[i];
                    }
                    this.mail = response.data[0].mail;
                    this.adresse = response.data[0].adresse;
                    this.cp = response.data[0].CP;
                    this.ville = response.data[0].ville;
                    this.pays = response.data[0].pays;
                } else {
                    console.log("erreur");
                }
            });
        },
        send: function () {
            axios.get('http://localhost:3000/ModifUtilisateur', {
                params: {
                    nom: this.nom,
                    prenom: this.prenom,
                    pseudo: this.username,
                    date_naissance: this.datenaiss,
                    mail: this.mail,
                    adresse: this.adresse,
                    CP: this.cp,
                    ville: this.ville,
                    pays: this.pays,
                    motdepass: localStorage.password
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.display_success = true;
                } else {
                    console.log("erreur");
                }
            });
        }
    },
    created: function () {
        this.getInfo();
    }
});