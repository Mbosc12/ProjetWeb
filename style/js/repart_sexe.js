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
