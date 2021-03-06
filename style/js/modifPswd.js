new Vue({
    el: "#form",
    data: function () {
        return {
            username: "",
            old_password: "",
            new_password: "",
            re_password: "",
            display_success: false,
            display_wrong: false,
            display_mdp: false,
            display_carac: false,
            display_id: false,
            display_old_mdp: false
        }
    },
    template: `<div id="content">
                    <div id="usrname">{{ username }}</div>
                    <ul>
                      <li>
                      <label><strong>Ancien mot de passe</strong></label>
                      <input type="password" id="old_password" name="old_password" v-model="old_password" v-on:change="verif_pswd">  
                      </li>
                      <!-- Alert : the password is not the same as the old one -->
                        <div class="alert alert-danger alert-dismissible fade show" id="alert_msg" role="alert" v-if="display_wrong">
                          Ce mot de passe ne correspond pas à votre ancien <strong>mot de passe</strong>.
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_wrong">
                            <span aria-hidden="true" >&times;</span>
                          </button>
                        </div>
                      
                      <li>
                      <label><strong>Nouveau mot de passe</strong></label>
                      <input type="password" id="new_password" name="new_password" v-model="new_password" v-on:change="mdp">
                      </li>

                        <!-- Alert : password is the same as the old one -->
                        <div class="alert alert-danger alert-dismissible fade show" id="alert_msg" role="alert" v-if="display_old_mdp">
                            Votre <strong>nouveau</strong> mot de passe doit être différent de votre ancien mot de passe.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mdp">
                                <span aria-hidden="true" >&times;</span>
                            </button>
                        </div>
                      
                      <!-- Alert : password is not long enough -->
                    <div class="alert alert-danger alert-dismissible fade show" id="alert_msg" role="alert" v-if="display_mdp">
                      Votre <strong>mot de passe</strong> doit contenir au moins 8 caractères.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_mdp">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    
                    <!-- Alert : password contains a forbidden character -->
                    <div class="alert alert-danger alert-dismissible fade show" id="alert_msg" role="alert" v-if="display_carac">
                      Votre <strong>mot de passe</strong> contient un des caractères suivants : <img src="style/img/apostrophes.png" id="interdit" alt="Caractères interdits"/>.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_carac">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                      
                      <li>
                      <label><strong>Confirmer le nouveau mot de passe</strong></label>
                      <input type="password" id="re_password" name="re_password" v-model="re_password" v-on:change="pswd_id">
                      </li>
                      
                      <!-- Alert : password contains a forbidden character -->
                    <div class="alert alert-danger alert-dismissible fade show" id="alert_msg" role="alert" v-if="display_id">
                      Les deux <strong>mots de passe</strong> ne sont pas identiques.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_id">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
                    </ul>
                    
                    
                    <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="send">Envoyer</button>
                    
                    <!-- Alert : informations changed -->
                    <div class="alert alert-success alert-dismissible fade show" id="alert" role="alert" v-if="display_success">
                      Votre <strong>mot de passe</strong> a bien été modifié.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_success">
                        <span aria-hidden="true" >&times;</span>
                      </button>
                    </div>
               </div>`,
    methods: {
        close_success: function () {
            this.display_success = false;
        },
        close_wrong: function () {
            this.display_wrong = false;
        },
        close_mdp: function () {
            this.display_mdp = false;
        },
        close_carac: function () {
            this.display_carac = false;
        },
        close_id: function () {
            this.display_id = false;
        },
        getInfo: function () {
            axios.get('http://localhost:3000/unUtilisateur', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {

                if (response.data.length !== 0) {
                    this.username = response.data[0].pseudo;
                } else {
                    console.log("erreur /unUtilisateur");
                }
            });
        },
        mdp: function() {
            /* ----- Password contains not allowed characters ----- */
            if (this.new_password.includes("`") || this.new_password.includes('"') || this.new_password.includes("'")) {
                this.display_carac = true;
            } else {
                this.display_carac = false;
            }

            /* ----- Password length ----- */
            if (this.new_password.length >= 8) {
                this.display_mdp = false;
            } else {
                this.display_mdp = true;
            }

            /* ----- Password is the same as the old one ----- */
            axios.get('http://localhost:3000/VerifUtilisateur', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    if (this.new_password === response.data[0].motdepass) {
                        this.display_old_mdp = true;
                    } else {
                        this.display_old_mdp = false;
                    }
                }
            });
        },
        pswd_id: function() {
            if (this.new_password !== this.re_password) {
                this.display_id = true;
            } else {
                this.display_id = false;
            }
        },
        verif_pswd: function () {
            axios.get('http://localhost:3000/VerifUtilisateur', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    console.log(this.old_password);
                    if (this.old_password === response.data[0].motdepass) {
                        this.display_wrong = false;
                    } else {
                        this.display_wrong = true;
                    }
                }
            });
        },
        send: function () {
            axios.get('http://localhost:3000/ModifMDPUtilisateur', {
                params: {
                    motdepass: this.new_password,
                    pseudo: localStorage.username
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.display_success = true;
                } else {
                    console.log("erreur /ModifMDPUtilisateur");
                }
            });
        }
    },
    created: function () {
        this.getInfo();
    }
});

