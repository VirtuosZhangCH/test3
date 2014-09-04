/**
 * Created by zhangchi on 2014/9/3.
 */
var Controller  = cc.Class.extend({
    view:null,
    commandMap:null,
    multitonKey:null,

    ctor:function($key)
    {
        if (Controller.instanceMap[$key] != null)
        {
            throw "Controller instance for this Multiton key already constructed!";
        }

        this.multitonKey = $key;
        Controller.instanceMap[this.multitonKey] = this;
        this.commandMap = new Array();
        this.initializeController();
    },

    initializeController:function()
    {
        this.view = View.getInstance(this.multitonKey);
    },

    executeCommand:function(note)
    {
        var _loc_2 = this.commandMap[note.getName()];
        if (_loc_2 == null)
        {
            return;
        }
        var _loc_3 = new _loc_2;
        _loc_3.initializeNotifier(this.multitonKey);
        _loc_3.execute(note);
    },

    registerCommand:function(notificationName,commandClassRef)
    {
        if (this.commandMap[notificationName] == null)
        {
            this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
        }
        this.commandMap[notificationName] = commandClassRef;
    },

    hasCommand:function(notificationName)
    {
        this.commandMap[notificationName] != null;
    },

    removeCommand:function(notificationName)
    {
        if (this.hasCommand(notificationName))
        {
            this.view.removeObserver(notificationName, this);
            this.commandMap[notificationName] = null;
        }
    }


})

Controller.instanceMap=[];
Controller.getInstance = function (key) {
    if (Controller.instanceMap[key] == null)
    {
        Controller.instanceMap[key] = new Controller(key);
    }
    return Controller.instanceMap[key];
};
Controller.removeController=function(key)
{
    delete Controller.instanceMap[key];
}
