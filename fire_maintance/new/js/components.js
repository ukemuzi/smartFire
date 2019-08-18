/*
* head-nav 组件，使用方法参考vant-ui的 van-nav-bar 组件
*
* */
Vue.component('head-nav', {
  template:
  '<div class="head-nav-bar" :class="{\'head-nav-bar-border\': border}" :style="{position: fixed?\'fixed\':\'relative\', zIndex: zIndex}" @touchmove.prevent.stop>' +
  ' <div class="head-nav-bar-left" @click="onClickLeft">' +
  '   <slot name="left">' +
  '     <img class="head-nav-bar-left-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAoCAYAAAAVBmHYAAAC00lEQVRIS63XfcjNZxzH8ffH09oIjWYRWciSkH8m0v7Z7U6e2qI8xcqUsqy2mhVrdecPd4qmFYVSCHnYGvJYkvyhtPLHWsofiyRPuUOe+eh7dx1djnPu83j99zt1Xp/rd53r+72uI5o4bA8EDgKTgLVqlm17KHAK+DyZHU3BbY9O8LBsskcaxm1PBI4Dn2RwvME3DeG2vwT+Bvpm8AFgsaTndeO2ZwP7gA8zeBuwQtLr+Kwu3PYSYAfQI4PbJf2Sb5Cacds/ABuBbgkysFrShuKdVxNuuw34NUNepWXYXmpLV4XbjlluBlZmyDNgkaRD5WqlIm67J7ATWJghj4CvJZ3pqgi7xG3HToitNSND7sWzpIuVqrssbrsfcASYmiE3gFZJ/1aCy25F24OAE8CEDLkKtEj6vxq4JG57eOoTozLkcprxrWrh93DbYxI8JEMuADMlddQCv4Pb/gI4BgzIkGhIcyU9rhV+i9v+CvgT6JMhe4Glkl7UA3fitucA+4EPMmQL8H2hATWC3wHieCqMdZLyEq/X7pz5TeDTTNgE/CQpGlJDI/BW4DDwUSZFuS+X9LIRvbNCbU8BjgL9M+wvYIGkp/UGvC1/2+OAk0VLdBaYI+lhPQHv9BbbI4DTwGcZdgmYLulurQHvNS7bg9MbjM2w/1L5X68loGRXtP1xqta4ORXGNWCapCvVBnTVcnunqm3JsNtpif6pJqDSYdEL2BP9JcMeALMlnasUUM0x1x3YCnyXYU+A+ZLiQlR2VMQL37TdDvycSdHQlknaVU6vGk/FFvj67DIVN6sfJf1eKqAmPAXE8sQyxXIVRpuk34oDasZTQPzAu4va9B/Aqrzh1YWngNii0fDyAyZ21reFhlc3ngKiyOJojKIrjHieJ+lJQ3gKiDYRDS/aRmGcB2Y1jKeAaHTxb2JkFnCqKXgKiNMsLlLjU8D9puEpIA6b+FEnA2veANUd41HCFm2mAAAAAElFTkSuQmCC" alt="">' +
  '     <span v-if="leftText" class="head-nav-bar-left-text">{{leftText}}</span>' +
  '   </slot>' +
  ' </div>' +d
  ' <div class="head-nav-bar-title">' +
  '   <slot name="title">{{title}}</slot>' +
  ' </div>' +
  ' <div class="head-nav-bar-right" @click="onClickRight">' +
  '   <slot name="right">' +
  '     <span v-if="rightText" class="head-nav-bar-text">{{rightText}}</span>' +
  '   </slot>' +
  ' </div>' +
  '</div>',
  props: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {}
  },
  methods: {
    onClickLeft: function () {
      this.$emit('click-left')
    },
    onClickRight: function () {
      this.$emit('click-right')
    }
  }
});


