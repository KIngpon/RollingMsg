/*
Author : sean.guo49@gmail.com
create : 20190118
Features : 跑马灯单条消息内容对象
*/
class RollingItem extends Laya.Sprite
{
    //配置
    public conf:any;
    //父级消息管理对象
    public rmp:RollingMsg;

    //消息标签
    public html_msg:SeanHtmlString;
    //我的编号
    public id:number;

    //是否暂停
    public bPause:boolean = false;
    //是否死掉的消息对象
    public bDie:boolean = false;

    public init(p:RollingMsg,conf:any,text:string):void
    {
        this.rmp = p;
        this.conf = conf;

        this.html_msg = new SeanHtmlString(text,"./conf/libhtml.json");
        this.html_msg.pos(this.conf.pos.x,this.conf.pos.y);
        this.addChild(this.html_msg);

    }

    //设定id
    public setId(id:number):void
    {
        this.id = id;
    }

    public getId():number
    {
        return this.id;
    }

    public getWidth():number
    {
        return this.html_msg.getWidth();
    }

    
    //消息对象移动
    public run(spd:number):void
    {
        if( this.bDie || this.bPause )
        {
            return;
        }

        this.x -= spd;

        //如果我的右侧坐标小于0了，那么要通知父级，重新调整跟随状态
        var rx = this.x + this.getWidth();
        // if( rx <= this.getWidth() )
        // {
        //     this.bPause = true;
        // }
        if( rx <= 0 )
        {
            this.bDie = true;
        }
        
    }
}