(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/JoyStick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a8c89pxfWtFS5PC9082hJzK', 'JoyStick', __filename);
// scripts/JoyStick.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        dot: { //操纵杆
            default: null,
            type: cc.Node,
            displayName: 'DOT'

        },
        player: { //小车
            default: null,
            type: cc.Node,
            displayName: 'player'
        },
        ring: { //圆圈
            default: null,
            type: cc.Node,
            displayName: 'Ring'
        }
    },

    onLoad: function onLoad() {
        //获取摇杆初始位置

        this.ringPos = this.ring.getPosition();
        this.radius = this.ring.width / 2; // 半径
        var center = this.ring.getAnchorPoint(); //ring节点圆心
        this.centerX = this.ring.anchorX * this.ring.width;
        this.centerY = this.ring.anchorY * this.ring.height;
        //挂载监听事件
        this.initListenerEvent();
    },
    touchStartHandler: function touchStartHandler(event) {
        console.log('开始');
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        var figerPosition = event.getLocation(); // 获取鼠标/手指触摸位置
        // console.log('手指触摸位置', figerPosition);
        var distance = touchPos.sub(this.ring.getPosition()).mag();
        this._stickPos = this.ring.getPosition();

        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        }
    },
    touchMoveHandler: function touchMoveHandler(event) {
        console.log('手指移动');
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        // console.log(touchPos);
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        } else {
            var x = this._stickPos.x + p.x * this.radius;
            var y = this._stickPos.y + p.y * this.radius;
            this.dot.setPosition(cc.v2(x, y));
        }
        //改变car角度 ， 改变位置
        var car = this.node;
        var carPos = this.player.getPosition();
        this.player.rotation = 90 - cc.misc.radiansToDegrees(Math.atan2(p.y, p.x));

        var newPos = this.player.position.add(p.mul(3));
        this.player.setPosition(newPos);
    },


    // 触摸结束
    stop: function stop() {
        //摇杆归位
        console.log(this.ringPos);
        this.dot.setPosition(this.ringPos);

        //赛车停止移动
        // let newPos = this.player.position.add(0);
        this.player.setPosition(this.player.position);
    },
    initListenerEvent: function initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.stop, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.stop, this);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=JoyStick.js.map
        