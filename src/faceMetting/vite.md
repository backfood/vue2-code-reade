- 原理
  - 浏览器支持 esm
  - webpack
    - bundle 机制
      - 构建模块依赖图和将模块依赖图拆分为几个供浏览器使用的文件
    - 构建 module graph 的过程中，涉及到大量的文件 IO、文件 transfrom、文件 parse 操作；以及分解 module graph 的过程中，需要遍历 module graph、文件 transform、文件 IO 等
- 哪些 api