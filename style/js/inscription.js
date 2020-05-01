// TODO: convertir string en date pour Safari (date de naissance)

new Vue({
    el: "#input",
    data: function () {
        return {
            username: '',
            nom: '',
            prenom: '',
            mail: '',
            password: '',
            datenaiss: '',
            sexe: '',
            pays: '',
            cp: '',
            ville: '',
            adresse: '',
            date: '',
            display_mdp: false,
            display_carac: false,
            display_user: false,
            display_mail: false,
            display_success: false,
            display_error: false
        }
    },
    template: `<div>
                   <ul>
                    <li><input type="text" id="username" name="username" v-model="username" v-on:change="usrname" placeholder="Nom d'utilisateur" required></li>
                    
                    <!-- Alert : the username is already in the database -->
                    <div class="alert alert-warning alert-dismissible fade show" id="alert" role="alert" v-if="display_user">
                      Ce <strong>nom d'utilisateur</strong> existe déjà. Veuillez en choisir un autre.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_user">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    
                    <li><input type="email" id="mail" name="mail" v-model="mail" v-on:change="mail_existing" placeholder="Email" required></li>
                    
                    <!-- Alert : the email is already in the database -->
                    <div class="alert alert-warning alert-dismissible fade show" id="alert" role="alert" v-if="display_mail">
                      Cette <strong>adresse mail</strong> appartient à un compte déjà existant. Veuillez vous <a href="/connexion" class="alert-link">connectez</a>.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mail">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    
                    <li><input type="password" id="password" name="password" v-model="password" v-on:change="mdp" placeholder="Mot de passe" required></li>
                    
                    <!-- Alert : password is not long enough -->
                    <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert" v-if="display_mdp">
                      Votre <strong>mot de passe</strong> doit contenir au moins 8 caractères.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mdp">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    
                    <!-- Alert : password contains a forbidden character -->
                    <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert" v-if="display_carac">
                      Votre <strong>mot de passe</strong> contient un des caractères suivants : <img src="style/img/apostrophes.png" id="interdit" alt="Caractères interdits"/>.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_carac">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    
                    <li><input type="text" id="nom" name="nom" v-model="nom" placeholder="Nom" required></li>
                    <li><input type="text" id="prenom" name="prenom" v-model="prenom" placeholder="Prénom" required></li>
                    <li><input type="date" id="datenaiss" name="datenaiss" v-model="datenaiss" placeholder="Date de naissance" required></li>
                    <li><select name="pets" class="custom-select" id="select" v-model="sexe">
                        <option value="">Sexe</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                        <option value="A">Autre</option>
                    </select></li>
                    <li><input type="text" id="adresse" name="adresse" v-model="adresse" placeholder="Adresse" required></li>
                    <li><input type="text" id="cp" name="cp" v-model="cp" placeholder="Code postal" required></li>
                    <li><input type="text" id="ville" name="ville" v-model="ville" placeholder="Ville" required></li>
                    <li><input type="text" id="pays" name="pays" v-model="pays" placeholder="Pays" required></li>
                   </ul>

                   <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="register">S'inscrire</button>
                   
                   <!-- Alert : account created -->
                    <div class="alert alert-success" id="alert_success" role="alert" v-if="display_success">
                      Votre <strong>compte</strong> a bien été créé. Vous pouvez maintenant vous connectez en cliquant <a href="/connexion" class="alert-link">ici</a>.
                    </div>
                    
                    <!-- Alert : account created -->
                    <div class="alert alert-warning" id="alert_error" role="alert" v-if="display_error">
                      Une <strong>erreur</strong> s'est produite. Merci de réessayer en cliquant <a href="/inscription" class="alert-link">ici</a>.
                    </div>
                </div>`,
    methods: {
        usrname: function () {
            axios.get('http://localhost:3000/pseudoExisting', {
                params: {
                    pseudo: this.username
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    if (response.data[0].pseudoExisting === 1) {
                        this.display_user = true;
                    } else {
                        this.display_user = false;
                    }
                } else {
                    this.display_user = false;
                    this.display_error = true;
                }
            });
        },
        mail_existing: function () {
            axios.get('http://localhost:3000/mailExisting', {
                params: {
                    mail: this.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    if (response.data[0].mailExisting === 1) {
                        this.display_mail = true;
                    } else {
                        this.display_mail = false;
                    }
                } else {
                    this.display_mail = false;
                }
            });
        },
        mdp: function () {
            if (this.password.includes("`") || this.password.includes('"') || this.password.includes("'")) {
                this.display_carac = true;
            } else {
                this.display_carac = false;
            }
            if (this.password.length >= 8) {
                this.display_mdp = false;
            } else {
                this.display_mdp = true;
            }
        },
        close_user: function () {
            this.display_user = false;
        },
        close_mail: function () {
            this.display_mail = false;
        },
        close_mdp: function () {
            this.display_mdp = false;
        },
        close_carac: function () {
            this.display_carac = false;
        },
        close_success: function () {
            this.display_success = false;
        },
        register: function () {
            axios.get('http://localhost:3000/newUser', {
                params: {
                    pseudo: this.username,
                    nom: this.nom,
                    prenom: this.prenom,
                    mail: this.mail,
                    motdepass: this.password,
                    date_naissance: this.datenaiss,
                    sexe: this.sexe,
                    pays: this.pays,
                    CP: this.cp,
                    ville: this.ville,
                    adresse: this.adresse,
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    if (response.data.affectedRows === 1) {
                        this.display_mdp = false;
                        this.display_mail = false;
                        this.display_user = false;
                        this.display_carac = false;
                        this.display_success = true;
                    } else {
                        this.display_error = true;
                    }
                } else {
                    this.display_error = true;
                }
            });
        }
    }
});