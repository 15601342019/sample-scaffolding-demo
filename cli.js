#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头dd
// 如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 命令实现修改



const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const inquirer = require('inquirer')

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Project name?'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Project password?'
        }
    ])
    .then((anwsers) => {
        // console.log(anwsers)
        // 根据用户回答的结果生成文件

        // 模板目录 /Users/liru/Documents/webstorm/summary/DEMO/part2/fed-e-task-02-01/code/sample-scaffolding/templates
        const tmplDir = path.join(__dirname, 'templates')
        // 目标目录 绝对路径
        const destDir = process.cwd()
        fs.readdir(tmplDir, (err, files) => {
            // files : [ 'index.html', 'style.css' ] 相对路径
            if (err) throw err;
            files.forEach(file => {
                // console.log('file:', file) // file: 'index.html', 'style.css'
                // 通过模板引擎渲染文件
                // 第一个参数：要将模板文件写到哪里，即文件的绝对路径
                // 第二个参数：模板引擎工作的数据上下文；
                // 第三个参数：renderFile渲染成功之后的回调函数
                ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
                    // 如果渲染过程中出现了意外，可以把错误抛出去
                    if (err) throw err
                    console.log('result:', result);
                    // 将结果写入目标文件路径
                    fs.writeFileSync(path.join(destDir, file), result)
                })
            });
        })
    })
