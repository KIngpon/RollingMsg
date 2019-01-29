/*
Author : sean.guo49@gmail.com
create : 20190118
Features : 跑马灯对象
*/
class RollingMsg extends Laya.Sprite
{
    public confsrc:string;
    public conf:any;

    public caller:any;
    public callback:any;

    public lb_msgs:Array<RollingItem>;   //标签数组
    public sp_lbcontent:Laya.Sprite;    //内容容器

    public static obj:RollingMsg = null;

    //是否在滚动中
    public bInScrolling = false;

    public static getInstance(confsrc:string,caller:any,callback:any):RollingMsg
    {
        if(!RollingMsg.obj)
        {
            var a = new RollingMsg();
            a.init(confsrc,caller,callback);
        }
        return RollingMsg.obj;
    }

    public destroy(b:boolean):void
    {
        this.stopScrolling();

        RollingMsg.obj = null;

        super.destroy(b);
    }

    //初始化对象，读取配置文件
    public init(confsrc:any,caller,callback):void
    {
        RollingMsg.obj = this;

        this.confsrc = confsrc;
        this.caller = caller;
        this.callback = callback;

        Laya.loader.load(
			this.confsrc,
			Laya.Handler.create(this,this.onConfLoaded,[this.confsrc]),
			null,Laya.Loader.JSON);
    }

    //配置文件加载完毕，构造对象内容
    public onConfLoaded(e:any):void
    {
        //加载完毕之后，读取对象
        this.conf = Laya.loader.getRes(this.confsrc);

        if( this.conf )
        {
            this.create();
        }else{
            Debug.trace("RollingMsg.onConfLoaded conf null");
        }
    }

    //构造对象
    public create():void
    {
        //消息数组和容器
        this.initContent(this.conf.msgcontent);
        
        //遮罩
        this.initMask( this.conf.msgcontent );

        this.pos(this.conf.pos.x,this.conf.pos.y);

        //跑马灯对象初始化完毕，呼叫回调
        if( this.caller && this.callback )
        {
            this.callback.apply(this.caller,[this]);
        }
    }

    public initContent(conf:any):void
    {
        if( !conf )
        {
            return;
        }
        this.lb_msgs = new Array();

        this.sp_lbcontent = new Laya.Sprite();
        this.sp_lbcontent.pos(this.conf.msgcontent.pos.x,this.conf.msgcontent.pos.y);
        this.sp_lbcontent.size(this.conf.msgcontent.size.w,this.conf.msgcontent.size.h);
        
        this.addChild(this.sp_lbcontent);


    }

    public initMask(conf:any):void
    {
        if( !conf )
        {
            return;
        }

        this.sp_lbcontent.scrollRect = new Laya.Rectangle(
            conf.pos.x,conf.pos.y,
            conf.size.w,conf.size.h
        );

        if( conf.frame )
        {
            Tools.drawRectWithAlpha(
                this.sp_lbcontent,
                conf.pos.x,conf.pos.y,
                conf.size.w,conf.size.h,
                conf.frame.color,
                conf.frame.alpha);
        }
    }

    //添加消息数组
    public addMsgItems(data):void
    {
        var whole_str = "";
        
        //逐个添加
        for( var k = 0; k < data.length; k++ )
        {
            var n = data[k];
            var notice = n['notice'];
            whole_str += notice;
        }

        if( whole_str && whole_str.length > 0 )
        {
            this.addMsgItem(whole_str);
        }
    }

    //添加一条消息
    public addMsgItem(text:string):void
    {
        var nowhave = this.lb_msgs.length;  //当前有多少消息对象

        var lbmsg = new RollingItem();
        lbmsg.init(this,this.conf.msgcontent,text);
        lbmsg.setId(nowhave);
        this.sp_lbcontent.addChild(lbmsg);

        //如果前面有消息，需要把新的消息摆在前面的消息后面
        if( nowhave <= 0 )
        {
            lbmsg.pos(
                    this.conf.msgcontent.pos.x + this.conf.msgcontent.size.w,
                    this.conf.msgcontent.pos.y);
        }
        else
        {
            lbmsg.pos(
                    this.lb_msgs[nowhave-1].x+this.lb_msgs[nowhave-1].getWidth(),
                    this.conf.msgcontent.pos.y);
        }

        this.lb_msgs.push(lbmsg);
    }

    
    //滚动
    public scrolling():void
    {
        try{
            // for(var k in this.lb_msgs)
            for( var k = 0; k < this.lb_msgs.length; k++ )
            {
                var m = this.lb_msgs[k];
                m.run(this.conf.scrollspd.x);
            }

            //一次循环完毕，检查所有消息中哪些是死掉的，死掉的删除掉
            for( var k = 0; k < this.lb_msgs.length; k++ )
            {
                var m = this.lb_msgs[k];
                if( m.bDie )
                {
                    m.destroy(true);

                    this.lb_msgs.splice(k,1);
                }
            }
        }catch(e){}
    }

    public startScrollingTimer()
    {
        Laya.timer.frameLoop(1,this,this.scrolling);
        this.bInScrolling = true;
    }

    public stopScrolling():void
    {
        Laya.timer.clear(this,this.scrolling);
        this.bInScrolling = false;
    }
}