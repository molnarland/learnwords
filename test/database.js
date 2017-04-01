const test = require('unit.js');





describe('Database', () =>
{
    let DB = require('../database/DB');
    DB = new DB();

    describe('Label', () =>
    {
        let Label = require('../database/Label');
        Label = new Label();

        it('#insertLabel()', (done) =>
        {
            Label.insertLabel('10', 'bla', (result) =>
            {
                test.object(result.ops[0]).match({name: 'bla', userId: '10'});

                done();
            });
        });

        it('#updateLabel()', (done) =>
        {
            Label.updateLabel('10', 'bla', 'ehhehh', (result) =>
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

        it('#insertNameWithDatas()', (done) =>
        {
            User.insertNameWithDatas('gazsi', 'olasz', 'japán', (result) =>
            {
                test.object(result.ops[0]).match({name: 'gazsi', native: 'olasz', learnable: 'japán'});

                done();
            });
        });

        it('#findName()', (done) =>
        {
            User.findName('gazsi', (result) =>
            {
                test.object(result).match({name: 'gazsi', native: 'olasz', learnable: 'japán'});

                done();
            });
        });
    });


});