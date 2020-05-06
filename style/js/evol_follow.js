/* + or - x followers this week */
new Vue ({
    el: "#evol",
    data: function() {
        return {
            nb: "",
            abo: ""
        }
    },
    template: `<div id ="new_follow">+ <span id="nb">{{ nb }}</span> {{ abo }} cette semaine</div>`,
    methods: {
        get_followers: function() {
            axios.get('http://localhost:3000/nbFollowersSince4w', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.nb = response.data[response.data.length -1].nb;
                    if (this.nb > 1) {
                        this.abo = "abonés";
                    } else {
                        this.abo = "aboné";
                    }
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