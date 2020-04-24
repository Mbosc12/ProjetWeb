/* Graphic : followers by gender */
new Vue ({
    data: function() {
        return {
            nb_femme:"",
            nb_homme: "",
            nb_autre: ""
        }
    },
    methods: {
        get_nb_gender: function () {
            axios.get('http://localhost:3000/NbFemmeHomme', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.nb_femme = response.data[0].sexe;
                    this.nb_homme = response.data[1].sexe;
                    this.nb_autre = response.data[2].sexe;

                    new Chart(document.getElementById("pieChart").getContext('2d'), {
                        type: 'pie',
                        data: {
                            labels: ["Homme", "Femme", "Autre"],
                            datasets: [{
                                data: [this.nb_homme, this.nb_femme, this.nb_autre],
                                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
                            }],
                        },
                        options: {
                            responsive: true,
                        },

                    });
                } else {
                    console.log("erreur /NbFemmeHomme");
                }
            });

        },
    },
    created: function () {
        this.get_nb_gender();
    }
});

/* Likes notification */
new Vue ({
    el: "#likes",
    data: function() {
        return {
            display_notif: false
        }
    },
    template: `<div><a class="dropdown-item" href="#">Prochainement</a>
                    <a class="dropdown-item" href="#">Les notifications</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Mais pas tout de suite</a>
                    <a class="dropdown-item" href="#">Patience</a></div>`,
    methods: {
        notif: function () {
            console.log("notification");
            this.display_notif = !this.display_notif;
        }
    }
});

/* Modification of the user information and password */
new Vue ({
    el: "#config",
    data: function() {
        return {
            display_notif: false
        }
    },
    template: `<div>
                   <a class="dropdown-item" href="modifProfile">Modifier mes informations</a>
                   <a class="dropdown-item" href="modifPswd">Modifier mon mot de passe</a>
               </div>`,
    methods: {
        notif: function () {
            console.log("notification");
            this.display_notif = !this.display_notif;
        }
    }
});

/* Disconnect button and function */
new Vue({
    el: "#disconnect",
    data: function () {
        return {
            username: localStorage.username,
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
            localStorage.sexe = "";
            localStorage.nom = "";
            localStorage.prenom = "";
            localStorage.pays = "";
            localStorage.username = "";
            localStorage.ville = "";
        },
    }
});