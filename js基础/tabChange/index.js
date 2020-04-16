function Tabs(id) {
    this.ele = document.querySelector(`#${id}`)
    this.btns = this.ele.querySelectorAll('ul>li')
    this.tabs = this.ele.querySelectorAll('ol>li')
}
Tabs.prototype.change = function () {
    let _this = this;
    this.btns.forEach((item, index) => {
        item.addEventListener('click', () => {
            _this.btns.forEach((item, index) => {
                item.className = ''
                _this.tabs[index].className = ''
            })
            item.className = 'active'
            _this.tabs[index].className = 'active'
        })
    });
}