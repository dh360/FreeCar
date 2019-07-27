"use strict";
cc._RF.push(module, 'ae1cbTYAV9Lj76RCEhEXcrP', 'car');
// scripts/car.js

'use strict';

var _carSettings = require('./carSettings');

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
            default: _carSettings.speedType.STOP,
            displayName: 'move  speed!',
            toottip: '移动速度'
        }
    },

    move: function move() {
        // 改变方向
        var degrees = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));
        this.node.rotation = 90 - degrees;
        //改变位置
        var addDelta = this.moveDir.mul(this._moveSpeed / 60);
        var newPosition = this.node.position.add(addDelta);
        this.node.setPosition(newPosition);
    },
    update: function update(dt) {

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

cc._RF.pop();