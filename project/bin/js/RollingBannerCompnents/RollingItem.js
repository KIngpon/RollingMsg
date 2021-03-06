var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
Author : sean.guo49@gmail.com
create : 20190118
Features : 跑马灯单条消息内容对象
*/
var RollingItem = /** @class */ (function (_super) {
    __extends(RollingItem, _super);
    function RollingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //是否暂停
        _this.bPause = false;
        //是否死掉的消息对象
        _this.bDie = false;
        return _this;
    }
    RollingItem.prototype.init = function (p, conf, text) {
        this.rmp = p;
        this.conf = conf;
        this.html_msg = new SeanHtmlString(text, "./conf/libhtml.json");
        this.html_msg.pos(this.conf.pos.x, this.conf.pos.y);
        this.addChild(this.html_msg);
    };
    //设定id
    RollingItem.prototype.setId = function (id) {
        this.id = id;
    };
    RollingItem.prototype.getId = function () {
        return this.id;
    };
    RollingItem.prototype.getWidth = function () {
        return this.html_msg.getWidth();
    };
    //消息对象移动
    RollingItem.prototype.run = function (spd) {
        if (this.bDie || this.bPause) {
            return;
        }
        this.x -= spd;
        //如果我的右侧坐标小于0了，那么要通知父级，重新调整跟随状态
        var rx = this.x + this.getWidth();
        // if( rx <= this.getWidth() )
        // {
        //     this.bPause = true;
        // }
        if (rx <= 0) {
            this.bDie = true;
        }
    };
    return RollingItem;
}(Laya.Sprite));
//# sourceMappingURL=RollingItem.js.map