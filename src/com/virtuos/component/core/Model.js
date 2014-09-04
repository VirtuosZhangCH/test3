/**
 * Created by zhangchi on 2014/9/3.
 */
var Model  = cc.Class.extend({
    proxyMap:null,
    multitonKey:null,

    ctor:function($key)
    {
        if (Model.instanceMap[$key] != null)
        {
            throw "Model instance for this Multiton key already constructed!";
        }

        this.multitonKey = $key;
        Model.instanceMap[this.multitonKey] = this;
        this.proxyMap = new Array();
        this.initializeModel();
    },

    initializeModel:function()
    {

    },

    registerProxy:function(proxy)
    {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    },

    retrieveProxy:function(proxyName)
    {
        return this.proxyMap[proxyName];
    },

    hasProxy:function(proxyName)
    {
        return this.proxyMap[proxyName] != null;
    },

    removeProxy:function(proxyName)
    {
        var _loc_2 = this.proxyMap[proxyName];
        if (_loc_2)
        {
            this.proxyMap[proxyName] = null;
            _loc_2.onRemove();
        }
        return _loc_2;
    }

})
Model.instanceMap=[];
Model.getInstance=function(key)
{
    if (Model.instanceMap[key] == null)
    {
        Model.instanceMap[key] = new Model(key);
    }
    return Model.instanceMap[key];
}
Model.removeModel=function(key)
{
    delete Model.instanceMap[key];
}
