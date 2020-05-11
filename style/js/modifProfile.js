new Vue({
    el: "#form",
    data: function () {
        return {
            pseudo: "",
            nom: "",
            prenom: "",
            mail: "",
            motdepass: "",
            date_naissance: "",
            sexe: "",
            pays: "",
            cp: "",
            ville: "",
            adresse: "",
            photo_titre: "",
            photo_id: localStorage.photoprofil,
            date_inscription: "",
            display_success: false,
        }
    },
    template: `
        <div id="content">
            <ul>
                <li id="photo">
                    <div id="img"><img id="uneImage">{{ pseudo }}</div>
                    <div id="modifPhoto">Modifier la photo de profil <br> <input id="inputFile" type="file"></div>
                </li>
                <li>
                    <label><strong>Nom</strong></label>
                    <input type="text" id="nom" name="nom" v-model="nom" placeholder="Nom">
                </li>
                <li>
                    <label><strong>Prénom</strong></label>
                    <input type="text" id="prenom" name="prenom" v-model="prenom" placeholder="prenom">
                </li>
                <li>
                    <label><strong>Nom d'utilisateur</strong></label>
                    <input type="text" id="username" name="username" v-model="pseudo" placeholder="Username">
                </li>
            </ul>
            <div id="text">
                <strong>Informations personnelles</strong><br>
                Fournissez vos informations personnelles. Seuls votre ville et pays apparaîtront sur votre profil
                public.
            </div>
            <ul id="content_ul">
                <!--<li>
                    <label><strong>Adresse e-mail</strong></label>
                    <input type="email" id="mail" name="mail" v-model="new_mail" placeholder="Email">
                </li>-->
                <li>
                    <label><strong>Date de naissance</strong></label>
                    <input type="date" id="datenaiss" name="datenaiss" v-model="date_naissance" placeholder="datenaiss">
                </li>
                <li><label><strong>Sexe</strong></label>
                    <select name="pets" class="custom-select" id="select" v-model="sexe">
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                        <option value="A">Autre</option>
                    </select></li>
                <li>
                    <label><strong>Adresse</strong></label>
                    <input type="text" id="email" name="email" v-model="adresse" placeholder="Email">
                </li>
                <li>
                    <label><strong>Code postal</strong></label>
                    <input type="text" id="email" name="email" v-model="cp" placeholder="Email">
                </li>
                <li>
                    <label><strong>Ville</strong></label>
                    <input type="text" id="email" name="email" v-model="ville" placeholder="Email">
                </li>
                <li>
                    <label><strong>Pays</strong></label>
                    <input type="text" id="email" name="email" v-model="pays" placeholder="Email">
                </li>
            </ul>
            <button type="submit" id="submit" class="btn btn-success btn-sm" v-on:click="send">Envoyer</button>

            <!-- Alert : informations changed -->
            <div class="alert alert-success alert-dismissible fade show" id="alert" role="alert" v-if="display_success">
                Vos <strong>informations</strong> ont bien été modifiées.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="close_success">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>`,
    methods: {
        close_success: function () {
            this.display_success = false;
        },
        getInfo: function () {
            /* ----- Get user profile picture ------ */
            axios.get('http://localhost:3000/photoProfil', {
                params: {
                    photoId: localStorage.photoprofil,
                    mail: localStorage.mail
                }
            }).then(response => {
                document.getElementById("uneImage").src = "style/img/" + response.data[0].titre;
            });

            /* ----- Get user personal information ----- */
            axios.get('http://localhost:3000/unUtilisateur', {
                params: {
                    mail: localStorage.mail,
                }
            }).then(response => {
                if (response.data.length !== 0) {
                    this.pseudo = response.data[0].pseudo;
                    this.nom = response.data[0].nom;
                    this.prenom = response.data[0].prenom;
                    for (let i = 0; i < 10; i++) {
                        this.date_naissance += response.data[0].date_naissance[i];
                    }
                    this.sexe = response.data[0].sexe;
                    this.mail = response.data[0].mail;
                    this.adresse = response.data[0].adresse;
                    this.cp = response.data[0].CP;
                    this.ville = response.data[0].ville;
                    this.pays = response.data[0].pays;
                    this.photo_id = response.data[0].photo_profil;
                } else {
                    console.log("erreur");
                }
            });
        },
        send: async function () {
            const input = document.getElementById("inputFile").value;
            if (input.length > 0) {
                const split = input.split("\\");
                this.photo_titre = split[split.length - 1];
                await axios.get('http://localhost:3000/ajoutPhoto', {
                    params: {
                        mail: localStorage.mail,
                        titre: this.photo_titre
                    }
                }).then(async ajoutPhoto => {
                    await axios.get('http://localhost:3000/getPhotoId', {
                        params: {
                            titre: this.photo_titre
                        }
                    }).then(async getPhotoId => {
                        this.photo_id = getPhotoId.data[0].PK_photo_id;
                        localStorage.photoprofil = this.photo_id;
                    });
                });
            }

            /* ----- Edit personal information ----- */
            await axios.get('http://localhost:3000/ModifUtilisateur', {
                params: {
                    pseudo: this.pseudo,
                    nom: this.nom,
                    prenom: this.prenom,
                    mail: localStorage.mail,
                    motdepass: localStorage.password,
                    date_naissance: this.date_naissance,
                    sexe: this.sexe,
                    pays: this.pays,
                    cp: this.cp,
                    ville: this.ville,
                    adresse: this.adresse,
                    photo_profil: this.photo_id
                }
            }).then(async response => {
                if (response.data.length !== 0) {
                    this.display_success = true;
                    window.location.href = 'modifProfile'
                } else {
                    console.log("erreur");
                }
            });
        }
    },
    created: function () {
        this.getInfo();
    }
});