/**
 * Created by zhangchi on 2014/9/3.
 */
var Observer  = cc.Class.extend({

    notify:null,
    context:null,
    ctor:function(notifyMethod,notifyContext)
    {
        this.setNotifyMethod( notifyMethod );
        this.setNotifyContext( notifyContext );
    },
    setNotifyMethod:function(notifyMethod)
    {
        this.notify=notifyMethod;
    },

    setNotifyContext:function(notifyContext)
    {
        this.context=notifyContext;
    },

    getNotifyContext:function()
    {
        return this.context;
    },

    notifyObserver:function(notification)
    {
        this.notify.apply(this.getNotifyContext(),[notification]);
    },

    compareNotifyContext:function(object)
    {
        return object === this.context;
    }
})