import Sequelize from 'sequelize';
import {pathToName} from './util';
import {ezError} from './dialog';

export default class DBAPI {
    constructor(p) {
        this.fp = p;
        this.fn = pathToName(this.fp);
        this.cards = {};
        this.clist = () => Object.keys(this.cards);
    }

    connect() {
        /*return*/ this.db = new Sequelize("sqlite:"+this.fp)
        //.then(() => this.db.authenticate())
        return this.db.authenticate()
        .then(() => console.log('Connected to:', this.fp))
        .catch(err => console.log('Error connecting to database:', err))
        .then(() => this.Card = this.db.define('card', { name: Sequelize.STRING }))
        .then(() => this.Card.sync({ force: false }))
        .then(() => this.Card.findAll())
        .then((cards) => {
            cards.map(c => c.get('name')).filter(c => (c && c != `''s`))
            .forEach(c => this.createCardTable(c));
        }).then(() => console.log('initial cards:', this.clist()))
        .then(() => this.db);
    }

    addCard(card) {
        console.log('add card?', !this.clist().includes(card));
        if (this.clist().includes(card)) {
            ezError("Duplicate Entry!");
            return false
        }
        this.Card.sync({ force: false })
        .then(() => this.Card.create({ name: card }))
        .then(() => this.createCardTable(card));
        return true;
    }

    createCardTable(card) {
        this.cards[card] = this.db.define(card,
            {entry: Sequelize.STRING, content: Sequelize.STRING},
            {freezeTableName: true})
        .sync({ force: false })
        .then(() => console.log('created table:', card))
        .catch(err => console.log('Error creating table:', err));
    }
}
