Ext.define('Rd.view.dashboard.pnlDashboard', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.pnlDashboard',
    layout  : 'border',
    dashboard_data  : undefined,
    requires: [
    	'Rd.view.components.cmbClouds'
  	],
    initComponent: function () {
        var me 		= this;
        
        var username =  me.dashboard_data.user.username;
        
        //Some initial values
        var header  = Rd.config.headerName;
        var lA      = Rd.config.levelAColor; 
        var stA     = 'color:'+lA+';font-weight:200; font-size: smaller;';
        var tpl     = new Ext.XTemplate('<h1>'+header+'<span style="'+stA+'"> | <span style="font-family:FontAwesome;">{fa_value}</span> {value}</span><h1>');
        
        var style   = {}; //Empty Style
        var imgActive = false; //No Image
        var imgFile   = '';
        var fg      = false;
        if(me.dashboard_data.white_label.active == true){
            header  = me.dashboard_data.white_label.hName;
            footer  = me.dashboard_data.white_label.fName;
            
            var bg  = me.dashboard_data.white_label.hBg;
            style   = {
                'background' : bg
            };
            
            fg              = me.dashboard_data.white_label.hFg;
            var img         = me.dashboard_data.white_label.imgFile;
            if(me.dashboard_data.white_label.imgActive == true){
                imgActive = true;
            }
            var tpl = new Ext.XTemplate(
            '<tpl if="imgActive == true">',
                '<img src="{imgFile}" alt="Logo" style="float:left; padding-right: 10px; padding-left: 10px;padding: 10px;">',
            '</tpl>',
            '<h1 style="color:{hFg};font-weight:100;padding-top: 10px;">{hName}<span style="'+stA+'"> | <span style="font-family:FontAwesome;">{fa_value}</span> {value}</span><h1>');           
        }
        
        var txtH = {
            xtype   : 'tbtext',
            itemId  : 'tbtHeader', 
            tpl     : tpl,
            data    : { hName:header,imgFile:img,hFg:fg,imgActive: imgActive,value: 'Hard',fa_value: '&#xf023;'}
        };
        
        /*var lA      = Rd.config.levelAColor; 
        var stA     = 'color:'+lA+';font-weight:200; font-size: smaller;';
        var header  = me.dashboard_data.white_label.hName;
        var img  	= me.dashboard_data.white_label.imgFile;
        var fg      = me.dashboard_data.white_label.hFg;     
        var tpl = new Ext.XTemplate(
            '<img src="resources/images/logo.png" alt="Logo" style="float:left; padding-right: 10px; padding-left: 10px;padding-top: 10px;">',
            '<p style="color:{hFg};font-weight:200;font-size: 22px;">{hName}<span style="'+stA+'"></p>');
        
        var hNav = {
            xtype   : 'tbtext',
            itemId  : 'tbtHeader', 
            tpl     : tpl,
            data    : { hName:header,imgFile:img,hFg:fg}
        };*/
        
        var tl = {
    		xtype: 'treelist',
    		ui	: 'nav2',
    		itemId : 'tlNav',
    		expanderFirst: false,
    		margin: '0 0 0 5',
    		micro: false,
           // width	: 400,
			store: {root:{'id':0}}
   		};
        
        var h1 = {
            xtype   : 'button',
            itemId	: 'btnExpand',
            glyph   : Rd.config.icnMenu,
            scale   : 'medium'
        };
        var h3 = {
            xtype   : 'button',
            itemId	: 'btnClear',
            glyph   : Rd.config.icnUser,
            scale   : 'medium'
        };

        var h2 = {
            xtype   : 'button',
            itemId	: 'btnTreeLoad',
            glyph   : Rd.config.icnWizard,
            //ui      : 'button-green',
            scale   : 'medium'
        };
      	
      	var cmbCloud = {
        	xtype	: 'cmbClouds'
        }
        
        var h_items = [ txtH,'->',cmbCloud,'|',h2,h3];
        
        if(me.dashboard_data.show_wizard){
            h_items = [ txtH,'->',cmbCloud,'|',h2,h3];
        }
               
     	me.items 	= [
			{
				region	:'west',
				xtype	: 'panel',
				//width	: 55,
				dynamic  : true,
				width	: 220,
				itemId	: 'pnlWest',
				layout	: 'fit',
				border	: false,
                autoScroll	: true,
				componentCls: 'border-right',
				dockedItems : [
				    {
				        xtype   : 'toolbar',
				        dock    : 'top',
				        height	: 70,
				        ui      : 'default',
				        items   : [
				        	h1
				        ]
				    },
				],
				items : [{
                    xtype: 'container',
                    items:	tl
                    }
				]	
			},
			{
				region	: 'center',     // center region is required, no width/height specified
				xtype	: 'panel',
				layout	: 'fit',
				items	: [{
					xtype  : 'panel',
					margin : '0 0 0 0',
					layout : 'card',
					itemId : 'pnlCenter',
					items  : [
					
					]
				}],
				dockedItems : [
				    {
				        xtype   : 'toolbar',
				        height	: 70,
				        dock    : 'top',
				        ui      : 'default',
				        style   : style,
				        items   : h_items
				    }
				]
			}
		];     
      	this.callParent();  
    }
});

