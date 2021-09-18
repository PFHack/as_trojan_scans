/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-18 17:58:26
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */

'use strict';

const UI = require('./libs/ui');
const SCANNER = require('./libs/scanner');
/**
 * 插件类
*/
class Plugin {
  constructor(opt) {
    new UI(opt)
        .onScan((argv) => {
          return new SCANNER(opt, argv);
    })
  }
}

module.exports = Plugin;