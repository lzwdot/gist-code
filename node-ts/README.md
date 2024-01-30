## 手写 ts 装饰器

### 安装 
```
npm i typescript ts-node-dev tslint @types/node -D
npm i koa koa-static koa-bodyparser koa-router @types/koa @types/koa-bodyparser @types/koa-router -D
npm i sequelize-typescript@0.6.11 sequelize@5.8.12 reflect-metadata mysql2 -D
```

### 启动

```
"scripts": {   
    "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",
    "build": "tsc -P tsconfig.json && node ./dist/index.js",
    "tslint": "tslint --fix -p tsconfig.json"
  },
```

### `tsconfig.json`

```
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es2017",
    "module": "commonjs", // 组织代码方式
    "sourceMap": true,
    "moduleResolution": "node", // 模块解决策略
    "experimentalDecorators": true, // 开启装饰器定义
    "allowSyntheticDefaultImports": true, // 允许 es6 方式 import
    "lib": ["es2015"],
    "typeRoots": ["./node_modules/@types"]
  },
  "include": ["scr/**/**"]
}
```
