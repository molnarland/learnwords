const test = require('unit.js');

let Label = require('../database/Label');
Label = new Label();
let DB = require('../database/DB');
DB = new DB();


describe('Database', () =>
{
    describe('Label', () =>
    {
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

    describe('Models', () =>
    {
        it('Label', () =>
        {
            const LabelModel = require('../model/Label');
            const expect = {
                userId: 1,
                name: 'bla',
                _id: 'ewrewrew'
            };


            test.object(new LabelModel(1, 'bla', 'ewrewrew')).match(expect);
        });
    });
});