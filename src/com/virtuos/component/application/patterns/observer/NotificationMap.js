/**
 * Created by zhangchi on 2014/9/3.
 */
var NotificationMap  = cc.Class.extend({
    _notificationTypeByNotificationName:null,
    ctor:function()
    {
        this._notificationTypeByNotificationName = {};
    },

    add:function(notificationName,callback,notificationType)
    {
        if (callback.length != 1)
        {
            throw "Refusing to map supplied callback function to Notification: " + notificationName + ".  The callback function must accept a single argument (the notification body)"
        }

        if (this.contains(notificationName, notificationType))
        {
            throw "The supplied Notification: " + notificationName + " is already mapped to a callback";
        }
        //TODO double check it
        this._notificationTypeByNotificationName[notificationName] = {};
        this._notificationTypeByNotificationName[notificationType] = callback;

    },

    contains:function(notificationName,notificationType)
    {
        var _loc = this._notificationTypeByNotificationName[notificationName];
        if (_loc == null)
        {
            return false;
        }
        return _loc[notificationType] != null;
    },

    removeAll:function()
    {
        //TODO double check
        var _loc_// = undefined;
        for (_loc_ in this._notificationTypeByNotificationName)
        {
            delete this._notificationTypeByNotificationName[_loc_];
        }
    },

    handleNotification:function(notification)
    {
        //TODO
    },

    listNotificationInterests:function()
    {
        //TODO need tobe optimized
        var _loc_2
        var _loc_1 = [];
        for (_loc_2 in this._notificationTypeByNotificationName)
        {

            _loc_1.push(_loc_2);
        }
        return _loc_1;
    }

})