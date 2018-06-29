import Sequelize from 'sequelize';
import {pathToName} from './util';
import {ezError} from './dialog';
import Promise from 'bluebird';
import autobind from 'autobind-decorator'

@autobind
export default class DBAPI {
    constructor(p) {
        this.fp = p;
        this.fn = pathToName(this.fp);
        this.cards = {};
        this.cList = ()=>Object.keys(this.cards);
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
        .then(()=>this.db);
    }

    addCard(card) {
        if (!card.length) {
            ezError("Empty Card Name!");
            return new Promise((res)=>{throw new Error("Empty Card Name!");});
        }
        if (this.cList().includes(card)) {
            ezError("Duplicate Card!");
            return new Promise((res)=>{throw new Error("Duplicate Card!");});
        }
        return this.Card.sync({ force: false })
        .then(()=>this.Card.create({ name: card }))
        .then(()=>this.createCardTable(card))
        .then(()=> this.cList());
    }

    createCardTable(card) {
        const newTable = this.db.define(card,
            {entry: Sequelize.STRING, content: Sequelize.STRING},
            {freezeTableName: true});
        return newTable.sync({ force: false })
        .then(()=>this.cards[card] = newTable)
        .then(()=>console.log('created table:', card));
    }

    readCard(card) {
        return this.cards[card].findAll()
        .then(rows=>rows.map(r=>[r.get('entry'), r.get('content')]));
    }

    addEntry(card, entry) {
        if (!entry.length) {
            ezError("Empty Entry Name!");
            return new Promise((res)=>{throw new Error("Empty Entry Name!");});
        }
        return this.cards[card]
        .findOrCreate({where: {entry: entry}, defaults: {content: ''}})
        .then(data=> {
            let created = data[1];
            if (!created) {
                ezError("Duplicate Entry!");
                throw new Error("Duplicate Entry!");
            }
        }).then(()=>this.readCard(card));
    }

    updateContent(card, entry, text) {
        return this.cards[card]
        .find({ where: { entry: entry } })
        .then(record=>{
            if (!record) {
                ezError("Entry Not Found!");
                throw new Error("Entry Not Found!")
            } else {return record};
        }).then(record=>record.updateAttributes({content: text})
        .then(()=>this.readCard(card)));
    }

    deleteEntry(card, entry) {
        return this.cards[card]
        .destroy({ where: { entry: entry }, limit: 1 })
        .then(()=>this.readCard(card));
    }

    deleteCard(card) {
        return this.Card
        .destroy({ where: { name: card }, limit: 1 })
        .then(()=>this.cards[card].drop())
        .then(()=> delete this.cards[card])
        .then(()=>this.cList());
    }
}
