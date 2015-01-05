/**
 * Panels
 *
 * @jsx React.DOM
 */

//Listing of all supported panels
var PanelTypes = {
    'menu': 'build/Components/Panels/menu.react',
    'page': 'build/Components/Panels/page.react'
};

//Map as an array to load panel dependencies
define([
    'react',
    'fluxxor',
    'flux',
    'build/Components/Panels/menu.react',
    'build/Components/Panels/page.react'
], function (React, Fluxxor, flux) {
    
    var PanelSection = React.createClass({
        handleScroll: function () {
            flux.actions.onPanelScroll(this.props.panel);
        },
        render: function () {
            var Panel = require(PanelTypes[this.props.panel.getType()]);
            
            var classNames = ['animated', 'fadeInLeft', 'panel'];
            
            //Panel type as class
            classNames.push('panel-{type}'.assign({ type: this.props.panel.getType() }));
            
            //Active boolean
            if(this.props.panel.isActive()) {
                classNames.push('active');
            }
            
            return (
                <section id={this.props.panel.getId()} key={this.props.panel.getId()} ref="panel" className={classNames.join(" ")}>
                    <div onScroll={this.handleScroll} style={this.props.style}>
                        <Panel flux={this.props.flux} message={this.props.message} panel={this.props.panel} />
                    </div>
                </section>
            );
        }
    });

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('PanelStore', 'MessageStore')],
        getStateFromFlux: function () {
            return flux.store('PanelStore').getState();
        },

        /**
         * After addition/removal will animate scrollLeft, this is done by listening to DOMNode events
         * instead of componentDidUpdate since it triggers too late
         */        
        componentDidMount: function() {
            //Animate to the end
            $(this.refs.panels.getDOMNode()).bind('DOMNodeInserted DOMNodeRemoved', function() {
                var b = $('body');
                if(b[0].scrollLeft != (b[0].scrollWidth - window.innerWidth)) {
                    b.animate({
                        scrollLeft: b[0].scrollWidth - window.innerWidth
                    }, 300);
                }
            });
            
            //Bind document navigation using arrows
            $(document).bind('keyup', function(e) {
                if(document.activeElement == document.getElementsByTagName("body")[0])
                {
                    if (e.which == 37) {
                        flux.actions.navigateToPanelLeft();
                    } else if (e.which == 39) {
                        flux.actions.navigateToPanelRight();
                    }
                }
            });
        },

        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function () {

            var message = flux.store('MessageStore').getMessage();
            
            //Fetch and wrap all panels in a section having the class "panel panel-{type}"
            var panels = this.state.panels.map(function (panel) {
                var style = {
                    height: this.state.height
                };

                //When the current message is destined for this panel pass it, otherwise just an empty panel
                var m = {};
                if (message.origin && message.origin.id == panel.id) {
                    m = message.message;
                }
                
                return (<PanelSection key={panel.getIndex()} flux={this.props.flux} panel={panel} message={m} style={style} />);
            }.bind(this));
            
            return (
                <div id="panels" ref="panels">
                    <div>
                        {panels}
                    </div>
                </div>
            );
        }
    });

});