/* All the post from accounts the user follow */
const v = new Vue({
    el: "#feed",
    data: function () {
        return {
            prenom: localStorage.prenom,
            pseudo: localStorage.username,
            today: new Date,
            feed: [],
            comments: [],
            like: true,
            comment: true,
            share: true
        }
    },
    template: `
        <div id="feed">
            <div id="posts">
                <ul v-for="item in feed" >
                    <li id="user"><a>@{{ item.user }}</a></li>
                    <li id="title">{{ item.title }}</li>
                    <li id="photopost"><img :src="'style/img/'+item.photo" id="photoDuPost" alt="img"></li>
                    <li id="postContent">
                            <svg v-on:click="add_like(item.IDpost, item)" :class="[like ? 'bi-heart' : 'bi-heart-fill', 'bi']" viewBox="0 0 16 16"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      :d="[like ? 'M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z' : 'M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z']"
                                      clip-rule="evenodd"/>
                            </svg>
                        
                            <svg v-on:click="add_comment" class="bi bi-chat-dots" viewBox="0 0 16 16" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                                      clip-rule="evenodd"/>
                                <path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                            </svg>
                        
                            <svg v-on:click="add_share" class="bi bi-reply" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9.502 5.013a.144.144 0 00-.202.134V6.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 011.921-.306 7.403 7.403 0 01.798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 01.042-.028.147.147 0 000-.252.494.494 0 01-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/>
                            </svg>
                    </li>
                    <li>
                        <div id="description">
                            <div><strong>{{ item.nbLike }} Like</strong></div>
                            <div id="msg"><strong>{{ item.user }}</strong> {{ item.msg }}</div>
                            <div v-for="c in item.commentaire">
                                <strong>{{ c.author }}</strong> 
                                {{ c.commentaire }} 
                                <span id="date_commentaire">Il y a {{ c.date_commentaire }} jours</span>
                            </div>
                            <div id="ville">{{ item.ville}}</div>
                            <div id="date_event">{{ item.date_event }}</div>
                            <div id="map" style="width:600px; height:auto">{{ item.ville }}</div>
                        </div>
                    </li>
                    <li id="add_comment">
                        
                    </li>
                    <li id="date">Il y a {{ item.date }} jours</li>
                </ul>
            </div>
            <div id="user_card">
                <div id="img"><img id="uneImage"></div>
                <div id="text"><a href="mon-profil">{{ pseudo }}</a>
                    <p id="prenom">{{ prenom }}</p></div>

            </div>
        </div>`,
    methods: {
        add_like: function (item, id) {
            if (this.like === true) {
                id.nbLike += 1;
                axios.get('http://localhost:3000/AjoutLike', {
                    params: {
                        postId: item,
                        mail: localStorage.mail
                    }
                }).then(AjoutLike => {
                    if (AjoutLike.data.affectedRows === 1){
                        console.log(AjoutLike);
                    }
                });
            }

            if (this.like === false) {
                id.nbLike -= 1;
                axios.get('http://localhost:3000/EnleveLike', {
                    params: {
                        post: item,
                        mail: localStorage.mail
                    }
                }).then(EnleveLike => {
                    if (EnleveLike.data.affectedRows === 1){
                        console.log(EnleveLike);
                    }
                });
            }

            this.like = !this.like;
        },
        add_comment: function () {
            console.log("comment");
        },
        add_share: function () {
            console.log("share");
        },
        compare_feed: function (a, b) {
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
        compare_commentaire: function (a, b) {
            const dateA = a.date_commentaire;
            const dateB = b.date_commentaire;

            let comparison = 0;
            if (dateA < dateB) {
                comparison = 1;
            } else if (dateA > dateB) {
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
                if (showFeed.data.length !== 0) {
                    for (let i = 0; i < showFeed.data.length; i++) {
                        let d = new Date(showFeed.data[i].date_publication);

                        const diffTime = Math.abs(this.today - d);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        this.feed.push({
                            date: diffDays,
                            IDpost: showFeed.data[i].id_post
                        });

                        this.comments.push({
                            IDpost: showFeed.data[i].id_post,
                            commentaire: []
                        });

                        await axios.get('http://localhost:3000/LikePost', {
                            params: {
                                id: this.feed[i].IDpost
                            }
                        }).then(async LikePost => {
                            this.feed[i].nbLike = LikePost.data.length;
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
                                if (unPost.data[0].date_event != null) {
                                    let d = new Date(unPost.data[0].date_event);

                                    const diffTime = Math.abs(this.today - d);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                    this.feed[i].date_event = diffDays;
                                } else {
                                    this.feed[i].date_event = null;
                                }

                                this.feed[i].title = unPost.data[0].titre;
                                this.feed[i].msg = unPost.data[0].message;
                                this.feed[i].ville = unPost.data[0].ville;

                                /* -------------------- Get post author username -------------------- */
                                await axios.get('http://localhost:3000/unUtilisateur', {
                                    params: {
                                        mail: unPost.data[0].FK_utilisateur_mail
                                    }
                                }).then(unUtilisateur => {
                                    /* --- Posts properties --- */
                                    this.feed[i].user = unUtilisateur.data[0].pseudo;
                                });

                                /* -------------------- Get post photo -------------------- */
                                await axios.get('http://localhost:3000/getPhotoPost', {
                                    params: {
                                        id_post: this.feed[i].IDpost
                                    }
                                }).then(async getPhotoPost => {
                                    this.feed[i].photo = getPhotoPost.data[0].titre;
                                });

                                /* -------------------- Get post comments -------------------- */
                                await axios.get('http://localhost:3000/AllCommentairePost', {
                                    params: {
                                        postId: this.comments[i].IDpost
                                    }
                                }).then(async AllCommentairePost => {
                                    if (AllCommentairePost.data.length > 0) {
                                        for (let j = 0; j < AllCommentairePost.data.length; j++) {
                                            if (this.comments[i].IDpost === AllCommentairePost.data[j].FK_post_id) {
                                                let d = new Date(AllCommentairePost.data[j].date_commentaire);

                                                const diffTime = Math.abs(this.today - d);
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                                this.comments[i].commentaire.push({
                                                    id_commentaire: AllCommentairePost.data[j].id_commentaire,
                                                    date_commentaire: diffDays,
                                                    author: AllCommentairePost.data[j].FK_utilisateur_mail,
                                                    commentaire: AllCommentairePost.data[j].message_commentaire
                                                });
                                            }
                                        }
                                    }
                                });

                                /* -------------------- Get post comments author -------------------- */
                                for (let i = 0; i < this.comments.length; i++) {
                                    for (let j = 0; j < this.comments[i].commentaire.length; j++) {
                                        await axios.get('http://localhost:3000/unUtilisateur', {
                                            params: {
                                                mail: this.comments[i].commentaire[j].author
                                            }
                                        }).then(unUtilisateur => {
                                            if (unUtilisateur.data.length > 0) {
                                                this.comments[i].commentaire[j].author = unUtilisateur.data[0].pseudo
                                            }
                                        });
                                        this.comments[i].commentaire.sort(this.compare_commentaire);
                                    }
                                }
                            }
                            this.feed[i].commentaire = this.comments[i].commentaire;
                            this.feed.sort(this.compare_feed);

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