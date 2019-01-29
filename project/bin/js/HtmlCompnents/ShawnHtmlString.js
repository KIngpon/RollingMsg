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
var SeanHtmlString = /** @class */ (function (_super) {
    __extends(SeanHtmlString, _super);
    function SeanHtmlString(str_html) {
        var _this = _super.call(this) || this;
        _this.str_html = str_html;
        _this.init();
        return _this;
    }
    SeanHtmlString.prototype.init = function () {
        //将html字符串解析为json对象
        var strObj = SeanHtmlEncode.getInstance().encodeHtml2Obj(this.str_html);
        if (!strObj) {
            Debug.trace("ShawnHtmlString.init no strObj");
            return;
        }
        //将json对象解析为引擎标签数组
        var arr_labels = SeanHtmlDecode.getInstance().decodeObj2Labels(strObj);
        if (!arr_labels) {
            Debug.trace("ShawnHtmlString.init no arr_labels");
            return;
        }
        //将所有标签按顺序排列成一行，底部对齐
        //添加到本容器中
        var lastX = 0; //前一个的坐标
        var lastW = 0; //前一个的宽度
        var w = 0;
        var h = 0;
        for (var i = 0; i < arr_labels.length; i++) {
            var l = arr_labels[i];
            var x = lastX + lastW;
            var y = 0;
            // Debug.trace("ShawnHtmlString.init x:"+x+" y:"+y);
            l.pos(x, y);
            this.addChild(l);
            lastX = x;
            lastW = l.width;
            w += l.width;
            if (l.height > h) {
                h = l.height;
            }
        }
        this.size(w, h);
        // Debug.trace("ShawnHtmlString.init w:"+w+" h:"+h);
    };
    SeanHtmlString.prototype.getWidth = function () {
        return this.width;
    };
    return SeanHtmlString;
}(Laya.Sprite));
//# sourceMappingURL=ShawnHtmlString.js.map