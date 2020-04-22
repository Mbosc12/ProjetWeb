new Vue({
    el: "#connected",
    data: function () {
        return {
            username: localStorage.username,
            password: localStorage.password
        }
    },
    template: `<h4>Vous êtes connecté(e) en tant que : {{ username }}</h4>`
});

new Vue({
    el: "#disconnect",
    data: function () {
        return {
            username: localStorage.username
        }
    },
    template: `<a href="/connexion" v-on:click="disconnect">Déconnexion</a>`,
    methods: {
        disconnect: function () {
            localStorage.username = "";
            localStorage.password = "";
        }
    }
});

