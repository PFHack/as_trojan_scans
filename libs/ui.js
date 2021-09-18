/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-18 18:47:44
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */
const WIN = require('ui/window');
const LANG = require('../language/');

class UI {
    constructor(opt) {
        // 创建一个windows窗口
      this.win = new WIN({
        title: `${LANG['title']} - ${opt['url']}`,
        // 作为一名代码洁癖患者，我连尺寸的Number都要求有意义，嗯。
        height: 444,
        width: 520,
      });
      this.createMainLayout();
        return {
        onScan: (func) => {
            this.bindToolbarClickHandler(func);
        },
        onAbout: () => {}
        }
    }
    createMainLayout() {
        let layout = this.win.win.attachLayout('2E');
        // 扫描输入
        layout.cells('a').hideHeader();
        layout.cells('a').setText(`<i class="fa fa-cogs"></i> ${LANG['cella']['title']}`);
        // 扫描结果
        layout.cells('b').setText(`<i class="fa fa-bars"></i> ${LANG['cellb']['title']}`);
        layout.cells('b').collapse();
    
        // 创建toolbar
        this.createToolbar(layout.cells('a'));
        // 创建form
        this.createForm(layout.cells('a'));
        // 创建grid
        this.createGrid(layout.cells('b'));
    
        this.layout = layout;
    }
    createToolbar() {
        let toolbar = cell.attachToolbar();
        toolbar.loadStruct([
        { id: 'start', type: 'button', text: LANG['cella']['start'], icon: 'play' }
        ]);
        this.toolbar = toolbar;
    }
}

module.exports = UI;