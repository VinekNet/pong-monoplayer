class Joueur extends ElementHtml{
    /**
     * Représente un joueur.
     *
     * @param {JQuery<HTMLElement>} $raquette L'élément HTML de la raquette
     * @param {JQuery<HTMLElement>} $score L'élément HTML du score
     * @param {JQuery<HTMLElement>} $boutonMonte L'élément HTML du bouton pour monter
     * @param {JQuery<HTMLElement>} $boutonDescend L'élément HTML du bouton pour descendre
     * @param {JQuery<HTMLElement>} $vie L'élément HTML de vie
     */
    constructor($raquette,$score,$boutonMonte,$boutonDescend,$vie){
        super($raquette);
        /**
         * La raquette est l'élément pricipal auquel se rapporte la hauteur, largeur, etc, mais on le nomme $raquette ici pour éviter les confusions
         * @type {JQuery<HTMLElement>}
         */
        this.$raquette=this.$element;
        /**
         * L'endroit où on va écrire le score du joueur
         * @type {JQuery<HTMLElement>}
         */
        
        this.$score=$score;
        //et la vie
        this.$vie=$vie;
        /**
         * Le bouton pour monter
         * @type {JQuery<HTMLElement>}
         */
        this.$boutonMonte=$boutonMonte;
        /**
         * Le bouton pour descendre
         * @type {JQuery<HTMLElement>}
         */
        this.$boutonDescend=$boutonDescend;
        /**
         * Le score du joueur
         * @type {number}
         */
        this.score=0;
        /**
         /**
         * La vie du joueur
         * @type {number}
         */
        this.vie=5;
        /**
         * La vitesse de déplacement de la raquette
         * @type {number}
         */
        this.vitesseY=3;
        /**
         * Direction dans laquelle se déplace la raquette
         * -1 vers le haut
         * 1 vers le bas
         * 0 ne bouge pas
         * @type {number}
         */
        this.directionY=0;
        this.calculePositions();
        this.calculeTailles();

    }
    /**
     * Fait monter la raquette
     */
    monte(){
        this.$boutonMonte.addClass("flash");
        this.directionY=-1;
    }
     /**
     * Fait descendre la raquette
     */
    descend(){
        this.$boutonDescend.addClass("flash");
        this.directionY=1;
    }
     /**
     * arrête la raquette
     */
    bougePas(){
         this.$boutonMonte.add(this.$boutonDescend).removeClass("flash");
        this.directionY=0;
    }
    /**
     * Fait en sorte que la raquette ne sorte pas du terrain
     * @private
     */
    _limiteMouvements(){
        if(this.haut < terrain.haut){
            this.haut=terrain.haut;
        }
        if(this.bas > terrain.hauteur){
            this.bas = terrain.hauteur;
        }
    }
    /**
     * Fait bouger (ou pas) la raquette
     */
    bouge(){
        this.haut+= this.vitesseY * this.directionY;
        this._limiteMouvements();
        this._rafraichitHTML();
    }
    /**
     * Fait gagner des points au joueur
     * @param {Number} points Les points gagnés
     */
    incrementeScore(points){
        this.score+=points;
        this._effetScore();
        this.$score.text("Score: " + this.score);
        
    }
    /**
     * Fait perdre des vies au joueur
     * @param {Number} points Les points gagnés
     */
    decrementeVie(){
        this.vie-=1;
        this._effetScore();
        //this.$vie.text("Vies: "+this.vie);
        if (this.vie==5){
        this.$vie.text("Vies: ♥♥♥♥♥");
        }
        if (this.vie==4){
            this.$vie.text("Vies: ♥♥♥♥");
            }
        if (this.vie==3){
        this.$vie.text("Vies: ♥♥♥");
        }
        if (this.vie==2){
            this.$vie.text("Vies: ♥♥");
            }
        if (this.vie==1){
                this.$vie.text("Vies: ♥");
        }
        if (this.vie<=0){
            afficheEcranDebut()
    }
}

    /**
     * Effet visuel (et sonore) qui se produit quand on touche la balle
     */
    effetToucheBalle(){
        ElementHtml.effetCss(this.$raquette,"touche-balle");
        audio.playNote();
        joueur1.incrementeScore(10);
    }
    /**
     * Effet visuel qui se produit quand on gagne des points
     * @private
     */
    _effetScore(){
        ElementHtml.effetCss(this.$score,"flash");
    }

    /**
     * Appelé quand le joueur rate
     */
    gagne(){
        this.decrementeVie();
        this._rafraichitHTML();
        audio.fausseNote();
        partie.demarreNouveauJeu();

    }
    /**
     * Applique les valeurs en CSS
     * @private
     */
    _rafraichitHTML(){
        this.$element.css("top", this.haut); 
    }
    
}

