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
    template: `<a class="nav-link" href="connexion" v-on:click="disconnect"><i class="fas fa-power-off fa-lg"></i></a>`,
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