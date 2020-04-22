new Vue({
    el: "#connected",
    data: function () {
        return {
            nom: localStorage.nom,
            prenom: localStorage.prenom
        }
    },
    template: `<h4>Vous êtes connecté(e) en tant que : {{ nom }} {{ prenom }}</h4>`
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
            localStorage.mail = "";
            localStorage.password = "";
            localStorage.cp = "";
            localStorage.adresse = "";
            localStorage.datenaiss = "";
            localStorage.nom = "";
            localStorage.prenom = "";
            localStorage.pays = "";
            localStorage.username = "";
            localStorage.ville = "";
        }
    }
});

