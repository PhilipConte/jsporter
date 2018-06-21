import Sequelize from 'sequelize';
import {pathToName} from './util';
import {ezError} from './dialog';
import Promise from 'bluebird';

export default class DBAPI {
    constructor(p) {
        this.fp = p;
        this.fn = pathToName(this.fp);
        this.cards = {};
        this.clist = ()=>Object.keys(this.cards);
    }

    connect() {
        this.db = new Sequelize("sqlite:"+this.fp);
        return this.db.authenticate()
        .then(()=>console.log('Connected to:', this.fp))
        .then(()=>this.Card = this.db.define('card', { name: Sequelize.STRING }))
        .then(()=>this.Card.sync({ force: false }))
        .then(()=>this.Card.findAll())
        .then((cards) => 
            Promise.map(cards.map(c => c.get('name')).filter(c => (c && c != `''s`)),
            c => this.createCardTable(c))
        ).then(()=>console.log('this.cards:', this.cards))
        .then(()=>this.db)
        .catch(err=>console.log('Error connecting to database:', err));
    }

    addCard(card) {
        console.log('add card?', !this.clist().includes(card));
        if (this.clist().includes(card)) {
            ezError("Duplicate Entry!");
            return false;
        }
        this.Card.sync({ force: false })
        .then(()=>this.Card.create({ name: card }))
        .then(()=>this.createCardTable(card));
        return true;
    }

    createCardTable(card) {
        const newTable = this.db.define(card,
            {entry: Sequelize.STRING, content: Sequelize.STRING},
            {freezeTableName: true});
        return newTable.sync({ force: false })
        .then(()=>this.cards[card] = newTable)
        .then(()=>console.log('created table:', card))
        .catch(err=>console.log('Error creating table:', err));
    }
}
