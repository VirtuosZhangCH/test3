
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                ss.release();
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20
            //anchorX: 0.5,
            //anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        //var action = new cc.Spawn(cc.jumpBy(2, cc.p(300, 0), 50, 4), cc.rotateBy(2, 720));
        var action2=new cc.Sequence(cc.jumpBy(2, cc.p(300, 0), 50, 4), cc.rotateBy(2, 720))
        var ss=new AbstractActSprite(new cc.Sprite(res.CloseSelected_png),action2);
        this.addChild(ss.getStaticSprite());
        ss.setPosition(100,200);
        ss.playAction();

        var sa=new AbstractAnimation("BWW_Pic1_00",60,1,.04);
        this.addChild(sa.getStaticSprite());
        sa.setOpacity(122);
        sa.setPosition(100,200);
        sa.play(true,function(){
            sa.setVisible(false);
            cc.log("Complete")
        });

        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        cc.spriteFrameCache.addSpriteFrames(g_resources[4]);
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);


    }
});

