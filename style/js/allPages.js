/* Disconnect button and function */
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
            localStorage.sexe = "";
            localStorage.nom = "";
            localStorage.prenom = "";
            localStorage.pays = "";
            localStorage.username = "";
            localStorage.ville = "";
        }
    }
});

/* Likes notification */
new Vue({
    el: "#likes",
    data: function () {
        return {
            today: new Date,
            likes: [],
            comments: [],
            follow: [],
            share: []
        }
    },
    template: `
        <div id="likes">
            <div v-for="item in likes">
                <a class="dropdown-item">{{item.user + item.text }} <u>"{{ item.titre }}"</u>. <span
                        id="date">{{ item.date}}</span></a>
                <!-- <ul class="dropdown-item" v-for="item in likes">
                    <li class="dropdown-item">
                        {{ item.user }} a like votre post {{ item.postId }}. {{ item.titre }} le {{ item.date }}
                    </li>
                </ul> -->
            </div>
            <div v-for="item in comments">
                <a class="dropdown-item" href="#">{{ item.user + item.text }} <u>"{{ item.titre }}"</u>. <span
                        id="date">{{ item.date }}</span></a>
            </div>
            <div v-for="item in follow">
                <a class="dropdown-item" href="#">{{ item.user + item.text }}. <span id="date">{{ item.date }}</span></a>
            </div>
            <div v-for="item in share">
                <a class="dropdown-item" href="#">{{ item.user + item.text }} <u>"{{ item.titre }}"</u>. <span id="date">{{ item.date }}</span></a>
            </div>
        </div>`,
    methods: {
        getLikes: function () {
            axios.get('http://localhost:3000/notifLike', {
                params: {
                    mail: localStorage.mail
                }
            }).then(notifLike => {
                for (let i = 0; i < notifLike.data.length; i++) {
                    axios.get('http://localhost:3000/unUtilisateur', {
                        params: {
                            mail: notifLike.data[i].FK_utilisateur_mail
                        }
                    }).then(unUtilisateur => {
                        let d = new Date(notifLike.data[i].date_like);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.likes.push({
                            user: unUtilisateur.data[0].pseudo,
                            text: " a aimé votre post",
                            titre: notifLike.data[i].titre,
                            postId: notifLike.data[i].FK_post_id,
                            date: diffDays + " jours"
                        });
                    });
                }
            });
        },
        getComments: function () {
            axios.get('http://localhost:3000/notifCom', {
                params: {
                    mail: localStorage.mail
                }
            }).then(notifCom => {
                for (let i = 0; i < notifCom.data.length; i++) {
                    axios.get('http://localhost:3000/unUtilisateur', {
                        params: {
                            mail: notifCom.data[i].FK_utilisateur_mail
                        }
                    }).then(unUtilisateur => {
                        let d = new Date(notifCom.data[i].date_commentaire);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.comments.push({
                            user: unUtilisateur.data[0].pseudo,
                            text: " a commenté votre post",
                            titre: notifCom.data[i].titre,
                            postId: notifCom.data[i].FK_post_id,
                            date: diffDays + " jours"
                        });
                    });
                }
            });
        },
        getFollow: function () {
            axios.get('http://localhost:3000/notifFollow', {
                params: {
                    mail: localStorage.mail
                }
            }).then(notifFollow => {
                for (let i = 0; i < notifFollow.data.length; i++) {
                    axios.get('http://localhost:3000/unUtilisateur', {
                        params: {
                            mail: notifFollow.data[i].FK_utilisateur_mail_2
                        }
                    }).then(unUtilisateur => {
                        let d = new Date(notifFollow.data[i].date_follow);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.follow.push({
                            user: unUtilisateur.data[0].pseudo,
                            text: " a commencé à vous suivre",
                            date: diffDays + " jours"
                        });
                    });
                }
            });
        },
        getShare: function () {
            axios.get('http://localhost:3000/notifPartage', {
                params: {
                    mail: localStorage.mail
                }
            }).then(notifPartage => {
                for (let i = 0; i < notifPartage.data.length; i++) {
                    axios.get('http://localhost:3000/unUtilisateur', {
                        params: {
                            mail: notifPartage.data[i].FK_utilisateur_mail
                        }
                    }).then(unUtilisateur => {
                        let d = new Date(notifPartage.data[i].date_partage);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.share.push({
                            user: unUtilisateur.data[0].pseudo,
                            text: " a partagé votre post",
                            titre: notifPartage.data[i].titre,
                            postId: notifPartage.data[i].FK_post_id,
                            date: diffDays + " jours"
                        });
                    });
                }
            });
        }
    },
    created: function () {
        this.getLikes();
        this.getComments();
        this.getFollow();
        this.getShare();
    }
})
;

/* Modification of the user information and password */
new Vue({
    el: "#config",
    data: function () {
        return {
            display_notif: false
        }
    },
    template: `
        <div>
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