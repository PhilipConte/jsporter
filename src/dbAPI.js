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
    }

    async connect() {
        this.db = new Sequelize('', '', '', {
            dialect: 'sqlite',
            storage: this.fp
        });
        await this.db.authenticate();

        this.Card = this.db.define('card',
            { name: { type: Sequelize.STRING, notEmpty: true, unique: true } }
        );
        this.Entry = this.db.define('entry',
            {
                name: { type: Sequelize.STRING, notEmpty: true, unique: true },
                text: { type: Sequelize.STRING, allowNull: false, defaultValue: '' }
            }
        );
        this.Card.hasMany(this.Entry);
        await this.db.sync({ force: false });

        return await this.getCards();
    }

    async getCards() {
        const cards = await this.Card.findAll()
        return await cards.map(c => c.get('name'));
    }

    async createCard(card) {
        await this.Card.sync({ force: false });
        await this.Card.create({ name: card });
        return this.getCards();
    }

    async createEntry(card, entry) {
        const record = await this.Card.findOne({ where: { name: card } });
        await this.Entry.create({
            name: entry, cardId: record.id
        });
        return await this.readCard(card);
    }

    async readCard(card) {
        const record = await this.Card.findOne({ where: { name: card } });
        const rows = await this.Entry.findAll({ where: { cardId: record.id } });
        return await rows.map(r => [r.get('name'), r.get('text')]);
    }

    async updateContent(card, entryName, value) {
        const record = await this.Card.findOne({ where: { name: card } });
        const entry = await this.Entry.findOne(
            { where: { cardId: record.id, name: entryName } }
        );
        await entry.updateAttributes({ text: value });
        return await this.readCard(card);
    }

    async deleteCard(card) {
        await this.Card.destroy({ where: { name: card }, limit: 1 });
        return await this.getCards();
    }

    async deleteEntry(card, entry) {
        const record = await this.Card.findOne({ where: { name: card } });
        await this.Entry.destroy({
            where: { cardId: record.id, name: entry }, limit: 1
        });
        return this.readCard(card);
    }
}
