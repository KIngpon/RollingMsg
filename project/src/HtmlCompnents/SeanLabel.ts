class SeanLabel extends Laya.Label
{
    public nodeData:any;

    public setData(nodeData:any):void
    {
        this.nodeData = nodeData;
    }

    public getData():any
    {
        return this.nodeData;
    }

    //检查当前标签的节点数据中是否有换行
    public isWrap():boolean
    {
        var f = false;

        for( var i = 0; i < this.nodeData.attr.length; i++ )
        {
            var at:string = this.nodeData.attr[i];
            if( at.indexOf("wrap") != -1 )
            {
                //有换行属性
                //并且换行属性是第一次,才能换行，使用过的就不能用了
                if( this.attrCount(at) <= 2 )
                {
                    f = true;
                    return f;
                }
            }
        }
        return f;
    }

    //该节点的换行属性用过几次了？
    public attrCount(at:string):number
    {
        var arr = at.split("-");

        return arr.length;
    }

    //获取是否有缩进属性，没有返回-1，有就返回具体缩进值
    public getIndent():number
    {
        var f = -1;

        for( var i = 0; i < this.nodeData.attr.length; i++ )
        {
            var at:string = this.nodeData.attr[i];
            if( at.indexOf("fontindent") != -1 )
            {
                //有
                //确保该属性是第一次
                if( this.attrCount(at) <= 2 )
                {
                    var arr = at.split("-");
                    return Number(arr[1]);
                }
            }
        }

        return f;
    }
}