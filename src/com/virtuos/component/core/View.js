/**
 * Created by zhangchi on 2014/9/3.
 */
var View  = cc.Class.extend({
    observerMap:null,
    mediatorMap:null,
    multitonKey:null,

    ctor:function($key)
    {
        if (View.instanceMap[$key] != null)
        {
            throw "Controller instance for this Multiton key already constructed!";
        }

        this.multitonKey = $key;
        View.instanceMap[this.multitonKey] = this;
        this.mediatorMap = new Array();
        this.observerMap = new Array();
        this.initializeView();
    },

    initializeView:function()
    {
    },

    registerObserver:function(notificationName,observer)
    {
        if (this.observerMap[notificationName] != null)
        {
            this.observerMap[notificationName].push(observer);
        }
        else
        {
            this.observerMap[notificationName] = [observer];
        }
    },

    notifyObservers:function(notification)
    {
        var _loc_2 = null;
        var _loc_3 = null;
        var _loc_4 = null;
        var _loc_5;
        if (this.observerMap[notification.getName()] != null)
        {
            _loc_2 = this.observerMap[notification.getName()];
            _loc_3 = new Array();
            _loc_5 = 0;
            while (_loc_5 < _loc_2.length)
            {

                _loc_4 = _loc_2[_loc_5];
                _loc_3.push(_loc_4);
                _loc_5 = _loc_5 + 1;
            }
            _loc_5 = 0;
            while (_loc_5 < _loc_3.length)
            {

                _loc_4 = _loc_3[_loc_5];
                _loc_4.notifyObserver(notification);
                _loc_5 = _loc_5 + 1;
            }
        }
    },

    removeObserver:function(notificationName,notifyContext)
    {
        var _loc_3 = this.observerMap[notificationName];
        var _loc_4 = 0;
        while (_loc_4 < _loc_3.length)
        {

            if (Observer(_loc_3[_loc_4]).compareNotifyContext(notifyContext) == true)
            {
                _loc_3.splice(_loc_4, 1);
                break;
            }
            _loc_4 = _loc_4 + 1;
        }
        if (_loc_3.length == 0)
        {
            delete this.observerMap[notificationName];
        }
    },

    registerMediator:function(mediator)
    {
        var _loc_3 = null;
        var _loc_4
        if (this.mediatorMap[mediator.getMediatorName()] != null)
        {
            return;
        }
        mediator.initializeNotifier(this.multitonKey);
        this.mediatorMap[mediator.getMediatorName()] = mediator;
        var _loc_2 = mediator.listNotificationInterests();
        if (_loc_2.length > 0)
        {
            _loc_3 = new Observer(mediator.handleNotification, mediator);
            _loc_4 = 0;
            while (_loc_4 < _loc_2.length)
            {

                this.registerObserver(_loc_2[_loc_4], _loc_3);
                _loc_4 = _loc_4 + 1;
            }
        }
        mediator.onRegister();
    },

    retrieveMediator:function(mediatorName)
    {
        return this.mediatorMap[mediatorName];
    },

    hasMediator:function(mediatorName)
    {
        this.mediatorMap[mediatorName] != null;
    },

    removeMediator:function(mediatorName)
    {
        var _loc_3 = null;
        var _loc_4 ;
        var _loc_2 = this.mediatorMap[mediatorName];
        if (_loc_2)
        {
            _loc_3 = _loc_2.listNotificationInterests();
            _loc_4 = 0;
            while (_loc_4 < _loc_3.length)
            {

                this.removeObserver(_loc_3[_loc_4], _loc_2);
                _loc_4 = _loc_4 + 1;
            }
            delete this.mediatorMap[mediatorName];
            _loc_2.onRemove();
        }
    }


})

View.instanceMap=[];
View.getInstance = function (key) {
    if (View.instanceMap[key] == null)
    {
        View.instanceMap[key] = new View(key);
    }
    return View.instanceMap[key];
};
View.removeView=function(key)
{
    delete View.instanceMap[key];
}
