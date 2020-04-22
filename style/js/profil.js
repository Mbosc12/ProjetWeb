
//VUE JS
let publication = {
    props: {
        message: String,
        listlike: Array,
        shares: Array,
        Comments: Array
    },
    template: `<div class="publication">
                    <p>{{ message }} </p>
                    <div class="interaction">
                        <div class="event">
                            <button class="btnlike btnevent"> Likes : {{listlike.length}}                             
                                <ul class="l-liste">
                                    <li v-for="like in listlike">
                                        <p>{{ like.pseudo }}</p>
                                    </li>
                                </ul>
                            </button>
                            <button class="btnshare btnevent"> Partager </button>
                        </div>
                        <button> Afficher les commentaires </button>
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
    },
	components: { categorie, state, user, publication},
	data: {
		GretaPic: "",
		posts: [],
		infos: [],
		followers: [],
        likes: []
	},
	methods: {
        FetchPosts() {
        axios.get('http://localhost:3000/AllPostUtilisateur', {
        	params: {
				mail: localStorage.username
        	}
        }).then(response => {
            this.posts = response.data;
            for (var i = 0; i < response.data.length; i++ ) {
                this.FetchLikes(response.data[i].PK_post_id)
            }
            });
        },
        FetchFollowers() {
        axios.get('http://localhost:3000/Followers', {
        	params: {
				mail: localStorage.username
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
            this.likes.push(response.data);
            console.log("ici c'est likes")

            });
        },
        FetchInfos() {
        axios.get('http://localhost:3000/unUtilisateur', {
        	params: {
				mail: localStorage.username
        	}
        }).then(response => {
            this.FetchPhotoProfil(response.data[0].photo_profil);
            this.infos = response.data[0];
            });
        },
        ActivedCat() {
            console.log(this)
        },
        FetchPhotoProfil: function(photo_profil){
            var email = 'admin@gmail.com';
            var photo = '1';
            if(photo_profil!=null){
                email = localStorage.username;
                photo = photo_profil;
            }
            axios.get('http://localhost:3000/photoProfil', {
                params: {
                    mail: email,
                    photoId : photo
                }
            }).then(response => {
                this.GretaPic =  "style/img/"+response.data[0].titre; 
            });
        }
	}
})
