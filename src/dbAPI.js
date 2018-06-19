import Sequelize from 'sequelize';
import {pathToName} from './util';
import {ezError} from './dialog';

export default class DBAPI {
    constructor(p) {
        this.fp = p;
        this.fn = pathToName(this.fp);
        const fpp = this.fp

        this.db = new Sequelize(this.fn, null, null,
        { dialect: "sqlite", storage: this.fp, operatorsAliases: false });
        this.db.authenticate()
        .then(function(err) {
            console.log('Connected to:', fpp);
        }, function (err) {
            console.log('Error connecting to the database:', err);
        });
        this.Card = this.db.define('card', { idx: Sequelize.STRING });
        this.syncDB();
        var tempcards = [];
        this.Card.findAll().then((entry) => { if (entry && entry != `''s` && entry.length > 0) {
            tempcards.push("'"+entry+"'");
            this.createCardTable("'"+entry+"'");
        }});
        this.clist = tempcards;
        console.log('initial clist:', this.clist);
        /*card.put
        console.log(User.findAll())*/
    }

    addCard(cname) {
        const C = this.Card
        console.log('to add cname?', (this.clist.indexOf(cname) < 0));
        /*if (this.clist.indexOf(cname) == -1) {
            C.sync().then(() => { return C.create({ idx: cname }); });
            createCardTable(cname);
        } else ezError("Duplicate Entry!");*/
    }

    createCardTable(cname) {
        var L = this.clist;
        const newTable = this.db.define(cname,
            {section: Sequelize.STRING, content: Sequelize.STRING})
        .sync({ force: false })
        .then(function(err) {
            L.push(cname);
            console.log('created table:', cname);
        }, function (err) {
            console.log('Error creating table:', err);
        });
    }

    syncDB() {
        const N = this.fn
        //  SYNC SCHEMA
        this.db
        .sync({ force: false })
        .then(function(err) {
            console.log('Synced db:', N);
        }, function (err) {
            console.log('Error while syncing:', err);
        });
    }
}
