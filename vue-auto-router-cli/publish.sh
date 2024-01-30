#!/usr/bin/env bash
nrm use npm # 更换镜像

echo '----登录----'
npm login
echo '----发布中----'
npm publish

nrm use hcloud # 还原镜像
echo '发布完成'
exit
