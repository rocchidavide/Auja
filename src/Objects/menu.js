/**
 * Menu panel type
 */
define(['build/Objects/Abstract/panel', 'build/Factories/menu_item_factory'], function (Panel, MenuItemFactory) {

    var Menu = function () {

        //Call the parent constructor
        Panel.call(this);

        //Set the type
        this.setType('menu');

        //Show that we're updateable
        this.setIsUpdateable(true);

        /**
         * Menu items
         * @type {Array}
         */
        this.items = [];

        /**
         *
         * @type {number}
         * @private
         */
        this._lastIndex = 0;

        /**
         * Generate a unique Id
         * @returns {*|string}
         */
        this.getNextId = function (item) {
            return '_' + String(++this._lastIndex);
        };

        /**
         * Setter for items
         * @param items
         */
        this.setItems = function (items) {
            this.items = items.map(function (item) {

                //Check if item already instantiated
                //TODO make this more elegant
                if (item.getId) {
                    item.setId(this.getNextId(item));
                    return item;
                }

                var result = MenuItemFactory.createItem(item);

                //Arrange a panel id or transfer the passed id
                result.setId(this.getNextId(item));

                return result;
            }.bind(this));
        };

        /**
         * Getter for items
         * @returns {Array}
         */
        this.getItems = function () {
            return this.items;
        };

        /**
         * Check if this menu contains an item
         * @param item
         * @returns {boolean}
         */
        this.hasItem = function (item) {
            for (var i in this.items) {
                if (this.items[i] == item) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Extend an item
         * @param item
         * @param data
         */
        this.extendItem = function (item, data) {
            for (var i in this.items) {
                if (this.items[i].getId() == item.getId()) {
                    if (this.items[i].extend) {
                        this.items[i].extend(data);
                    } else {
                        console.error('Extend requested on menu item without update method implemented');
                    }
                    break;
                }
            }
        };

        /**
         * Update an item
         * @param item
         * @param data
         */
        this.updateItem = function (item, data) {
            for (var i in this.items) {
                if (this.items[i] == item) {
                    this.items[i].update(data);
                    return;
                }
            }
        };

        /**
         * Getter for active item
         * @todo implement active item
         * @returns {boolean}
         */
        this.getActiveItem = function () {
            return false;
        };


    };

    // Inherit Panel
    Menu.prototype = Panel;

    // Fix constructor
    Menu.prototype.constructor = Menu;
    return Menu;
});