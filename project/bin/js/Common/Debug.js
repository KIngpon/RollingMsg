/*
Author : sean.guo49@gmail.com
create : 20190118
Features : trace the log
*/
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.error = function (ct) {
        if (!Debug.bDebug) {
            return;
        }
        console.error(ct);
    };
    Debug.trace = function (ct) {
        if (!Debug.bDebug) {
            return;
        }
        console.log(ct);
    };
    //是否在debug模式
    Debug.bDebug = true;
    return Debug;
}());
//# sourceMappingURL=Debug.js.map