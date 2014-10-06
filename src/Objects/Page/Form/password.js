
define(['build/Objects/Abstract/form_item'], function(FormItem) {

    var Password = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('password');

    };

    // Inherit FormItem
    Password.prototype = FormItem;

    // Fix constructor
    Password.prototype.constructor = Password;

    /**
     * Get attributes for this input
     * @return Object
     */
    Password.prototype.getAttributes = function() {
        return {
            type: this.getType(),
            value: this.getValue(),
            name: this.getName()
        }
    };
    
    return Password;
});