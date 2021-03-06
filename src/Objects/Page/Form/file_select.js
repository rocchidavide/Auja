define(['build/Objects/Abstract/form_item'], function (FormItem) {

    var FileSelect = function (data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('file_select');
        /**
         * Place to upload data to
         * @var string
         */
        this.target = data.target;

        /**
         * Is multiuploaded
         * @type boolean
         */
        this.multiple = data.multiple || false;

        /**
         * FileSelects
         * @type array
         */
        this.files = this.multiple ? (data.files ? data.files : []) : (data.file ? [data.file] : []);

        /**
         * onchange
         * @type {string}
         */
        this._onChange = data.onChange || null;

        /**
         * Get target for uploader
         * @returns string
         */
        this.getTarget = function () {
            return this.target;
        };

        /**
         * Set target for uploader
         * @param target
         */
        this.setTarget = function (target) {
            this.target = target;
        };

        /**
         * Get file_selects
         * @returns {array}
         */
        this.getFiles = function () {
            return this.files;
        };

        /**
         * Set file_selects
         * @param files
         */
        this.setFiles = function (files) {
            this.files = files;
        };

        /**
         * Check if multiuploader
         * @returns {boolean}
         */
        this.isMultiple = function () {
            return this.multiple;
        };

        /**
         * Set is multiuploader
         * @param multiple
         */
        this.setIsMultiple = function (multiple) {
            this.multiple = multiple;
        };

        /**
         * Setter for onChange
         * @param onChange
         */
        this.setOnChange = function(onChange) {
            this._onChange = onChange;
        };

        /**
         * Getter for onchange
         * @returns {string}
         */
        this.getOnChange = function() {
            return this._onChange;
        };

    };

    // Inherit Panel
    FileSelect.prototype = FormItem;

    // Fix constructor
    FileSelect.prototype.constructor = FileSelect;

    return FileSelect;
});