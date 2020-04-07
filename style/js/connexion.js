new Vue({
    el: "#input",
    data: function () {
        return {
            username: '',
            password: '',
        }
    },
    template: `<div>
                <input type="email" id="username" name="username" v-model="username" placeholder="Nom d'utilisateur">
                <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe">

                <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="login">Se connecter</button>
               </div>`,
    methods: {
        login: function () {
            console.log(this.username, this.password)
            axios.get('http://localhost:3000/VerifUtilisateur', {
                params: {
                    pseudo: this.username,
                }
            }).then(response => {
                if(response.data.length != 0) {
                    if(this.password == response.data[0].motdepass) {
                        console.log("Connexion réussie")
                    } else {
                        console.log("Mot de passe incorrect")
                    }
                } else {
                    console.log("Utilisateur inconnu")
                }
                });
        }

    }
});