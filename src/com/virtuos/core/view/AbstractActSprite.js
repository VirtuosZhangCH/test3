/**
 * Created by zhangchi on 2014/9/1.
 */
var AbstractActSprite  = AbstractSprite.extend({
    //what I need now is to check the parameter of the ctor
    sprite:null,
    actions:null,
    //animation:null,
    ctor:function(sprite,actions){
        this.sprite=sprite
        this.actions=actions||null;
        //this.animation=animation||null;
        if(this.actions)
            this.actions.retain();
        //if(this.animation)
            //this.animation.retain();
    },

    stopAllActions:function()
    {
        this.sprite.stopAllActions();
    },

    stopAction:function()
    {
        if(this.actions)
            this.sprite.stopAction(this.actions);
    },

    playAction:function()
    {
        if(this.actions)
             this.sprite.runAction(this.actions);
    },

    release:function()
    {
        this._super();
    }

})