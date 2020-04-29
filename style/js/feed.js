/* Last name and first name of the user */
new Vue({
    el: "#connected",
    data: function () {
        return {
            nom: localStorage.nom,
            prenom: localStorage.prenom
        }
    },
    template: `<div id="user_card">Vous êtes connecté(e) en tant que : {{ nom }} {{ prenom }}</div>`
});

/* All the post from accounts we follow */
const v = new Vue({
    el: "#feed",
    data: function () {
        return {
            id_post: [],
            post_complets: [],
            items: [],
            date: [],
        }
    },
    template: `<div id="posts">
                   <ul>
                      <li v-for="item in items">
                        <div id="user">@{{ item.user }}</div>
                        <div id="title">{{ item.title }}</div>
                        <div id="msg">{{ item.msg }}</div>
                        <div id="date">{{ item.date }}</div>
                      </li>
                   </ul>
               </div>`,
    methods: {
        get_posts: function () {
            axios.get('http://localhost:3000/showFeed', {
                params: {
                    mail: localStorage.mail
                }
            }).then(showFeed => {

                // Test debug
                /*
                for (let i = 0; i < showFeed.data.length; i++) {
                    // on est sensé avoir 4 3 1 2 
                    console.log("posts : "+ showFeed.data[i].id_post);
                    console.log("dates : "+ showFeed.data[i].date_publication);
                }
                */
                // fin test
                
                if (showFeed.data.length !== 0) {
                    for (let i = 0; i < showFeed.data.length; i++) {
                        this.id_post.push(showFeed.data[i].id_post);
                    }
                    for (let i = 0; i < showFeed.data.length; i++) {
                        this.date.push(showFeed.data[i].date_publication);
                    }

                    // verif ip_post et date
                    /*
                    console.log("après for ");
                    console.log("id_post : "+ this.id_post);
                    console.log("date : "+ this.date);
                    */
                    // fin test
                    // test lecture avec un for
                    /*
                    for (let i = 0; i < this.id_post.length; i++) {
                        console.log(i +" : "+ this.id_post[i]+" : "+ this.date[i]);
                    }
                    */
                    //fin test

                    for (let i = 0; i < this.id_post.length; i++) {
                        axios.get('http://localhost:3000/unPost', {
                            params: {
                                postId: this.id_post[i]
                            }
                        }).then(unPostRes => {
                            
                            // test retour de unPost 
                               // console.log("un post : "+ unPostRes.data[0]);
                            //fin test jusqu'ici c'est ok
                            //console.log(" i après : "+i);
                            //console.log("idpost : "+this.id_post[i]);
                            // le i ici est caca mais marche en fonction de je ne sais quoi sur certains trucs

                            this.post_complets[this.id_post[i]] = unPostRes.data[0];
                            
                            console.log(i+" : "+"post_complets : "+this.post_complets[this.id_post[i]].PK_post_id+" "+this.post_complets[this.id_post[i]].FK_utilisateur_mail+" "+this.post_complets[this.id_post[i]].titre+" "+this.post_complets[this.id_post[i]].message+" "+this.date[i]);

                            if (unPostRes.data.length !== 0) {
                                /* --- User username --- */
                                axios.get('http://localhost:3000/unUtilisateur', {
                                    params: {
                                        mail: this.post_complets[this.id_post[i]].FK_utilisateur_mail
                                    }
                                }).then(unUtilisateur => {
                                    //Test
                                    console.log("i : "+i+" idpost[i] : "+this.id_post[i]+" mail : "+this.post_complets[this.id_post[i]].FK_utilisateur_mail);
                                    console.log(" date : "+this.date[i]);
                                    // fin test
                                    let d = new Date(this.date[i]);
                                    let day = d.getDate();
                                    let month = d.getMonth()+1;
                                    let year = d.getFullYear();
                                    let new_date = day + "-" + month + "-" + year;

                                    /* --- Posts properties --- */
                                    v.items.push({
                                        user: unUtilisateur.data[0].pseudo,
                                        title: unPostRes.data[0].titre,
                                        msg: unPostRes.data[0].message,
                                        date: new_date
                                    });
                                });
                            }
                        });
                    }
                    // Test 
                    /*
                    for (let i = 0; i < this.post_complets.length; i++) {
                        console.log(i +" : "+ this.post_complets[i]);
                    }
                    */
                    //fin test
                }
            });
        },
    },
    created: function () {
        this.get_posts();
    }
});

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
            localStorage.datenaiss = "",
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