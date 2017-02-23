const Broad = require('./Broad');

class Label extends Broad
{
    constructor ()
    {
        super();

        this.table = 'labels';
    }

    insertLabel (label, callback)
    {
        this.insertOne(this.table, {name: label}, callback);
    }
}

module.exports = Label;