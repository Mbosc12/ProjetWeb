let userfollow = {
    props: {
        pseudo: String,
        img: String
    },
    template: `<div class="followuser">
                    <img :src="{{img}}" :alt="{{pseudo}} photo">
                    <div class="left-side">
                        <span>{{pseudo}}</span>
                        <button>Voir le profil</button>
                    </div>
                </div>`
}

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
        this.FetchPosts();
        this.FetchFollowers();
        this.FetchInfos();
        this.FetchPhotoProfil();
        this.FetchPhoto();
    },
	components: {categorie, state, user, userfollow},
	data: {
        showModal: null,
        modalContent: null,
        modalVille: null,
        modalDate: null,
        modalLike: null,
        modalComments: null,

		imagePic: "",
        infos: [],

		posts: [],
        events: [],
		followers: [],

        likes: [],
        nblikes: null,
        
        comments: [],
        nbcomments: [],

        items: []
	},
	methods: {
        FetchPosts() {
        axios.get('http://localhost:3000/AllPostUtilisateur', {
        	params: {
				mail: localStorage.mail
        	}
        }).then(response => {
            for(var i = 0; i < response.data.length; i++) {
                if(response.data[i].ville != null) {
                    this.FetchImage(response.data[i], response.data[i].PK_post_id)
                }
            }
            console.log(this.events)
                this.posts = response.data
            });
        },
        FetchFollowers() {
        axios.get('http://localhost:3000/Followers', {
        	params: {
				mail: localStorage.mail
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
                this.nbcomments = response.data.length;
                this.comments = response.data;
            })
        },
        FetchInfos() {
        axios.get('http://localhost:3000/unUtilisateur', {
        	params: {
				mail: localStorage.mail
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
                email = localStorage.mail;
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
                mail: localStorage.mail
            }
        }).then(response => {
            this.items = response.data;
            });
        },
        searchContent: function(image, ville, date) {
            for(var i = 0; i < this.posts.length; i++ ) {
                if(this.posts[i].PK_post_id == image) {

                    this.modalContent = this.posts[i].message;
                }
            }
            this.modalVille = ville;
            console.log(date)
            this.modalDate = date;
            this.FetchLikes(image)
            this.FetchComments(image)
        },
        FetchImage: function(post, pid) {
            axios.get('http://localhost:3000/getImage', {
                params: {
                    FK_post_id: pid
                }
            }).then(response => {
                this.events.push([post, response.data])
                });
            }
	}
});


