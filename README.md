
#### 【疫情监控可视化分析系统】
##### 项目技术概述：
 - 本次系统开发采用 windows 系统，开发软件选择 vscode 。
 - 数据获取：使用 node 做爬虫，期间用到 cheerio 库，爬取丁香园相关疫情数据。
 - 数据存储：使用 mysql 数据库建库建表，合理存储爬取到的各类疫情数据。
 - 后端搭建：使用 node 语言和 express 框架快速搭建服务器，规定 api 接口，实现具体的业务逻辑。
 - 前端搭建：使用 vue 框架和 echarts 图表库来做项目前端数据页面的可视化展示。
 - 前后端交互：前后端交互过程中，网络请求选择 axios 库去实现。

##### 项目主要功能：
   [该系统主要侧重于疫情数据的统计展示]
 - 疫情数据大屏展示（全国累计趋势折线图，全国新增趋势折线图，国内外数据对比柱状图，非湖北地区省确诊 TOP5 状态图，世界国家确诊 TOP5 饼状图）。
 - 全球疫情地图分布。
 - 国内疫情地图分布。
 - 全球各国最新疫情数据（支持国家名称搜索,具体日期查询）。
 - 国内各省最新疫情数据（支持国内省份名称搜索，具体日期查询）。
 - 国内各城市最新疫情数据（支持国内城市名称搜索）。
 - 疫情推送信息（相关文章，防疫指南，推荐信息，相关新闻）。
 - 系统当前时间显示。


##### 项目运行：
- 先确保本地电脑上已经安装配置好了开发所需的 mysql 数据库。使用 cmd 打开命令行面板，输入 net start mysql 命令将 mysql 服务启动，接着导入源码 mysql 目录下的 .sql 文件，在数据库可视化软件中生成项目所需的相关表和数据，这里的数据库可视化软件，本人选择的是 navicat，可以选择其他数据库可视化软件。
- 确保电脑中全局 node 实现安装配置，使用 cmd 打开命令行界面，进入到源码中 api 目录下，输入 node app.js 命令启动后端服务（注意修改 mysql 数据库的用户名和密码为你电脑本地用户名和密码）。
- 电脑全局安装 vue-cli3.x 脚手架，使用 cmd 打开命令行界面，进入到源码中 web 目录下，先输入 npm install 命令，下载项目所需要的依赖和包文件。安装成功后输入 vue ui 命令，打开 vue 脚手架 UI 面板，编译启动项目后，即可在浏览器看到本项目运行的结果。

##### 项目功能测试：
- 全国累计趋势折线图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例切换正常，下载功能正常。
- 全国新增趋势折线图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例切换正常，下载功能正常。
- 最新数据统计数据渲染正确，点击对应按钮，数据动态渲染。
- 国内外数据对比柱状图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例切换正常。
- 非湖北地区省确证 TOP5 柱状图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例切换正常，下载功能正常。
- 世界国家确诊 TOP5 饼状图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例切换正常，下载功能正常。
- 中国疫情地图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例页面数据明暗切换正常，地图缩放和移动功能正常。
- 世界疫情地图数据渲染正常，鼠标悬浮后，提示框数据显示一致，点击图例页面数据明暗切换正常，地图缩放和移动功能正常。
- 全球各国数据页面数据渲染正常，根据国家名称搜索功能正常，搜索信息提示正常，根据日期搜索功能正常。
- 中国各省数据页面数据渲染正常，根据省份名称搜索功能正常，搜索信息提示正常，根据日期搜索功能正常。
- 中国各城市数据页面数据渲染正常，根据城市名称搜索功能正常，搜索信息提示正常。
- 相关文章页面数据请求渲染正常，点击查看，弹出框中对应的文章主题正常，关闭浮层按钮功能正常。
- 推荐信息页面数据请求渲染正常，点击图片下方对应的链接，页面跳转正常。
- 防疫指南页面数据请求渲染正常。
- 相关新闻页面数据请求渲染正常，点击查看页面跳转正常。
- 系统时间数据请求渲染正常，相关菜单项点击，页面跳转正常。

