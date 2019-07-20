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
        console.log('挂载 主场景');

        this.radius = this.ring.width / 2; // 半径
        let center = this.ring.getAnchorPoint(); //ring节点圆心
        let centerX = this.ring.anchorX * this.ring.width;
        let centerY = this.ring.anchorY * this.ring.height;
        this.initListenerEvent();
    },

    //
    touchStartHandler(event) {
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        let figerPosition = event.getLocation(); // 获取鼠标/手指触摸位置
        console.log('手指触摸位置', figerPosition);
        const distance = touchPos.sub(this.ring.getPosition()).mag();

        if (distance <= this.radius) {
            this.dot.setPosition(touchPos);
        }
    },

    touchMoveHandler(event) {
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    },

    touchEndHandler(event) {


    },


    initListenerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchEndHandler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }
});