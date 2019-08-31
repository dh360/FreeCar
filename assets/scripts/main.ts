const {ccclass, property} = cc._decorator;

const SPEED = 400;
const WIDTH = 960;
const HEIGHT = 640;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Node) RoleNode: cc.Node = null;
    @property(cc.Node) BgArr: cc.Node[] = [];
    @property(cc.Node) CameraNode: cc.Node = null;
    @property(cc.Node) stick: cc.Node = null;

    /** 四个方向输入指令 */
	private _input = {
		left: false,
		right: false,
        up: false,
        down: false,
	};

    onLoad() {
        // 注册按键监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    onDestroy() {
        // 清除按键监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    }

    update(dt: number) {
        if (this._input.left) {
            this.RoleNode.x -= dt * SPEED;
        } else if (this._input.right) {
            this.RoleNode.x += dt * SPEED;
        }
        if (this._input.up) {
            this.RoleNode.y += dt * SPEED;
        } else if (this._input.down) {
            this.RoleNode.y -= dt * SPEED;
        }

        // 摄像机跟随role
        this.CameraNode.position = this.RoleNode.position;

        // 根据摄像机位置设置背景坐标
        this.BgArr.forEach((e) => {
            if (e.x < this.CameraNode.x - WIDTH) {
                e.x += 2 * WIDTH
            } else if (e.x > this.CameraNode.x + WIDTH) {
                e.x -= 2 * WIDTH;
            }
            if (e.y < this.CameraNode.y - HEIGHT) {
                e.y += 2 * HEIGHT;
            } else if (e.y > this.CameraNode.y + WIDTH) {
                e.y -= 2 * HEIGHT;
            }
        });
    }

    /** 按下按键 */
	private onKeyDown (event: cc.Event.EventKeyboard) {
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
	}

	/** 松开按键 */
	private onKeyUp (event: cc.Event.EventKeyboard) {
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
	}
}
