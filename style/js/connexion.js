new Vue({
    el: "#input",
    data: function () {
        return {
            username: "",
            password: ""
        }
    },
    template: `<div>
                <input type="email" id="username" name="username" v-model="username" placeholder="Nom d'utilisateur">
                <input type="password" id="password" name="password" v-model="password" placeholder="Mot de passe">

                <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="login">Se connecter</button>
               </div>`,
    methods: {
        login: function () {
            const username = this.username;
            const password = this.password;

            console.log(username, password);

        }

    }
});