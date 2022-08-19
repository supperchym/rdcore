Ext.define('Rd.controller.cSettings', {
    extend: 'Ext.app.Controller',
    views: [
        'settings.pnlSettings'
    ],
    actionIndex: function(pnl,itemId){
        var me      = this;
        var item    = pnl.down('#'+itemId);
        var added   = false;
        if(!item){
            pnl.add({ 
                itemId  : itemId,
                xtype   : 'pnlSettings',
	            border  : false,
	            plain   : true,
                padding : '0 5 0 5',
            });
            added = true;
        }
        return added;      
    }
});
