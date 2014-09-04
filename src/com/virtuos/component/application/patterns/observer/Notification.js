/**
 * Created by zhangchi on 2014/9/3.
 */
var Notification  = cc.Class.extend({
    name:"",
    body:null,
    type:null,
    ctor:function($name, $body, $type)
    {
        var $body=$body|null;
        var $type=$type|null;

        this.name = $name;
        this.body = $body;
        this.type = $type;
    },

    getName:function()
    {
        return this.name;
    },

    setBody:function(body)
    {
        this.body = body;
    },

    getBody:function()
    {
        return this.body;
    },

    setType:function(type)
    {
        this.type = type;
    },

    getType:function()
    {
        return this.type;
    },

    toString:function()
    {
        var _loc_1 = "Notification Name: " + this.getName();
        _loc_1 = _loc_1 + ("\nBody:" + (this.body == null ? ("null") : (this.body.toString())));
        _loc_1 = _loc_1 + ("\nType:" + (this.type == null ? ("null") : (this.type)));
        return _loc_1;
    }// end function

})