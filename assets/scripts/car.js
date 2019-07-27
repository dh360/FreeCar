import {
    speedType
} from './carSettings'

cc.Class({
    extends: cc.Component,
    properties: {
        //前进方向 
        moveDir: {
            default: cc.v2(0, 1),
            displayName: 'move  dir',
            tootltip: '移动方向'
        },
        //速度档位
        speed: {
            default: speedType.STOP,
            displayName: 'move  speed!',
            toottip: '移动速度'
        }
    },

    move() {
        // 改变方向
        let degrees = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));
        this.node.rotation = 90 - degrees;
        //改变位置
        let addDelta = this.moveDir.mul(this._moveSpeed / 60);
        let newPosition = this.node.position.add(addDelta);
        this.node.setPosition(newPosition);
    },

    update(dt) {

        switch (this.speedType) {
            case 'STOP':
                this.speed = 0;
                break;

            case 'NORMAL':
                this.speed = 1;
                break;

            case 'FAST':
                this.speed = 2;
                break;

            default:
                break;
        }

        this.move();
    }
});