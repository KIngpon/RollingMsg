import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(600,400, WebGL);

        Laya.stage.bgColor = "#aaaaaa";
    }

    //初始化SeanHtmlString
    public initSean(htmlContent:string,confSrc:string):void
    {
        var html_msg = new SeanHtmlString(htmlContent,confSrc);
        html_msg.pos(0,100);

        Laya.stage.addChild(html_msg);
    }

    //初始化Laya自带HTMLDivElement
    public initLayaHtml(htmlContent:string):void
    {
        var p = new Laya.HTMLDivElement();
        p.pos(20,10);
        p.width = 500;
        Laya.stage.addChild(p);

        p.innerHTML = htmlContent;
    }

    //初始化Laya自带外部HTMLIframeElement
    public initLayaHtmlIframe(src:string):void
    {
        var p = new Laya.HTMLIframeElement();
        p.pos(100,250);
        Laya.stage.addChild(p);

        p.href = src;
    }

    //初始化跑马灯
    public initRollingMsg(src_conf:string):void
    {
        var msg = RollingMsg.getInstance(src_conf,this,this.onRollingMsgCreated);

        Laya.stage.addChild(msg);
    }
    //跑马灯初始化完毕之后
    public onRollingMsgCreated(obj:RollingMsg):void
    {
        var datas = [
            {"notice":"<em>这是第一条消息;  </em>"},
            {"notice":"这是第<span style='color:#ff0000;'>2</span>条消息;  "},
            {"notice":"这是<span style='color:#ffff00;'>第3条</span>消息;  "},
            {"notice":"这是<span style='text-decoration: underline;'>第四条</span>消息;  "},
        ];
        obj.addMsgItems(datas);
        obj.startScrollingTimer();
    }
}

var str_html = "<p style='text-indent: 2em;'><strong>用于测</strong><em><strong>试的Ht</strong>ml字符串</em><span style='text-decoration: underline;'>，用于测试的Html</span></p><p><span style='text-decoration: underline;'>字符</span><span style='color: #E36C09;'><span style='text-decoration: underline;'>串，用于测</span>试</span><span style='font-size: 24px;'><span style='color: #E36C09;'>的Htm</span>l字符串，用于测</span></p><p><span style='font-size: 24px;'>试的Html字</span><span style='font-family: 楷体, 楷体_GB2312, SimKai;'><span style='font-size: 24px;'>符串，用于测试</span>的Html字符串</span></p>";
var src_conf = "./conf/libhtml.json";
var src_test_html = "./assets/test.html";

var main = new GameMain();
main.initSean(str_html,src_conf);
// main.initLayaHtml(str_html);
// main.initLayaHtmlIframe(src_test_html);

var src_rolling_conf = "./conf/rollingmsg.json";
main.initRollingMsg(src_rolling_conf);

