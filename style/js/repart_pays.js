/* Graphic : followers by country */
new Vue({
    data: function () {
        return {
            pays: [],
            nb: []
        }
    },
    methods: {
        get_countries: function () {
            axios.get('http://localhost:3000/nbFollowersByCountry', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.pays.push(response.data[i].pays);
                        this.nb.push(response.data[i].nb);
                    }
                    new Chart(document.getElementById("horizontalBar"), {
                        "type": "horizontalBar",
                        "data": {
                            "labels": this.pays,
                            "datasets": [{
                                "data": this.nb,
                                "fill": false,
                                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                                    "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
                                    "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                                ],
                                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                                    "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
                                ],
                                "borderWidth": 1,
                            }]
                        },
                        "options": {
                            responsive: true,
                            legend: {
                                display: false
                            },
                            "scales": {
                                "xAxes": [{
                                    "ticks": {
                                        "beginAtZero": true,
                                        stepSize: 1
                                    }
                                }]
                            }
                        },
                    });
                } else {
                    console.log("erreur /NbFemmeHomme");
                }
            });

        },
    },
    created: function () {
        this.get_countries();
    }
});

/* Likes notification */
new Vue({
    el: "#likes",
    data: function () {
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
new Vue({
    el: "#config",
    data: function () {
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