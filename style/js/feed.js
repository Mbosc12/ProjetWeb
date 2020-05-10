/* Last name and first name of the user */
new Vue({
    el: "#connected",
    data: function () {
        return {
            nom: localStorage.nom,
            prenom: localStorage.prenom
        }
    },
    template: `
        <div id="user_card">Vous êtes connecté(e) en tant que : {{ nom }} {{ prenom }}</div>`
});

/* All the post from accounts the user follow */
const v = new Vue({
    el: "#feed",
    data: function () {
        return {
            today: new Date,
            feed: []
        }
    },
    template: `
        <div id="posts">
            <ul>
                <li v-for="item in feed">
                    <div id="user">@{{ item.user }}</div>
                    <div id="title">{{ item.title }}</div>
                    <div id="msg">{{ item.msg }}</div>
                    <div id="date">{{ item.date }} jours</div>
                </li>
            </ul>
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
        get_posts: async function () {
            /* -------------------- Get id post + publication date -------------------- */
            await axios.get('http://localhost:3000/showFeed', {
                params: {
                    mail: localStorage.mail
                }
            }).then(async showFeed => {
                //console.log(showFeed); //date_publication + id_post
                if (showFeed.data.length !== 0) {
                    for (let i = 0; i < showFeed.data.length; i++) {
                        let d = new Date(showFeed.data[i].date_publication);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.feed.push({
                            date: diffDays,
                            IDpost: showFeed.data[i].id_post
                        });
                    }
                    for (let i = 0; i < this.feed.length; i++) {
                        /* -------------------- Get post information -------------------- */
                        await axios.get('http://localhost:3000/unPost', {
                            params: {
                                postId: this.feed[i].IDpost
                            }
                        }).then(async unPost => {
                            if (unPost.data.length !== 0) {
                                this.feed[i].title = unPost.data[0].titre;
                                this.feed[i].msg = unPost.data[0].message;

                                /* -------------------- Get post author username -------------------- */
                                await axios.get('http://localhost:3000/unUtilisateur', {
                                    params: {
                                        mail: unPost.data[0].FK_utilisateur_mail
                                    }
                                }).then(unUtilisateur => {
                                    /* --- Posts properties --- */
                                    this.feed[i].user = unUtilisateur.data[0].pseudo;
                                });
                            }
                            this.feed.sort(this.compare);
                            return this.feed;
                        });
                    }
                }
            });
        },
    },
    created: function () {
        this.get_posts();
    }
});