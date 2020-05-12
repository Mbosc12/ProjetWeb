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
            localStorage.clear();
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
            share: [],
            notifications: []
        }
    },
    template: `
        <div id="likes">
            <div id="text" v-for="item in notifications">
                <a class="dropdown-item"><strong>{{ item.user }}</strong>{{ item.text }}<u>{{ item.titre }}</u>.
                    <p id="date">{{ item.date}} jours</p></a>
            </div>
        </div>`,
    methods: {
        compare: function (a, b) {
            const dateA = a.date;
            const dateB = b.date;

            let comparison = 0;
            if (dateA > dateB) {
                comparison = 1;
            } else if (dateA < dateB) {
                comparison = -1;
            }
            return comparison;
        },
        getNotifications: async function () {
            /* -------------------- Get likes -------------------- */
            await axios.get('http://localhost:3000/notifLike', {
                params: {
                    mail: localStorage.mail
                }
            }).then(async notifLike => {
                for (let i = 0; i < notifLike.data.length; i++) {
                    let d = new Date(notifLike.data[i].date_like);

                    const diffTime = Math.abs(this.today - d);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    this.likes.push({
                        mail: notifLike.data[i].FK_utilisateur_mail,
                        text: " a aimé votre post ",
                        titre: '"' + notifLike.data[i].titre + '"',
                        postId: notifLike.data[i].FK_post_id,
                        date: diffDays
                    });
                }
                for (let j = 0; j < this.likes.length; j++) {
                    axios.get('http://localhost:3000/unUtilisateur', {
                        params: {
                            mail: this.likes[j].mail
                        }
                    }).then(unUtilisateur => {
                        this.likes[j].user = unUtilisateur.data[0].pseudo
                    });
                    this.notifications.push(this.likes[j]);

                }

                /* -------------------- Get comments -------------------- */
                await axios.get('http://localhost:3000/notifCom', {
                    params: {
                        mail: localStorage.mail
                    }
                }).then(async notifCom => {
                    for (let i = 0; i < notifCom.data.length; i++) {
                        let d = new Date(notifCom.data[i].date_commentaire);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.comments.push({
                            mail: notifCom.data[i].FK_utilisateur_mail,
                            text: " a commenté votre post ",
                            titre: '"' + notifCom.data[i].titre + '"',
                            postId: notifCom.data[i].FK_post_id,
                            date: diffDays
                        });
                    }
                    for (let j = 0; j < this.comments.length; j++) {
                        axios.get('http://localhost:3000/unUtilisateur', {
                            params: {
                                mail: this.comments[j].mail
                            }
                        }).then(unUtilisateur => {
                            this.comments[j].user = unUtilisateur.data[0].pseudo
                        });
                        this.notifications.push(this.comments[j]);
                    }

                    /* -------------------- Get follow -------------------- */
                    await axios.get('http://localhost:3000/notifFollow', {
                        params: {
                            mail: localStorage.mail
                        }
                    }).then(async notifFollow => {
                        for (let i = 0; i < notifFollow.data.length; i++) {
                            let d = new Date(notifFollow.data[i].date_follow);

                            const diffTime = Math.abs(this.today - d);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            this.follow.push({
                                mail: notifFollow.data[i].FK_utilisateur_mail_2,
                                text: " a commencé à vous suivre",
                                titre: null,
                                date: diffDays
                            });
                        }
                        for (let j = 0; j < this.follow.length; j++) {
                            axios.get('http://localhost:3000/unUtilisateur', {
                                params: {
                                    mail: this.follow[j].mail
                                }
                            }).then(unUtilisateur => {
                                this.follow[j].user = unUtilisateur.data[0].pseudo
                            });
                            this.notifications.push(this.follow[j]);
                        }

                        /* -------------------- Get share -------------------- */
                        await axios.get('http://localhost:3000/notifPartage', {
                            params: {
                                mail: localStorage.mail
                            }
                        }).then(async notifPartage => {
                            for (let i = 0; i < notifPartage.data.length; i++) {
                                let d = new Date(notifPartage.data[i].date_partage);

                                const diffTime = Math.abs(this.today - d);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                this.share.push({
                                    mail: notifPartage.data[i].FK_utilisateur_mail_2,
                                    text: " a partagé votre post ",
                                    titre: '"' + notifPartage.data[i].titre + '"',
                                    postId: notifPartage.data[i].FK_post_id,
                                    date: diffDays
                                });
                            }
                            for (let j = 0; j < this.share.length; j++) {
                                axios.get('http://localhost:3000/unUtilisateur', {
                                    params: {
                                        mail: this.share[j].mail
                                    }
                                }).then(unUtilisateur => {
                                    this.share[j].user = unUtilisateur.data[0].pseudo;
                                });
                                this.notifications.push(this.share[j]);
                            }

                            /* -------------------- Get notifications -------------------- */
                            this.notifications.sort(this.compare);
                            return this.notifications;
                        });
                    });
                });
            });
        }
    },
    created: function () {
        this.getNotifications();
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