/**
 * Created by zhangchi on 2014/9/2.
 */
var AbstractAnimation  = AbstractSprite.extend
({
    //what I need now is to check the parameter of the ctor
    //sprite:null,
    animation:null,
    animationName:null,
    ctor:function(animationName,startIndex, endIndex,frameRate){
        frameRate=frameRate||null;
        startIndex = startIndex || 0;

        var animFrames = [];
        var str
        var frame
        if(startIndex > endIndex){
            for (var i = startIndex; i >= endIndex; i--) {
                str= i < 10 ? animationName + "0" + i + ".png" : animationName + i + ".png";
                frame= cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }
        }else {
            for (var i = startIndex; i <= endIndex; i++) {
                str = i < 10 ? animationName + "0" + i + ".png" : animationName + i + ".png";
                frame = cc.spriteFrameCache.getSpriteFrame(str);
                animFrames.push(frame);
            }
        }

        var animation = frameRate?new cc.Animation(animFrames,frameRate):new cc.Animation(animFrames, .04);
        //add callback of complete animations
        this.animate=cc.animate(animation);
        this.animate.retain();
        // 4 从我们精灵表里头取第一帧作为精灵
        this.sprite =startIndex>10?
            new cc.Sprite("#"+animationName+startIndex.toString()+".png"):
            new cc.Sprite("#"+animationName+"0"+startIndex.toString()+".png");
        //this.sprite.runAction(this.animation);
    },

    play:function(reverse,callBack)
    {
        reverse=reverse||false;
        var animate=reverse?this.animate.reverse():this.animate
        callBack?
            this.sprite.runAction(cc.sequence(animate,cc.callFunc(callBack,this)))  :
            this.sprite.runAction(animate);
    },

    stop:function()
    {
        this.sprite.stopAllActions();
    }

})
