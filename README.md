# vue-music
该项目在慕课网上有课程：全网稀缺Vue 2.0高级实战 独立开发专属音乐WebAPP

欢迎star，源码在此 webapp QQ音乐接口

由于QQ音乐的播放源接口经常会变，而我使用的是vue2.5以上的版本，有些地方会跟课程教的不一样，欢迎QQ交流，后期打算重构该项目（还有些功能暂未实现），使用网易云的接口，有什么意见，欢迎提出哦



分析：





效果图：




开发目的

找个vue项目练手，学习一下老师的思想，提高自身的技术能力。

在项目中实战Vue.js技术栈

MVVM框架：Vue.js （版本2.x）

状态管理：Vuex

前端路由：Vue Router

服务端通讯：axios、jsonp

移动端滚动库：better-scroll

构建工具：webpack 2.0

源码：es6

其他工具

vue-cli：Vue 脚手架工具

iconfont：阿里巴巴图标库

fastclick：消除 click 移动游览器 300ms 的延迟

console:  移动端打印测试

实现功能

播放器内核、推荐页面、热榜页面、歌手页面、歌单详情、歌手详情、排行榜详情、搜索页面、播放列表，换肤等等功能。

推荐页面

推荐页分成三个部分，分别是 banner 轮播图、推荐歌单、推荐歌曲，数据都是使用axios请求 API 获取得到的，图片都使用vue-lazyload实现懒加载。

轮播图：使用better-scroll实现，

推荐歌单，推荐歌曲：使用vuex管理数据，方便组件之间的数据交互（播放器播放歌曲）。

排行榜页面

同推荐页面

歌手页面

这里最难理解的是移动端字母导航，建议花点时间好好理解

歌曲列表组件

用来显示歌曲列表，组件复用，例如：歌单详情页、排行榜详情页、歌手详情页、搜索结果等等。

歌单详情页

通过歌单的 ID 来获取歌单中的歌曲数据，这里没有做课程上的体验交互

排行榜详情、歌手详情

和歌单详情基本上没有什么区别，除了 UI 界面方面有细微的改动（根据不同的内容作出不同的优化）。

播放器

是核心组件，但是能不能播放音乐，那真的看缘分了，因为QQ音乐官网歌曲播放源接口会变，（参数改变，或其他，要重新抓取数据）

播放、暂停使用 HTML5 的 audio 实现。

数据、播放状态、播放历史、习惯歌曲等方面使用了vuex来进行管理，vuex的官方文档解释得很清楚了

图标使用iconfont阿里巴巴图标库，中间的唱片旋转动画使用了animation实现。

搜索功能

实现功能：搜索歌手、歌单、歌曲、热门搜索、保存搜索记录。

通过关键字请求 API 获取搜索数据，显示歌手、歌单、歌曲。

换肤功能

这里主要在播放页面能够进行换肤，提供了四种颜色，当然，你也可以添加您喜欢的颜色,可以切换不通的主题色






最后，如果你也是想要学习，欢迎star,和我交流，大家共同进步嘛，oh，yeah