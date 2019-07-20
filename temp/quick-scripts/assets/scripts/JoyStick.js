(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/JoyStick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a8c89pxfWtFS5PC9082hJzK', 'JoyStick', __filename);
// scripts/JoyStick.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        dot: { //圆点
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
        //挂载监听事件
        console.log('挂载 主场景');

        this.radius = this.ring.width / 2; // 半径
        var center = this.ring.getAnchorPoint(); //ring节点圆心
        var centerX = this.ring.anchorX * this.ring.width;
        var centerY = this.ring.anchorY * this.ring.height;
        this.initListenerEvent();
    },


    //
    touchStartHandler: function touchStartHandler(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        var figerPosition = event.getLocation(); // 获取鼠标/手指触摸位置
        console.log('手指触摸位置', figerPosition);
        var distance = touchPos.sub(this.ring.getPosition()).mag();

        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        }
    },
    touchEndHandler: function touchEndHandler(event) {},
    initListenerEvent: function initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEndHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
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
        