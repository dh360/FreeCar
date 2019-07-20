cc.Class({
    extends: cc.Component,

    properties: {
        dot: { //操纵杆
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
        //获取摇杆初始位置

        this.ringPos = this.ring.getPosition();
        this.radius = this.ring.width / 2; // 半径
        let center = this.ring.getAnchorPoint(); //ring节点圆心
        this.centerX = this.ring.anchorX * this.ring.width;
        this.centerY = this.ring.anchorY * this.ring.height;
        //挂载监听事件
        this.initListenerEvent();
    },

    touchStartHandler(event) {
        console.log('开始');
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
        console.log('手指移动');
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
        //改变car角度 ， 改变位置
        const car = this.node;
        let carPos = this.player.getPosition();
        this.player.rotation = 90 - cc.misc.radiansToDegrees(
            Math.atan2(p.y, p.x)
        );

        let newPos = this.player.position.add(p.mul(3));
        this.player.setPosition(newPos);
    },


    // 触摸结束
    stop() {
        //摇杆归位
        console.log(this.ringPos)
        this.dot.setPosition(this.ringPos);

        //赛车停止移动
        // let newPos = this.player.position.add(0);
        this.player.setPosition(this.player.position);
    },
    initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.stop, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.stop, this);
    }
});