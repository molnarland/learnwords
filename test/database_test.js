const test = require('unit.js');





describe('Database', () =>
{
    let DB = require('../database/DB');
    DB = new DB();

    describe('Label', () =>
    {
        let Label = require('../database/Label');
        Label = new Label();

        it('#insertOne()', (done) =>
        {
            Label.insertOne('10', 'bla', (result) =>
            {
                test.object(result.ops[0]).match({name: 'bla', userId: '10'});

                done();
            });
        });

        it('#updateOne()', (done) =>
        {
            Label.updateOne('10', 'bla', 'ehhehh', (result) =>
            {
                test.number(result.result.n).is(1);


                let labelModel = require('../model/Label');
                labelModel = new labelModel('10', 'ehhehh');

                DB.getOne('labels', labelModel, (result) =>
                {
                    test.object(result).match({name: 'ehhehh', userId: '10'});

                    done();
                });
            });
        });
    });

    describe('User', () =>
    {
        let User = require('../database/User');
        User = new User();

        it('#insertOne()', (done) =>
        {
            User.insertOne('gazsi', 'olasz', 'japán', (result) =>
            {
                test.object(result.ops[0]).match({name: 'gazsi', native: 'olasz', learnable: 'japán'});

                done();
            });
        });

        it('#getOne()', (done) =>
        {
            User.getOne('gazsi', (result) =>
            {
                test.object(result).match({name: 'gazsi', native: 'olasz', learnable: 'japán'});

                done();
            });
        });
    });

    describe('Word', () =>
    {
        let Word = require('../database/Word');
        Word = new Word();

        it('#insertOne()', (done) =>
        {
            Word.insertOne('20', 'olasz', 'japán', 'kurva.jpg', '4', (result) =>
            {
                test.object(result.ops[0]).match({
                    userId: '20',
                    native: 'olasz',
                    learnable: 'japán',
                    photo: 'kurva.jpg',
                    labelId: '4'
                });

                done();
            })
        });
    });
});