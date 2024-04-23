export class Produit {
    constructor (
        public id?: number,
        public nom?: string,
        public dateDebuit?:Date,
        public dateFin?: Date,
        public discription?: string,
        public logo?: string,
        public status?: string,
        public IdEquipe?: number,
        public IdTache?: number,


            ){}
}