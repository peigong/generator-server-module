# <%= name %> #

## 使用方法 ##

### Windows测试环境 ###

进入`dist/bin`目录，使用`shift+右键`，在当前目录打开命令窗口。

执行命令`node-server.cmd`，启动桩的Web服务（安装NPM包，扫瞄服务模块，启用端口，启用域名）。

### Linux产品环境 ###

进入`dist/bin`目录，可以使用以下命令：

1. `sh node-server.sh start`：启动产品环境的Web服务（安装NPM包，扫瞄服务模块，启用端口，启用域名）。
2. `sh node-server.sh stop`：停止产品环境的Web服务。
3. `sh node-server.sh restart`：重启产品环境的Web服务。
