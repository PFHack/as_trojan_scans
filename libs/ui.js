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
    createToolbar(cell) {
        let toolbar = cell.attachToolbar();
        toolbar.loadStruct([
        { id: 'start', type: 'button', text: LANG['cella']['start'], icon: 'play' }
        ]);
        this.toolbar = toolbar;
    }

    createForm(cell) {
        let formdata=[{
            type: 'settings', position: 'label-left',
            labelWidth: 150, inputWidth: 200
          }, {
            type: 'block', inputWidth: 'auto',
            offsetTop: 12,
            list: [{
                type: 'input', label: LANG['cella']['form']['path'], name: 'scanpath',
                required: true, validate:"NotEmpty",
                value: '/var/www/html/default/'
              }, {
                type: 'input', label: LANG['cella']['form']['file_ext'], name: 'scanext',
                required: true,
                value: ''
            }]
        }];
        let form = cell.attachForm(formdata, true);
        form.enableLiveValidation(true);
        this.form = form;
    }

    createGrid(cell) {
        let grid = cell.attachGrid();
        grid.setHeader(`
          ${LANG['cellb']['grid']['id']},
          ${LANG['cellb']['grid']['file']},
          ${LANG['cellb']['grid']['update_time']},
          ${LANG['cellb']['grid']['result']},
          ${LANG['cellb']['grid']['mark']}
        `);
        grid.setColTypes("ro,ro,ro,ro,ro");
        grid.setColSorting('str,str,str,str,str');
        grid.setInitWidths("50,250,100,100,150");
        grid.setColAlign("left,left,left,left,left");
        grid.enableMultiselect(true);
        grid.init();
        this.grid = grid;
    }
    bindToolbarClickHandler(callback) {
        this.toolbar.attachEvent('onClick', (id) => {
            switch (id) {
                case 'start':
                    this.win.win.progressOn();
                    // 获取FORM表单
                    let formvals = this.form.getValues();
                    callback({
                        scanpath: formvals['scanpath'],
                        scanext: formvals['scanext']
                      }).then((ret) => {
                         // 解析扫描结果
                        let griddata = [];
                        ret.text.split('\n').map((item, i) => {
                            if (!item) { return };   
                            item = antSword.noxss(item);
                            griddata.push({
                                    id: i,
                                    data:item.split('|')
                                });     
                        })
                        this.grid.clearAll();
                        this.grid.parse({rows: griddata}, "json");
                        this.layout.cells('a').collapse();
                        this.layout.cells('b').expand();
                        toastr.success(LANG['success'], antSword['language']['toastr']['success']);
                        this.win.win.progressOff();
                    }).catch((err) => {
                        toastr.error(LANG['error'], antSword['language']['toastr']['error']);
                        this.win.win.progressOff();
                      })
                    break;
                default:
                    break;    
            }
        });
    }    
}

module.exports = UI;