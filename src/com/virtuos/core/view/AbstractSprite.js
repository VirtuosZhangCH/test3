/**
 * Created by zhangchi on 2014/9/1.
 */
var AbstractSprite  = cc.Class.extend({
    //what I need now is to check the parameter of the ctor
    sprite: null,

    ctor: function (sprite) {
        this.sprite = sprite;
    },

    getStaticSprite:function()
    {
        return  this.sprite;
    },

    setPosition: function (x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    },
    setOpacity:function(val)
    {
        this.sprite.opacity=val;
    },

    setVisible:function(bol)
    {
        this.sprite.visible=bol;
    },

    release:function()
    {
        this.sprite.release();
        cc.log("sprite released");
    }
})

