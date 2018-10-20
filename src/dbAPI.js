import Sequelize from 'sequelize';
import Promise from 'bluebird';
import autobind from 'autobind-decorator';
import { pathToName } from './util';
import { ezError } from './dialog';

const ezPromiseError = s => new Promise((r) => {
    ezError(s);
    throw new Error(s);
});

@autobind
export default class DBAPI {
    constructor(p) {
        this.fp = p;
        this.fn = pathToName(this.fp);
        this.cards = {};
        this.cList = () => Object.keys(this.cards);
    }

    async connect() {
        this.db = new Sequelize('', '', '', {
            dialect: 'sqlite',
            storage: this.fp
        });
        await this.db.authenticate();
        this.Card = await this.db.define(
            'card', { name: Sequelize.STRING }
        );
        await this.Card.sync({ force: false });
        const cards = await this.Card.findAll();
        await Promise.map(
            cards.map(c => c.get('name'))
                .filter(c => (c && c != `''s`)),
            c => this.createCardTable(c)
        );
        return this.db;
    }

    async createCard(card) {
        if (!card.length) {
            return ezPromiseError("Empty Card Name");
        } if (this.cList().includes(card)) {
            return ezPromiseError("Duplicate Card");
        }
        await this.Card.sync({ force: false });
        await this.Card.create({ name: card });
        await this.createCardTable(card);
        return this.cList();
    }

    async createCardTable(card) {
        const newTable = this.db.define(
            card,
            { entry: Sequelize.STRING, content: Sequelize.STRING },
            { freezeTableName: true }
        );
        await newTable.sync({ force: false });
        this.cards[card] = newTable;
    }

    async createEntry(card, entry) {
        if (!entry.length) return ezPromiseError("Empty Entry Name");
        const data = await this.cards[card].findOrCreate(
            { where: { entry: entry }, defaults: { content: '' } }
        );
        const created = data[1];
        if (!created) return ezPromiseError("Duplicate Entry");
        return this.readCard(card);
    }

    async readCard(card) {
        const rows = await this.cards[card].findAll();
        return await rows.map(r => [r.get('entry'), r.get('content')]);
    }

    async updateContent(card, entry, text) {
        const record = await this.cards[card].find({ where: { entry: entry } });
        if (!record) return ezPromiseError('Entry Not Found');
        await record.updateAttributes({ content: text });
        return await this.readCard(card);
    }

    async deleteCard(card) {
        await this.Card.destroy({ where: { name: card }, limit: 1 });
        await this.cards[card].drop();
        delete this.cards[card];
        return this.cList();
    }

    async deleteEntry(card, entry) {
        await this.cards[card].destroy({ where: { entry: entry }, limit: 1 });
        return this.readCard(card);
    }
}
