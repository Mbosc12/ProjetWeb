/* Graphic : followers by city */
new Vue({
    data: function () {
        return {
            ville: [],
            nb: []
        }
    },
    methods: {
        get_cities: function () {
            axios.get('http://localhost:3000/nbFollowersByCity', {
                params: {
                    mail: localStorage.mail
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        this.ville.push(response.data[i].ville);
                        this.nb.push(response.data[i].nb);
                    }
                    new Chart(document.getElementById("horizontalBar"), {
                        "type": "horizontalBar",
                        "data": {
                            "labels": this.ville,
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
        this.get_cities();
    }
});
