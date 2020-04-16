function move(ele, target, cb) {
    let timerObj = {}
    for (let attr in target) {
        timerObj[attr] = setInterval(() => {
            let current;
            if (attr === 'opacity') {
                current = getComputedStyle(ele)[attr] * 100
            } else {
                current = parseInt(getComputedStyle(ele)[attr])
            }
            let distance = (target[attr] - current) / 5
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if (current === target[attr]) {
                clearInterval(timerObj[attr])
                delete timerObj[attr]
                if (getObjLength(timerObj) === 0) {
                    cb()
                }
            } else {
                if (attr === 'opacity') {
                    ele.style[attr] = (current + distance) / 100
                } else {
                    ele.style[attr] = current + distance + 'px'
                }

            }
        }, 30)
    }
}
function getObjLength(obj) {
    let n = 0;
    for (let attr in obj) {
        n++
    }
    return n
}