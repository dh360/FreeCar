import {
    speedType
} from './carSettings'

cc.Class({
    extends: cc.Component,
    properties: {
        dot: { //操纵杆
            default: null,
            type: cc.Node,
            displayName: 'DOT',

        },
        car: { //小车
            default: null,
            type: cc.Node,
            displayName: 'Car',
        },
        ring: { //圆圈
            default: null,
            type: cc.Node,
            displayName: 'Ring'
        }
    },

    onLoad() {
        //获取摇杆初始位置
        this.ringPos = this.ring.getPosition();
        this.radius = this.ring.width / 2; // 半径
        this.centerX = this.ring.anchorX * this.ring.width;
        this.centerY = this.ring.anchorY * this.ring.height;
        this.initListenerEvent(); //挂载监听事件
    },

    //触摸开始处理事件
    touchStartHandler(event) {
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        const distance = touchPos.sub(this.ring.getPosition()).mag();
        this._stickPos = this.ring.getPosition();

        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        }
    },

    //手指移动处理事件
    touchMoveHandler(event) {
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        const distance = touchPos.mag();
        const posX = this._stickPos.x + touchPos.x;
        const posY = this._stickPos.y + touchPos.y;
        const p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
            this.car.speedType = 'NORMAL';
        } else {
            const x = this._stickPos.x + p.x * this.radius;
            const y = this._stickPos.y + p.y * this.radius;
            this.dot.setPosition(cc.v2(x, y));
            this.car.speedType = 'FAST';
        }
    },

    update(dt) {},

    // 触摸结束
    stop() {
        //摇杆归位
        this.dot.setPosition(this.ringPos);
        this.car.speedType = 'STOP';
    },

    initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.stop, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.stop, this);
    }
});