/**
 * Created by zhangchi on 2014/9/3.
 */
var Facade  = cc.Scene.extend({
    controller:null,
    model:null,
    view:null,
    multitionKey:"Facade",

    ctor:function ($key) {
        if (Facade.instanceMap[$key] != null)
        {
            throw Error("Facade instance for this Multiton key already constructed!");
        }
    }

});

Facade.instanceMap=[];
Facade.KEY="Facade";
Facade.getInstance = function () {
    if (!this._instance) {
        this._instance = this._instance || new cc.EGLView();
        this._instance.initialize();
    }
    return this._instance;
};