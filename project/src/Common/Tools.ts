/*
Author : sean.guo49@gmail.com
create : 20190118
Features : public static tools
*/

class Tools
{
    //根据配置创建一个新的Sprite
    public static newSprite(conf:any):Laya.Sprite
    {
        var sp = new Laya.Sprite();
        if( conf.src )
        {
            sp.loadImage(conf.src);
        }
        sp.pos(conf.pos.x,conf.pos.y);

        if( conf.size )
        {
            //如果有设定尺寸，则拉伸一下
            if( !Tools.resizeSprite(sp,conf.size.w,conf.size.h) )
            {
                Debug.trace("newSprite false conf:");
                Debug.trace(conf);
            }
        }

        if( conf.pivot )
        {
            sp.pivot(conf.pivot.x,conf.pivot.y);
        }
        
        return sp;
    }

    //重设sp宽度高度
    public static resizeSprite(sp:Laya.Sprite,w:number,h:number):boolean
    {
        var nw = sp.width;
        var nh = sp.height;
        if( nw <= 0 || nh <= 0 )
        {
            Debug.trace("Tools.resizeSprite sprite not loaded width and height == 0 sp=");
            Debug.trace(sp);
            return false;
        }
        var pw = w;
        var ph = h;

        var sx = pw/nw;
        var sy = ph/nh;

        sp.scale(sx,sy);

        return true;
    }

    //使用Sprite上绘制一个带alpha的巨型
    public static drawRectWithAlpha(
        sp:Laya.Sprite,
        x:number,y:number,
        w:number,h:number,
        color:string,alpha:number=1
    ):void
    {
        if( alpha != 1 )
        {
            sp.graphics.setAlpha(alpha);
        }
        sp.graphics.drawRect(x,y,w,h,color);
        if( alpha != 1 )
        {
            sp.graphics.setAlpha(1);
        }
    }
}