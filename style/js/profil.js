let pub = {
    props: {
        message: String,
        likes: Array,
        shares: Array,
        Comments: Array
    },
    template: `<div class="publication">
                    <p>{{ message }} </p>
                    <div class="interaction">
                        <div class="event">
                            <button> Likes : {{likes.length}} </button>
                            <button> Partager </button>
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
	template: `<div class="col-4 cat act" >
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
    },
	components: { categorie, state, user, pub},
	data: {
		GretaPic: "style/img/greta.png",
		posts: [],
		infos: [],
		followers: [],
		templike: "",
		likes: []
	},
	methods: {
        show: function(){
            return Array("Jean", "Jack")
        },
        FetchPosts() {

        axios.get('http://localhost:3000/Post', {
        	params: {
				mail: 'gretathunberg@gmail.com'
        	}
        }).then(response => {
            this.posts = response.data;
            });
        },
        FetchFollowers() {
        axios.get('http://localhost:3000/Followers', {
        	params: {
				mail: 'gretathunberg@gmail.com'
        	}
        }).then(response => {
            this.followers = response.data;
            });
        },
        FetchLikes: function(pid){
            var test = []
        axios.get('http://localhost:3000/Likes', {
        	params: {
				id: pid
        	}
        }).then(response => {
            var lk = []
            for(var i = 0; i < response.data.length; i++) {
                lk.push(response.data[i].pseudo)
            }

                this.likes.push(lk)
            });
        },
        FetchInfos() {
        axios.get('http://localhost:3000/unUtilisateur', {
        	params: {
				mail: 'gretathunberg@gmail.com'
        	}
        }).then(response => {
            this.infos = response.data[0];
            });
        }
	}
})