/*
Author : sean.guo49@gmail.com
create : 20190118
Features : Read html nodes and create LayaAir H5 Label
*/
class SeanHtmlString extends Laya.Sprite
{
    //需要解析的html文本字符串
    public str_html:string = "";
    //配置文件路径
    public src_conf:string = "";
    //解析配置
    public confObj:any;

    constructor(str_html:string,src_conf:string)
    {
        super();

        this.str_html = str_html;
        this.src_conf = src_conf;

        this.init();
    }
    //初始化
    public init():void
    {
        //加载配置文件
        Laya.loader.load(
			this.src_conf,
			Laya.Handler.create(this,this.onConfLoaded,[this.src_conf]),
			null,Laya.Loader.JSON);
    }

    //配置文件加载完毕
    public onConfLoaded(p:any):void
    {
        //读取配置
        this.confObj = Laya.loader.getRes(p);

        if( this.confObj )
        {
            //配置读取成功后，构造内容
            this.create();
        }else{
            Debug.error("Can not read the html conf lib check the path:"+this.src_conf);
        }
    }

    //构造内容
    public create()
    {
        //将html字符串解析为json对象
        var strObj = SeanHtmlEncode.getInstance(this.confObj).encodeHtml2Obj(this.str_html);

        if( !strObj )
        {
            Debug.error("SeanHtmlString.create error no strObj");
            return;
        }
        
        //将json对象解析为引擎标签数组
        var arr_labels = SeanHtmlDecode.getInstance(this.confObj).decodeObj2Labels(strObj);
        if( !arr_labels )
        {
            Debug.error("SeanHtmlString.create error no arr_labels");
            return;
        }

        //将所有标签按顺序排列成一行，底部对齐
        //添加到本容器中
        var lastX = 0;  //前一个的坐标
        var lastW = 0;  //前一个的宽度
        var w = 0;
        var h = 0;        
        var hei_m = SeanHtmlDecode.obj.height_max;
        var wid_m = SeanHtmlDecode.obj.width_max;
        var x = 0,y = 0;
        var ix = 0,iy = 0,lineH = this.confObj.defaultParam.lineheight;

        for( var i = 0; i < arr_labels.length; i++ )
        {
            var l = arr_labels[i];

            // x = ix + lastX + lastW;
            // y = hei_m - l.height;   //底部对齐
            var bWrap = false;
            //检查是否有wrap-true属性，如果有，需要换行
            if( l.isWrap() )
            {
                ix = 0;
                lastX = 0;
                lastW = 0;
                iy = iy + hei_m + lineH;
                bWrap = true;
                // Debug.trace("SeanHtmlString.create isWrap text:"+l.text);
            }else{
                bWrap = false;
            }

            //是否有缩进
            var indentSum = l.getIndent();
            if( indentSum > 0 )
            {
                var sumx = indentSum * this.confObj.defaultParam.emOffset;
                ix += sumx;
                // Debug.trace("SeanHtmlString.create sumx:"+sumx+" ix:"+ix+" lastX:"+lastX);
                
            }

            x = ix + lastX + lastW;
            y = iy + hei_m - l.height;   //底部对齐

            if( indentSum > 0 )
            {
                ix = 0;
            }

            // Debug.trace("SeanHtmlString.create x:"+x+" y:"+y);
            // Debug.trace("SeanHtmlString.create ix:"+ix+" iy:"+iy);
            // Debug.trace("SeanHtmlString.create lastX:"+lastX+" lastW:"+lastW);

            l.pos(x,y);
            this.addChild(l);

            lastX = x;
            lastW = l.width;
            
            w += l.width;
            if( l.height > h )
            {
                h = l.height;
            }
        }

        this.size(w,h);
    }

    public getWidth():number
    {
        return this.width;
    }
}