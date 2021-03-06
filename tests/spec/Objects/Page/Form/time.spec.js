define(['build/Objects/Page/Form/time'], function (Item) {
    describe('Time form item', function () {

        beforeEach(function () {
            this.addMatchers(require('jasmine_matchers'));
        });

        it('should return corresponding attributes', function () {
            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: '10:25',
                format: 'HH:mm',
                required: true
            });

            expect(item.getAttributes()).toHaveKeys([
                'type',
                'value',
                'name',
                'format'
            ]);
            
            expect(item.getValue()).toBe('10:25');

        });

        it('should implement a form item', function () {

            var item = new Item({
                order: 10,
                name: 'thename',
                label: 'The name',
                value: '10:25',
                format: 'HH:mm',
                required: true
            });

            //Test spec of transferring initial data
            expect(item.getType()).toBe('time');
            expect(item.getOrder()).toBe(10);
            expect(item.getName()).toBe('thename');
            expect(item.getLabel()).toBe('The name');
            expect(item.getValue()).toBe('10:25');
            expect(item.getFormat()).toBe('HH:mm');
            expect(item.isRequired()).toBe(true);

            //Test spec of setters
            item.setOrder(2);
            item.setName('somename');
            item.setLabel('Your name');
            item.setValue('11:55');
            item.setFormat('hh:mm');
            item.setRequired(false);
            
            expect(item.getOrder()).toBe(2);
            expect(item.getName()).toBe('somename');
            expect(item.getLabel()).toBe('Your name');
            expect(item.getValue()).toBe('11:55');
            expect(item.getFormat()).toBe('hh:mm');
            expect(item.isRequired()).toBe(false);
            
        });

    });
});
