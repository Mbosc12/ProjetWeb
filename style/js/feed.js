/* All the post from accounts the user follow */
const v = new Vue({
    el: "#feed",
    data: function () {
        return {
            prenom: localStorage.prenom,
            pseudo: localStorage.username,
            today: new Date,
            feed: []
        }
    },
    template: `
        <div id="feed">
            <button v-on:click="test('villecomtal')">Appuie ici pour voir ta ville</button>
            <div id="posts">
                <ul v-for="item in feed">
                    <li id="user"><a>@{{ item.user }}</a></li>
                    <li id="title">{{ item.title }}</li>
                    <li id="photopost"><img :src="'style/img/'+item.photo" id="photoDuPost"></li>
                    <li id="content">
                        <div id="msg">{{ item.msg }}</div>
                        <div id="ville">{{ item.ville}}</div>
                        <div id="date_event">{{ item.date_event }}</div>
                        <div id="map" style="width:600px; height:auto" >{{ item.ville }}</div>
                    </li>
                    <li id="date">{{ item.date }} jours</li>
                </ul>
            </div>
            <div id="user_card">
                <div id="img"><img id="uneImage"></div>
                <div id="text"><a href="mon-profil">{{ pseudo }}</a>
                    <p id="prenom">{{ prenom }}</p></div>

            </div>
        </div>`,
    methods: {
        cart: function (lat, long) {
            const map = L.map('map').setView([lat, long], 15); // LIGNE 18

            const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            });

            map.addLayer(osmLayer);

            L.marker([lat, long]).addTo(map);
        },
        test: function (adress) {
            axios.get('https://api-adresse.data.gouv.fr/search/', {
                headers: {
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        q: adress
                    }
                }
            }).then(data => {
                const lat = data.features[0].geometry.coordinates[1];
                const long = data.features[0].geometry.coordinates[0];

                this.cart(lat, long);
            });
        },
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
        get_info: function () {
            /* ----- Get user profile picture ------ */
            axios.get('http://localhost:3000/photoProfil', {
                params: {
                    photoId: localStorage.photoprofil,
                    mail: localStorage.mail
                }
            }).then(response => {
                document.getElementById("uneImage").src = "style/img/" + response.data[0].titre;
            });
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
                            //console.log(unPost);
                            if (unPost.data.length !== 0) {
                                if (unPost.data[0].date_event != null) {
                                    let d = new Date(unPost.data[0].date_event);
                                    console.log(unPost);

                                    const diffTime = Math.abs(this.today - d);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                    this.feed[i].date_event = diffDays;
                                } else {
                                    this.feed[i].date_event = null;
                                }

                                this.feed[i].title = unPost.data[0].titre;
                                this.feed[i].msg = unPost.data[0].message;
                                this.feed[i].ville = unPost.data[0].ville;

                                /* -------------------- Get post photo -------------------- */
                                await axios.get('http://localhost:3000/getPhotoPost', {
                                    params: {
                                        id_post: this.feed[i].IDpost
                                    }
                                }).then(async getPhotoPost => {
                                    this.feed[i].photo = getPhotoPost.data[0].titre;
                                });
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
        this.get_info();
        this.get_posts();
    }
});