Vue.component('hs-list-load', {
  template:
  ' <div' +
  '   class="hs-list-load"' +
  '   ref="listLoad"' +
  '   :style="{width: width, height: height, overflowY: scrollY}"' +
  '   @scroll="scrollChange($event)"' +
  ' >' +
  '   <div' +
  '     class="list-load-pull"' +
  '     v-if="pullRefresh"' +
  '     :class="{\'list-load-pull-move\': pull_move}"' +
  '     :style="{height: pull_height + \'px\'}"' +
  '   >' +
  '     <div class="list-load-pull-wrap" v-show="is_pull">' +
  '       <img class="list-load-loading-icon" v-show="loading" src="data:image/gif;base64,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"/>' +
  '       <span class="list-load-pull-text">{{pull_message}}</span>' +
  '     </div>' +
  '   </div>' +
  '   <slot></slot>' +
  '   <div class="list-load-loading" v-show="finished">' +
  '     <span class="list-load-loading-text">{{finishedText}}</span>' +
  '   </div>' +
  '   <div class="list-load-loading" v-show="!is_pull && !finished && loading">' +
  '     <img class="list-load-loading-icon" src="data:image/gif;base64,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"/>' +
  '     <span class="list-load-loading-text">{{loadingText}}</span>' +
  '   </div>' +
  ' </div>',
  props: {
    width: { // 宽
      type: String,
      required: true
    },
    height: { // 高
      type: String,
      required: true
    },
    scrollY: { // overflow-y 是否允许滚动
      type: String,
      default: 'scroll'
    },

    /*
    * 加载功能模仿 vant-ui 的 list 组件
    * */
    offset: { // 	滚动条与底部距离小于 offset 时触发load事件
      type: Number,
      default: 300
    },
    immediateCheck: { // 是否在初始化时立即执行滚动位置检查
      type: Boolean,
      default: true,
    },
    loading: { // 是否处于加载状态，加载过程中不触发load事件
      type: Boolean,
      required: true
    },
    finished: { // 是否已加载完成，加载完成后不再触发load事件
      type: Boolean,
      default: false
    },
    loadingText: { // 加载过程中的提示文案
      type: String,
      default: '加载中...'
    },
    finishedText: { // 加载完成后的提示文案
      type: String,
      default: '没有更多了'
    },

    /*
    * 下拉刷新功能
    * */
    pullRefresh: { // 是否启用下拉加载功能，默认不开启
      type: Boolean,
      default: false
    },
    pullingText: { // 下拉过程文案
      type: String,
      default: '下拉即可刷新...'
    },
    loosingText: { // 释放过程文案
      type: String,
      default: '释放即可刷新...'
    },
    successText: { // 加载成功提示文案, 目前没加这个功能
      type: String,
      default: '下拉即可刷新...'
    },
    successDuration: { // 加载成功提示时长(ms)，目前没加这个功能
      type: Number,
      default: 500
    },
    animationDuration: { // 加载成功提示文案, 目前没加这个功能, 采用css动画, 固定时间
      type: Number,
      default: 1000
    },
    headHeight: {
      type: Number,
      default: 50
    }
  },
  model: {
    prop: 'loading',
    event: 'changeLoading'
  },
  data: function () {
    return {
      is_pull: false, // 是否为下拉刷新
      pull_message: '', // 当前下拉提示
      pull_height: 0, // 下拉刷新模块高度
      pull_move: false, // 下拉刷新模块过渡控制
      num_height: Number(this.height.replace('px', '')),
    }
  },
  watch: {
    loading: function (val, old) {
      setTimeout(function () {
        this.check(this.$refs.listLoad)
      }.bind(this), 1000)

      setTimeout(function () {
        this.pull_height = 0
        this.is_pull = false
      }.bind(this), this.animationDuration)
    },
    finished: function (val) {
      if (val) this.$emit('changeLoading', false)

      setTimeout(function () {
        this.check(this.$refs.listLoad)
      }.bind(this), 1000)
    }
  },
  mounted() {
    if (this.immediateCheck) {
      this.$nextTick(this.check(this.$refs.listLoad))
    }
    if (this.pullRefresh) {
      this.$refs.listLoad.addEventListener('touchstart', this.tchStart, false)
    }
  },
  methods: {
    scrollChange(ev) {
      var ele = ev.currentTarget
      if (!this.finished) {
        this.check(ele)
      }
    },

    check(ele) {
      // console.log(1, ele.scrollHeight, ele.scrollTop, this.num_height);
      if (this.loading || this.finished) {
        return
      }

      if (ele.scrollHeight - ele.scrollTop - this.num_height < this.offset) {
        this.is_pull = false
        this.$emit('changeLoading', true)
        this.$emit('load') // 触发load事件
      }
    },
    tchStart(ev) {
      var This = this
      var ele = ev.currentTarget
      var ts_y = ev.touches[0].clientY // 手指按下位置
      var cg_y = 0

      This.pull_move = false

      var tchMove = function (ev1) {
        if (this.loading) {
          return
        }

        cg_y = ev1.touches[0].clientY - ts_y

        if (ele.scrollTop === 0 && cg_y > 0 && ev1.touches.length > 0) {
          This.is_pull = true

          if (cg_y <= 50) {
            This.pull_height = cg_y
          } else {
            This.pull_height = 40 + Math.floor(Math.sqrt(cg_y - 40) * 5) // 橡皮筋效果
          }

          if (This.pull_height >= This.headHeight) {
            This.pull_message = This.loosingText
          } else {
            This.pull_message = This.pullingText
          }
        }
      }

      var tchEnd = function () {
        This.pull_move = true

        if (This.pull_height >= This.headHeight) {
          This.pull_height = This.headHeight
          This.pullRefreshActive()
        } else {
          This.pull_height = 0
        }

        ele.removeEventListener('touchmove', tchMove, false)
        ele.removeEventListener('touchend', tchEnd, false)
      }

      ele.addEventListener('touchmove', tchMove, false)
      ele.addEventListener('touchend', tchEnd, false)
    },
    pullRefreshActive() {
      this.is_pull = true
      this.pull_message = this.loadingText
      this.$emit('changeLoading', true)
      this.$emit('refresh')
    }
  }
});


