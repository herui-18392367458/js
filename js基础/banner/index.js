class Banner {
    constructor(id) {
        //获取box盒子
        this.ele = document.querySelector(id)
        //获取ul
        this.imgage_box = this.ele.querySelector('ul')
        //获取ol
        this.point_box = this.ele.querySelector('ol')
        //获取窗口宽度
        this.window_width = this.ele.clientWidth
        //获取左右切换的大盒子 
        this.leftRight_box = this.ele.querySelector('.leftRight')
        //定义一个定时器
        this.timeLooper = null;
        //定义一个标识符
        this.index = 1
        //执行启动器
        this.init()
        //定义一个开关优化
        this.flag = true;
    }
    //启动器函数
    init() {
        this.setPoint()
        this.copyEle()
        this.autoPlay()
        this.leftRightChange()
        this.moveOut()
        this.clickPoint()
    }
    //设置焦点
    setPoint() {
        let pointNum = this.imgage_box.children.length
        let fra = document.createDocumentFragment()
        for (var i = 0; i < pointNum; i++) {
            let li = document.createElement('li')
            if (i === 0) li.className = 'active'
            li.setAttribute('index', i)
            fra.appendChild(li)
        }
        this.point_box.style.width = pointNum * 20 * 2 + 'px'
        this.point_box.appendChild(fra)
    }
    //复制元素
    copyEle() {
        //克隆元素
        const first = this.imgage_box.firstElementChild.cloneNode(true)
        const last = this.imgage_box.lastElementChild.cloneNode(true)
        //插入元素
        this.imgage_box.appendChild(first)
        this.imgage_box.insertBefore(last, this.imgage_box.firstElementChild)
        //从新设置宽度
        this.imgage_box.style.width = this.imgage_box.children.length * this.window_width + 'px'
        //从新定位
        this.imgage_box.style.left = -1 * this.window_width + 'px'
    }
    //自动轮播
    autoPlay() {
        this.timeLooper = setInterval(() => {
            this.index++;
            move(this.imgage_box, { left: -this.index * this.window_width }, this.moveEnd.bind(this))
        }, 1000)
    }
    //移入移出
    moveOut() {
        this.ele.addEventListener('mouseover', () => {
            clearInterval(this.timeLooper)
        })
        this.ele.addEventListener('mouseout', () => {
            this.autoPlay()
        })
    }
    //左右切换
    leftRightChange() {
        this.leftRight_box.addEventListener('click', e => {
            e = e || window.event;
            let target = e.target || e.srcElement;
            if (this.flag === false) {
                return
            }
            this.flag = false;
            if (target.className === 'left') {
                this.index--;
                move(this.imgage_box, { left: -this.index * this.window_width }, this.moveEnd.bind(this))
            }
            if (target.className === 'right') {
                this.index++;
                move(this.imgage_box, { left: -this.index * this.window_width }, this.moveEnd.bind(this))
            }
        })
    }
    //点击焦点
    clickPoint() {
        this.point_box.addEventListener('click', e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            if (target.tagName === 'LI') {
                if (this.flag === false) {
                    return
                }
                this.flag = false
                let i = target.getAttribute('index') - 0 + 1
                this.index = i
                move(this.imgage_box, { left: -this.index * this.window_width }, this.moveEnd.bind(this))
            }
        })
    }
    //运动结束
    moveEnd() {
        if (this.index === this.imgage_box.children.length - 1) {
            this.index = 1;
            this.imgage_box.style.left = -this.index * this.window_width + 'px'
        }
        if (this.index === 0) {
            this.index = this.imgage_box.children.length - 2;
        }
        for (let i = 0; i < this.point_box.children.length; i++) {
            this.point_box.children[i].className = ''
        }
        this.point_box.children[this.index - 1].className = 'active'
        this.flag = true
    }


}