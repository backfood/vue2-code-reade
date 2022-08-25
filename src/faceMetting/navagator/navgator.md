- 浏览器地址栏输入地址按下 enter 到显示页面发生了什么
- 浏览器进程
- localstorage、sessionstorage、cookie
- 请求头类型
- requestAnimationFrame
  - 相对于 setinterval ，requestanimationframe 可以在一次回流或重绘中把所有 dom 操作集中起来，时间间隔紧随浏览器刷新频率
  - 隐藏或不可见元素不会引起回流或重绘
- 浏览器有四种主要进程
  1. browser 进程
     - 负责 浏览器的前进后退、资源下载、页面的创建销毁……
  2. gui 进程
     - 绘制 3D 等
  3. 第三方插件
  4. 浏览器渲染进程
     1. 每个 tab 一个进程互不影响
     2. 负责页面渲染、脚本执行、事件处理……
     3. 渲染进程是多线程的
        1. gui 渲染线程与 js 线程互斥
           - 解析 html、css、构建和 render dom、布局绘制等
        2. js 引擎线程
           - 处理 js
        3. 事件触发线程
           - 用来控制事件循环，将对应的任务添加到事件线程中，当对应事件应当被触发，添加到待处理事件队列队尾，等待 js 引擎处理
           - 由于 js 是单线程的，所以事件都要排队等待 js 引擎处理
        4. 定时器触发线程
           - settimeout 和 setinterval 所在的线程，计时完毕后将事件添加到事件队列队尾
           - 时间间隔最小为 4ms
        5. 异步 http 请求线程
