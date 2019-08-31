"use strict";
cc._RF.push(module, 'ae1cbTYAV9Lj76RCEhEXcrP', 'car');
// scripts/car.js

'use strict';

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
            default: 0,
            displayName: 'move speed',
            toottip: '移动速度'
        },
        speedType: {
            default: 'STOP',
            displayName: 'speedType',
            tootltip: '速度级别'
        }
    },
    start: function start() {
        console.log('car组件 start');
        console.log('初始化时的位置：', this.node.getPosition());
    },
    onLoad: function onLoad() {},
    move: function move() {
        // 改变方向
        var degrees = cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x));
        this.node.rotation = 90 - degrees;
        //改变位置
        var addDelta = this.moveDir.mul(this.speed);
        var newPosition = this.node.position.add(addDelta);
        console.log('move 新位置', newPosition);
        if (addDelta.x != 0) {
            console.log('位置增量', JSON.stringify(addDelta));
        }
    },
    update: function update(dt) {
        console.log('更新 速度类型 ', this.speedType);
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