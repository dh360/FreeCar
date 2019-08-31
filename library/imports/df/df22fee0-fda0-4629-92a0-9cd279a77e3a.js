"use strict";
cc._RF.push(module, 'df22f7g/aBGKZKgnNJ5p346', 'main');
// scripts/main.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SPEED = 400; // 这个速度应该跟小车的移动速度保持一致
var WIDTH = 960;
var HEIGHT = 640;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.RoleNode = null;
        _this.BgArr = [];
        _this.CameraNode = null;
        _this.stick = null;
        /** 四个方向输入指令 */
        _this._input = {
            left: false,
            right: false,
            up: false,
            down: false,
        };
        return _this;
    }
    Main.prototype.onLoad = function () {
        // 注册按键监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Main.prototype.onDestroy = function () {
        // 清除按键监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Main.prototype.update = function (dt) {
        var _this = this;
        if (this._input.left) {
            this.RoleNode.x -= dt * SPEED;
        }
        else if (this._input.right) {
            this.RoleNode.x += dt * SPEED;
        }
        if (this._input.up) {
            this.RoleNode.y += dt * SPEED;
        }
        else if (this._input.down) {
            this.RoleNode.y -= dt * SPEED;
        }
        // 摄像机跟随role
        this.CameraNode.position = this.RoleNode.position;
        // 根据摄像机位置设置背景坐标
        this.BgArr.forEach(function (e) {
            if (e.x < _this.CameraNode.x - WIDTH) {
                e.x += 2 * WIDTH;
            }
            else if (e.x > _this.CameraNode.x + WIDTH) {
                e.x -= 2 * WIDTH;
            }
            if (e.y < _this.CameraNode.y - HEIGHT) {
                e.y += 2 * HEIGHT;
            }
            else if (e.y > _this.CameraNode.y + WIDTH) {
                e.y -= 2 * HEIGHT;
            }
        });
    };
    /** 按下按键 */
    Main.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this._input.left = true;
                this._input.right = false;
                break;
            case cc.macro.KEY.d:
                this._input.left = false;
                this._input.right = true;
                break;
            case cc.macro.KEY.w:
                this._input.up = true;
                this._input.down = false;
                break;
            case cc.macro.KEY.s:
                this._input.up = false;
                this._input.down = true;
                break;
        }
    };
    /** 松开按键 */
    Main.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this._input.left = false;
                break;
            case cc.macro.KEY.d:
                this._input.right = false;
                break;
            case cc.macro.KEY.w:
                this._input.up = false;
                break;
            case cc.macro.KEY.s:
                this._input.down = false;
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], Main.prototype, "RoleNode", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "BgArr", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "CameraNode", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "stick", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();