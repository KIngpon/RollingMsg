/*
Author : sean.guo49@gmail.com
create : 20190118
Features : trace the log
*/
class Debug
{
    //是否在debug模式
    public static bDebug = true;

    public static error(ct:any):void
    {
        if(!Debug.bDebug)
        {
            return;
        }

        console.error(ct);
    }

    public static trace(ct:any):void
    {
        if(!Debug.bDebug)
        {
            return;
        }
        console.log(ct);
    }
}