/**
 * Created by zhangchi on 2014/9/3.
 */
var Notifier  = cc.Class.extend({

    multitonKey:null,
    sendNotification:function($notificationName,$body, $type)
    {
        var $body=$body|null;
        var $type=$type|null;
        if(Facade.getInstance(this.multitonKey))
        {
            Facade.getInstance.sendNotification($notificationName, $body, $type);
        }

    },

    initializeNotifier:function ($key)
    {
        this.multitonKey = $key;
    }


})