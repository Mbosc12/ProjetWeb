new Vue({
    el: "#input",
    data: function () {
        return {
            username: '',
            password: '',
            display_mdp: false,
            display_mail: false
        }
    },
    template: `<div>
                <input type="email" id="username" name="username" v-model="username" placeholder="Nom d'utilisateur" required>
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
        }
        ,
        close_mail: function () {
            this.display_mail = !this.display_mail;
        }
        ,
        login: function () {
            /* if the username and the password are not empty */
            if (this.username.length > 0 && this.password.length > 0) {
                axios.get('http://localhost:3000/VerifUtilisateur', {
                    params: {
                        mail: this.username,
                    }
                }).then(response => {
                    console.log(response);
                    if (response.data.length !== 0) {
                        if (this.password === response.data[0].motdepass) {
                            /* the username and the password are localy stored to create an user session  */
                            localStorage.username = this.username;
                            localStorage.password = this.password;
                            /* redirection */
                            window.location.href = "/feed";
                            /* deletion of the alerts */
                            this.display_mdp = false;
                            this.display_mail = false;
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