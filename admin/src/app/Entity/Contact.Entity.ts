export class Contact{
    constructor(
        public id ?: number,
        public email?: String,
        public message?: String,
        public nom?: String,
        public prenom?: String,
        public phone?: number,
        public sujet?:String
    ){}
}