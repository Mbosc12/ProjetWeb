let user = {
	props: {
		name: String
	},
	template: `<h1 class="heading">{{ name }}</h1>`
}

let state = {
	props: {
		country: String,
		city: String
	},
	template: `<div class="location">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
		  				<path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
					</svg>
		        	<p>{{city}}, {{country}}</p>
		        </div>`
}

let categorie = {
	props: {
		count: Number,
		type: String
	},
	template: `<div class="col-4 cat act">
				    <h4> {{ count }} </h4>
	            	<p> {{ type }} </p>
			 </div>`
}

let vm = new Vue({
	el: '#app',
    created() {
        this.FetchMail(localStorage.searchname);
        this.FetchPosts();
        this.FetchFollowers();
        this.FetchInfos();
        this.FetchPhotoProfil();
        this.FetchPhoto();
    },
	components: {categorie, state, user},
	data: {
        showModal: null,
        modalContent: null,
        modalLike: null,
        modalComments: null,

		imagePic: "",
        infos: [],

		posts: [],
		followers: [],

        likes: [],
        nblikes: null,
        
        comments: [],
        nbcomments: [],

        items: [],

        user: null
	},
	methods: {
        FetchMail: function(name) {
        axios.get('http://localhost:3000/getMail', {
            params: {
                pseudo: name
            }
        }).then(response => {

            localStorage.mailofuser = response.data[0].mail;
            this.FetchPosts();
            this.FetchFollowers();
            this.FetchInfos();
            this.FetchPhotoProfil();
            this.FetchPhoto();
            });
        },
        FetchPosts() {
        axios.get('http://localhost:3000/AllPostUtilisateur', {
        	params: {
				mail: localStorage.mailofuser
        	}
        }).then(response => {

            this.posts = response.data;
            });
        },
        FetchFollowers() {
        axios.get('http://localhost:3000/Followers', {
        	params: {
				mail: localStorage.mailofuser
        	}
        }).then(response => {

            this.followers = response.data;
            });
        },
        FetchLikes: function(pid){
        axios.get('http://localhost:3000/LikePost', {
        	params: {
				id: pid
        	}
        }).then(response => {

            this.nblikes = response.data.length;
            this.likes = response.data;
            });
        },
        FetchComments: function(pid) {
            axios.get('http://localhost:3000/AllCommentairePost', {
                params: {
                    postId: pid
                }
            }).then(response => {
                console.log(response.data)
                this.nbcomments = response.data.length;
                this.comments = response.data;
            })
        },
        FetchInfos() {

        axios.get('http://localhost:3000/unUtilisateur', {
        	params: {
				mail: localStorage.mailofuser
        	}
        }).then(response => {
                this.FetchPhotoProfil(response.data[0].photo_profil);
                this.infos = response.data[0];

            });
        },
        FetchPhotoProfil: function(photo_profil){
            var email = 'admin@gmail.com';
            var photo = '1';
            if(photo_profil!=null){
                email = localStorage.mailofuser;
                photo = photo_profil;
            }
            axios.get('http://localhost:3000/photoProfil', {
                params: {
                    mail: email,
                    photoId : photo
                }
            }).then(response => {
                this.imagePic =  "style/img/"+response.data[0].titre; 
            });
        },
        FetchPhoto() {

        axios.get('http://localhost:3000/AllPhoto', {
            params: {
                mail: localStorage.mailofuser
            }
        }).then(response => {
            this.items = response.data;
            });
        },
        searchContent: function(image) {
            for(var i = 0; i < this.posts.length; i++ ) {
                if(this.posts[i].PK_post_id == image) {
                    this.modalContent = this.posts[i].message;
                }
            }
            this.FetchLikes(image)
            this.FetchComments(image)
        }
	}
});


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

new Vue ({
    el: "#likes",
    data: function() {
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

new Vue ({
    el: "#config",
    data: function() {
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