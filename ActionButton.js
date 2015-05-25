/**
 * @author Wemerson Januario <wemersonjanuario.com.br> wemerson.januario@gmail.com
 *
 * An action button column based on `Ext.grid.column.Widget`.
 * An action button column is configured with a {@link #menuItems} config object or {@link #getMenuItems} "hook" method
 * that will return the menu items for the widget
 *
 *      @example
 *     Ext.create('Ext.grid.Panel',{
 *           renderTo: Ext.getBody(),
 *           columns:[
 *               {
 *                   text: 'Name',
 *                   flex: 1,
 *                   dataIndex: 'name'
 *               },
 *               {
 *                   xtype: 'actionbuttoncolumn',
 *                   buttonConfig:{
 *                   //Any Ext.button.Button config here
 *                       //text: 'Actions',
 *                       tooltip: 'More options',
 *                       glyph: 'FontAwesome@xf142',
 *                       ui: 'default-toolbar'
 *                   },
 *                   //Build your own menu items based on record
 *                   getMenuItems: function (view, rowIdx, colIdx, store, record) {
 *                       var items = [];
 *                       //Free way to build menu items
 *                       if (record.get('name') === 'Dilma Rousseff') {
 *                           items.push({
 *                               text: 'Impeachment'
 *                           });
 *                           items.push({
 *                              text: 'Go Away'
 *                           });
 *
 *                       } else {
 *                           items.push({
 *                               text: 'Welcome'
 *                           });
 *                       }
 *                       return items;
 *
 *   				},
 *               }
 *           ]
 *       });
 */

Ext.define('Ext.ux.grid.column.ActionButton', {
    extend: 'Ext.grid.column.Widget',
    alias: 'widget.actionbuttoncolumn',
    requires: [
        'Ext.button.Button'
    ],
    width: 48,
    align: 'center',
    /**
     * @cfg {Object} buttonConfig
     * An object of the button config (see {@link Ext.button.Button} for more details).
     */
    buttonConfig: {},

    /**
     * @cfg {Object} menuConfig
     * An object of the menu config (see {@link Ext.menu.Menu} for more details).
     */
    menuConfig: {},

    /**
     * @cfg {Object[]} menuItems
     * An Array which may contain multiple menuItem actions definitions
     **/

    /**
     * @cfg {Function} getMenuItems
     * A function that will be called when a widget is attached to a record. This may be useful for
     * creating menu items according to the record. This function needs to return an Array of menu items
     * @param {Ext.data.Model} record The record used with the current widget (cell).
     * @return {Array}
     */

    getMenuItems: null,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            widget: Ext.apply({
                xtype: 'button',
                arrowVisible: false,
                width: 24,
                text: '&#160'

            }, me.buttonConfig)
        });
        me.callParent();
    },
    onWidgetAttach: function (column, button, record) {
        var me = this,
            scope = me.origScope || me,
            menuItems = me.menuItems || me.getMenuItems;

        if (menuItems) {
            if (Ext.isFunction(menuItems)) {
                menuItems = menuItems.call(scope, record);
            }
            button.setMenu(Ext.apply({
                animateShadow: true,
                shadowOffset: 10,
                shadow: 'frame',
                items: menuItems
            }, me.menuConfig));

        }
    }
});