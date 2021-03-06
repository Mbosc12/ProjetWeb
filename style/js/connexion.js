new Vue({
    el: "#input",
    data: function () {
        return {
            mail: '',
            password: '',
            display_mdp: false,
            display_mail: false
        }
    },
    template: `<div>
                <input type="email" id="mail" name="mail" v-model="mail" placeholder="Adresse e-mail" required>
                <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe" required>

                <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="login">Se connecter</button>
                
                <!-- Alert wrong password -->
                <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert" v-if="display_mdp">
                  Votre <strong>mot de passe</strong> est erroné. Veuillez réessayer.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mdp">
                    <span aria-hidden="true" >&times;</span>
                  </button>
                </div>
                
                <!-- Alert unknown user -->
                <div class="alert alert-warning alert-dismissible fade show" id="alert" role="alert" v-if="display_mail">
                  Votre <strong>adresse mail</strong> ne correspond à aucun compte existant. Veuillez réessayer ou cliquez <a href="/inscription" class="alert-link">ici</a> pour vous inscrire.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mail">
                    <span aria-hidden="true" >&times;</span>
                  </button>
                </div>
                </div>
                
                
               </div>`,
    methods: {
        close_mdp: function () {
            this.display_mdp = !this.display_mdp;
        },
        close_mail: function () {
            this.display_mail = !this.display_mail;
        },
        login: function () {
            /* if the username and the password are not empty */
            if (this.mail.length > 0 && this.password.length > 0) {
                axios.get('http://localhost:3000/VerifUtilisateur', {
                    params: {
                        mail: this.mail,
                    }
                }).then(response => {
                    if (response.data.length !== 0) {
                        if (this.password === response.data[0].motdepass) {
                            /* the mail and the password are localy stored to create an user session  */
                            localStorage.mail = this.mail;
                            localStorage.password = this.password;
                            /* deletion of the alerts */
                            this.display_mdp = false;
                            this.display_mail = false;

                            /* all the user information are locally stored */
                            axios.get('http://localhost:3000/unUtilisateur', {
                                params: {
                                    mail: this.mail,
                                }
                            }).then(response => {
                                if (response.data.length !== 0) {
                                    localStorage.username = response.data[0].pseudo;
                                    localStorage.nom = response.data[0].nom;
                                    localStorage.prenom = response.data[0].prenom;
                                    localStorage.datenaiss = response.data[0].date_naissance;
                                    localStorage.sexe = response.data[0].sexe;
                                    localStorage.pays = response.data[0].pays;
                                    localStorage.cp = response.data[0].CP;
                                    localStorage.ville = response.data[0].ville;
                                    localStorage.adresse = response.data[0].adresse;
                                    localStorage.photoprofil = response.data[0].photo_profil;
                                    localStorage.dateInscription = response.data[0].date_inscription;

                                    /* redirection */
                                    window.location.href = "feed";
                                }
                            });
                        } else {
                            this.display_mdp = true;
                            this.display_mail = false;
                        }
                    } else {
                        this.display_mail = true;
                        this.display_mdp = false;
                    }
                });
            }
        }
    }
});