Vue.component('hs-search', {
  template:
  ' <div class="hs-search">' +
  '   <form action="/" @submit.prevent>' +
  '     <input class="hs-search-input" type="search" v-model="val" @focus="focus" @blur="blur" @search="search($event)" placeholder="搜索内容描述..." >' +
  '     <img class="hs-search-clear-icon" v-show="show_clear" @click="clearVal" src="data:image/png;base64,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" alt="">' +
  '   </form>' +
  ' </div>',
  props: {
    value: String
  },
  model: {
    prop: 'value',
    event: 'onInput'
  },
  data: function () {
    return {
      val: '',
      show_clear: false
    }
  },
  watch: {
    val: function (val) {
      this.$emit('onInput', val)
      this.show_clear = val.length > 0
    }
  },
  methods: {
    clearVal: function () {
      this.val = ''
      this.$emit('clear')
    },
    focus: function () {
      this.$emit('focus')
    },
    blur: function () {
      this.$emit('blur')
    },
    search: function (ev) {
      ev.preventDefault()
      this.$emit('search')
    }
  }
});


Vue.component('tabs-nav', {
  template:
  '<div class="tabs-nav" ref="tabNav">' +
  ' <div class="tab-wrap" ref="tabWrap">' +
  '   <div :class="tab_ul_class" ref="tabsUl">' +
  '     <template v-for="(tab,index) in tabs">' +
  '       <div class="tab-text" :class="{active: tab_index===index}" :key="index" @click="selectTab(index)"><span class="tab-text-name">{{tab}}</span></div>' +
  '     </template>' +
  '   </div>' +
  '   <div class="tab-line" :style="{width: line_width+\'px\', transform: \'translateX(\'+line_left+\'px)\'}"></div>' +
  ' </div>' +
  '</div>',
  props: {
    tabs: { // 标签数组
      type: Array,
      default: [],
      required: true
    },
    tab_index: { // 当前标签的索引
      type: Number,
      default: 0,
      required: true
    },
    swipeThreshold: { // 滚动阈值，标签数量超过多少个可滚动
      type: Number,
      default: 4
    }
  },
  model: {
    prop: 'tab_index',
    event: 'tab_index'
  },
  data: function () {
    return {
      tab_ul_class: 'tab-ul-1',
      tabs_ele: [], // 对应每个导航的节点
      line_width: 45, // 导航滑块 width
      line_left: 15, // 导航滑块 left
    }
  },
  watch: {
    tabs: function (val) { // 这里不用深度监听，只监听tags.lenght变化
      var This = this
      this.setTabUlClass()
      this.getTabsEle()
      this.$nextTick(function () {
        setTimeout(function () {
          This.setLineStyle(this.tab_index)
        })
      })
    },
    tab_index: function (val) {
      var This = this
      this.$nextTick(function () {
        This.setLineStyle(val)
      })
    }
  },
  created() {
    this.setTabUlClass()
  },
  mounted() {
    var This = this
    this.$nextTick(function () {
      This.setLineStyle(This.tab_index) // 有可能获取不到，下面定时再获取一次

      setTimeout(function () {
        This.getTabsEle()
        This.setLineStyle(This.tab_index)
      }, 500)
    })
  },
  methods: {
    // 切换tab
    selectTab: function (index) {
      this.$emit('tab_index', index)
    },
    // 获取nav子节点
    getTabsEle: function () {
      if (this.$refs.tabsUl) {
        this.tabs_ele = this.$refs.tabsUl.children // 获取所有tab节点
      }
    },
    // 设置tab-ul样式
    setTabUlClass: function () {
      this.tab_ul_class = this.tabs.length > this.swipeThreshold ? 'tab-ul-1' : 'tab-ul-2'
    },
    // 设置导航滑块样式
    setLineStyle: function (index) {
      var ele = this.tabs_ele[index]
      var tabWrap = this.$refs.tabWrap

      if (!ele) return;

      // 保持激活nav位于视窗内
      if (ele.offsetLeft < tabWrap.scrollLeft) {
        tabWrap.scrollLeft = ele.offsetLeft
      }
      if (ele.offsetLeft + ele.clientWidth > tabWrap.scrollLeft + tabWrap.clientWidth) {
        tabWrap.scrollLeft = ele.offsetLeft + ele.clientWidth - tabWrap.clientWidth
      }

      this.line_width = ele.clientWidth - 30
      this.line_left = ele.offsetLeft + 15
    }
  }
});


