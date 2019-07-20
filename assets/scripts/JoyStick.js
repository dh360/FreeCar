cc.Class({
    extends: cc.Component,

    properties: {
        dot: { //圆点
            default: null,
            type: cc.Node,
            displayName: 'DOT',

        },
        player: { //小车
            default: null,
            type: cc.Node,
            displayName: 'player',
        },
        ring: { //圆圈
            default: null,
            type: cc.Node,
            displayName: 'Ring'
        }
    },

    onLoad() {
        //挂载监听事件
        // console.log('挂载 主场景');

        this.radius = this.ring.width / 2; // 半径
        let center = this.ring.getAnchorPoint(); //ring节点圆心
        this.centerX = this.ring.anchorX * this.ring.width;
        this.centerY = this.ring.anchorY * this.ring.height;
        this.initListenerEvent();
    },

    //
    touchStartHandler(event) {
        console.log('开始触摸');
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        let figerPosition = event.getLocation(); // 获取鼠标/手指触摸位置
        // console.log('手指触摸位置', figerPosition);
        const distance = touchPos.sub(this.ring.getPosition()).mag();
        this._stickPos = this.ring.getPosition();

        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        }
    },

    touchMoveHandler(event) {
        console.log('触摸过程中')
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        const distance = touchPos.mag();
        const posX = this._stickPos.x + touchPos.x;
        const posY = this._stickPos.y + touchPos.y;
        // console.log(touchPos);
        const p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        } else {
            const x = this._stickPos.x + p.x * this.radius;
            const y = this._stickPos.y + p.y * this.radius;
            this.dot.setPosition(cc.v2(x, y));

        }
        // console.log(p)

        //移动车
        const car = this.node;
        let carPos = this.player.getPosition();
        this.player.rotation = 90 - cc.misc.radiansToDegrees(
            Math.atan2(p.y, p.x)
        );

        let newPos = this.player.position.add(p.mul(3));
        this.player.setPosition(newPos);
    },

    touchEndHandler(event) {
        console.log('触摸结束')
        // dot  归位
        this.dot.setPosition(this.centerX, this.centerY);

    },


    initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }
});