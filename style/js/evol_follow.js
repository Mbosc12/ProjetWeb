/* + or - x followers this week */
new Vue ({
    el: "#evol",
    data: function() {
        return {
            nb: ""
        }
    },
    template: `<div id ="new_follow">+ <span id="nb">{{ nb }}</span> abonné(s) cette semaine</div>`,
    methods: {
        get_followers: function() {
            axios.get('http://localhost:3000/nbFollowersSince4w', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                console.log("1.", response);
                if (response.data.length !== 0) {
                    this.nb = response.data[response.data.length -1].nb;
                } else {
                    console.log("erreur /nbFollowersSince4w");
                }
            });
        }
    },
    created: function() {
        this.get_followers();
    }
});

/* Graphic : evolution of the followers number */
new Vue({
    data: function () {
        return {
            date: [],
            nb: []
        }
    },
    methods: {
        get_nb_followers: function () {
            axios.get('http://localhost:3000/nbFollowersSince4w', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                console.log("2.", response);
                if (response.data.length !== 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        let d = new Date(response.data[i].date);
                        let day = d.getDate();
                        let month = d.getMonth() + 1;
                        let year = d.getFullYear();
                        let dte = day + "-" + month + "-" + year;

                        this.date.push(dte);
                        this.nb.push(response.data[i].nb);
                    }
                    console.log(this.nb);
                    new Chart(document.getElementById("lineChart").getContext('2d'), {
                        type: 'line',
                        data: {
                            labels: this.date,
                            datasets: [{
                                data: this.nb,
                                backgroundColor: [
                                    "rgba(104, 216, 155, 0.2)"
                                ],
                                borderColor: [
                                    "rgb(104, 216, 155, 0.7)"
                                ],
                                borderWidth: 2
                            },
                            ]
                        },
                        options: {
                            responsive: true,
                            "scales": {
                                "yAxes": [{
                                    "ticks": {
                                        "beginAtZero": true,
                                        stepSize: 1
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                        }
                    });
                } else {
                    console.log("erreur /nbFollowersSince4w");
                }
            });
        },
    },
    created: function () {
        this.get_nb_followers();
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