/*
---默认筛选数据格式如下：
select: [
  {
    title: '单位类型', // title
    last_text: '', // 最后一次点击的选项的文本
    options: [
      {text: '火灾危险单位', active: false},
      {text: '其他重点单位', active: false},
      {text: '十小场所', active: false},
      {text: '其他一般单位', active: false}
    ]
  },
  {
    title: '单位类型', // title
    name: '消防大队', // 二级 title
    last_text: '', // 最后一次点击的选项的文本
    options: [
      {text: '支队本级', active: false},
      {text: '江岸大队', active: false},
      {text: '江汉大队', active: false},
      {text: '硚口大队', active: false}
    ]
  },
  {
    name: '所属管段', // 二级 title
    last_text: '', // 最后一次点击的选项的文本
    options: [
      {text: '火灾危险单位', active: false},
      {text: '火灾危险单位', active: false},
      {text: '火灾危险单位', active: false},
      {text: '火灾危险单位', active: false}
    ]
  },
],
*/

Vue.component('top-filter', {
  template:
  ' <div class="hs-top-filter" v-if="is_show">' +
  '   <div class="top-filter-bg" :class="{\'top-filter-bg-move\':active}" @click="bgClick"></div>' +
  '   <div class="screen-all" :class="{\'screen-all-move\':active, \'screen-title-hide\': hideTitle}">' +
  '     <div class="screen-title"><em class="screen-title-em">{{title}}</em><span class="screen-title-span">{{tip}}</span></div>' +
  '     <div class="screen-all-wrap">' +
  '       <slot name="filter">' +
  '         <template v-for="(item, index) in select">' +
  '          <div class="typeOne" :class="{\'border-top\': index !== 0 && item.title}">' +
  '            <div class="type_title" v-if="item.title">' +
  '              <em>{{item.title}}</em><span class="last_text" v-if="!item.name">{{item.last_text}}</span>' +
  '            </div>' +
  '            <div class="name" v-if="item.name">' +
  '              <i></i><span class="text">{{item.name}}</span><span class="last_text">{{item.last_text}}</span>' +
  '            </div>' +
  '            <div class="type_item">' +
  '              <template v-for="(sel, index_1) in item.options">' +
  '                <div class="type_item_son" :class="{active: sel.active}" :key="index_1" @click="selectOptions(sel, item, index)">{{sel.text}}</div>' +
  '              </template>' +
  '            </div>' +
  '          </div>' +
  '        </template>' +
  '       </slot>' +
  '     </div>' +
  '     <div class="seleBtn">' +
  '       <div class="resetBtn" @click="reset">重置</div>' +
  '       <div class="shureBtn" @click="confirm">确定</div>' +
  '     </div>' +
  '   </div>' +
  ' </div>',
  props: {
    select: {
      type: Array,
      default: []
    },
    is_show: {
      type: Boolean,
      required: false,
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    title: String,
    tip: String
  },
  model: {
    prop: 'is_show',
    event: 'input'
  },
  data: function () {
    return {
      active: false
    }
  },
  watch: {
    is_show: function (val) {
      this.$nextTick(function () {
        setTimeout(function () {
          this.active = val
        }.bind(this), 20)
      }.bind(this))
    }
  },
  methods: {
    bgClick: function () {
      this.active = false

      setTimeout(function () {
        this.$emit('input', false)
      }.bind(this), 300)
    },
    selectOptions: function (sel, item, index) {
      if (sel.active) {
        item.last_text = ''
        sel.active = false
      } else {
        item.last_text = sel.text
        sel.active = true
      }

      this.$emit('change', JSON.parse(JSON.stringify(this.select)), index)
    },
    reset: function () {
      for (var i = 0; i < this.select.length; i++) {
        var item = this.select[i]
        item.last_text = ''
        for (var j = 0; j < item.options.length; j++) {
          item.options[j].active = false
        }
      }
      this.$emit('reset')
    },
    confirm: function () {
      // 由于是引用赋值，修改选项，父组件的传递select其实也会被修改，这里用向上传值只做备用
      this.$emit('confirm', JSON.parse(JSON.stringify(this.select)))
    }
  }
});


/* 列表没数据，缺省页 */
Vue.component('hs-list-null', {
  template:
  ' <div class="hs-list-null" v-if="show">' +
  '   <img class="hs-list-null-img" src="data:image/png;base64,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" alt="">' +
  '   <div class="hs-list-null-msg">{{message}}</div>' +
  ' </div>',
  props: {
    show: {
      type: Boolean,
      required: false,
    },
    message: {
      type: String,
      default: '现在暂时没有数据'
    }
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  data: function () {
    return {
      active: false
    }
  },
  watch: {
    is_show: function (val) {
      this.$nextTick(function () {
        setTimeout(function () {
          this.active = val
        }.bind(this), 20)
      }.bind(this))
    }
  }
});


/* 列表没数据，缺省页 */
Vue.component('hs-go-back', {
  template:
  ' <div class="hs-go-back" v-if="show">' +
  '   <img class="hs-go-back-img" v-show="!active" @click="setContScroll" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADHElEQVRoQ+2XT2vUQBjGn3d2F1kR/yBKxR48eCiiCBYPLVRF/IfFgze91EubTeziF/AgiF9AKGyyLXoT9FJBFKUiarEiIghePHhQUKkUQUUR6e68MjCRsGSTTDZru5DcdjPJ/H7v+8wkIfT4QT3Oj1xgpTvYtgP1en2YmY+tNKCaX0o55zjOszCWUAHP89YC+Axgw2oQAPC9XC5vHxsb+9XKEyXwCcDGVSLwrVwu9ycWUNA9HaFVUvVEGPk22q5MU1NTm0ul0ml1fnl5ebZarX5NVFLDQV3pwPT09GCz2bxHRFs1zxchxOjExMQrQ77Y4ZkL1Ov1/VLKh0S0Pjg7M/8QQhy0LOt1LJXBgEwFNPwjIloXxqAljliW9dKAMXJoZgJx8D4FM/8UQhzOSiITAfXMkFI+CFT+A4DHAM5p8GsA1GtJv/qdpUTHAhpeZb6sYT8KIYaklDaAixr4MjNfF0LMZy3RkUAYvJRyxHGc957nXQkK2LZ9qVar7QiROG5Z1kLaNZFaoFarHSIitVX+q7wPr2DCBNT/SoKInhNRn+7ObyGEWtipJFIJaPj7RLTGj00QPkpAnZuZmdnZaDTms5AwFmiFZ+ZFZh5SsQnGoF0H/DFhEsx80nEctfgTH0YCruseBXDHr7yCLxaLI+Pj4+9aZ4wT8DvRbDZVdLboOP1h5hMmEokFFDwR3QVQ0pO1hY+LUEunBgA8TSuRSMDzvFEAsz48gKVCoTAcVnkfLkkHAmNTS8QKKHhmvk1ERT3hEoADlUrlbVRQTQR0xwaYeYGINvlxAnDKtu25qHkiBTzP28fML0zhTSLUEqc9zPzEl1Bv4oVCYVdUp+MELgC4alL5NBGKkThfqVRq7boQJ7ANwC0Au3Vs3iTd30wjFLyv67p7iUi9P/U1Go3BycnJxVQCSWHDxnUiYDJv7CI2uZnJgyztfVuvywXaVTKPUMKM5RHKI5QwKvlzwLRQ+S6UsGL5LpTvQgmj8t93Idd1zxLRDf11dca27ZsdsoZe3rU1oL/KqgCaUR8knUp1VaBTuCTX5wJJqtTNMT3fgb/lhyxPF5OxMwAAAABJRU5ErkJggg==" alt="">' +
  '   <div class="hs-go-back-num" v-show="active">' +
  '     <span class="hs-go-back-part">{{part | beyond}}</span>' +
  '     <span class="hs-go-back-total">{{total | beyond}}</span>' +
  '   </div>' +
  ' </div>',
  props: {
    contEle: {
      type: String,
      required: true
    },
    itemEle: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      cont_element: null,
      item_elements: [],
      item_top: [], // item 节点对应的 offseetTop 集合
      show: true,
      active: false,
      part: 0, // 当前位置
      timer: null
    }
  },
  watch: {
    show: function (val) {
      this.$nextTick(function () {
        setTimeout(function () {
          this.active = val
        }.bind(this), 20)
      }.bind(this))
    },
    'list.length': function (val) {
      this.getItemElement()

      if (val === 0) {
        this.part = 0
      }

      this.$nextTick(function () {
        this.contScroll()
      }.bind(this))
    }
  },
  filters: {
    beyond: function (val) {
      return val > 999? '999+' : val
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.cont_element = document.querySelector(this.contEle)
      this.cont_element.addEventListener('scroll', this.contScroll, false)
    }.bind(this))
  },
  methods: {

    getItemElement: function () {
      this.item_elements = document.querySelectorAll(this.itemEle)

      this.item_top = []
      for (var i = 0; i < this.item_elements.length; i++) {
        this.item_top[i] = this.item_elements[i].offsetTop // + this.item_elements[i].clientHeight
      }

      // this.total = this.item_elements.length
    },

    contScroll(ev) {
      var ele = this.cont_element
      var top = ele.scrollTop + ele.clientHeight
      var len = this.item_top.length

      // this.show = ele.scrollTop > ele.clientHeight

      this.active = true
      clearTimeout(this.timer)
      this.timer = setTimeout(function () {
        this.active = false
      }.bind(this), 1000)

      if (top >= this.item_top[len - 1]) {
        this.part = len
        return
      }

      for (var i = 0; i < len; i++) {
        if (this.item_top[i] < top && top <= this.item_top[i + 1]) {
          this.part = i + 1
          break
        }
      }
    },

    setContScroll: function () {
      this.cont_element.scrollTop = 0
    }
  }
});
