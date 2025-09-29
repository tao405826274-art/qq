## iqilu 静态源

通过 GitHub Actions 自动抓取最新直播源，生成 M3U 文件。

通过 Vercel Serverless Function 提供 302 跳转。

直接导入播放器使用，无需额外配置。

## 部署方法

点击下面的按钮，按照提示登录 Vercel 并创建项目即可：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/plsy1/iqilu)

部署完后修改 config.json 文件中 baseUrl 的值，action 会自动运行，生成新的 m3u。