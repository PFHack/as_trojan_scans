/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-18 18:47:30
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */

class Scanner {
  constructor(opt, argv) {
    return new Promise((res, rej) => {
        // 初始化核心模块
        let core = new antSword['core'][opt['type']](opt);
        // 请求数据
        let code = {};
        if (opt['type'] == 'php') {
            code = {
                _: this.template[opt['type']](argv.scanpath, argv.scanext)
            }
            core.request(code).then(res)
            .catch((err)=>{return rej(err);});
        }
      })
  }
   /**
   * 扫描代码函数
   * @return {[type]}      [description]
   */
    get template() {
        return {
            php: (scanpath, scanext) => `
            $realpath = realpath('./');
            $selfpath = $_SERVER['PHP_SELF'];
            $selfpath = substr($selfpath, 0, strrpos($selfpath,'/'));
            define('REALPATH', str_replace('//','/',str_replace('\\\\','/',substr($realpath, 0, strlen($realpath) - strlen($selfpath)))));
            define('MYFILE', trim(preg_replace("/\\(\.\*\$/","",basename(__FILE__))));
            define('MYPATH', trim(preg_replace("/\\(\.\*\$/","",str_replace('\\\\', '/', dirname(__FILE__)))).'/');
            define('MYFULLPATH', trim(preg_replace("/\\(\.\*\$/","",str_replace('\\\\', '/', (__FILE__)))));
            define('HOST', "http://".\$_SERVER['HTTP_HOST']);
            function getCode()
                {
                return array(
                    '后门特征->eval('=>'eval\\(\(@|\"|\\'|\\$\)',
                    '后门特征->cmd.php'=>'cmd\.php',
                    '后门特征->webshell'=>'webshell',
                    '可疑代码特征->system('=>'system\(.*\)',
                    '可疑代码特征->passthru('=>'passthru\(.*\)',
                    '可疑代码特征->shell_exec('=>'shell_exec\(.*\)',
                    '可疑代码特征->exec('=>'exec\(.*\)',
                    '可疑代码特征->popen('=>'popen\(.*\)',
                    '可疑代码特征->proc_open'=>'proc_open',
                    '可疑代码特征->assert($'=>'assert\\(\(@|\"|\\'|\\$\)',
                    '加密后门特征->eval(gzinflate('=>'eval\\(gzinflate\(\.*\)',
                    '加密后门特征->eval(base64_decode('=>'eval\\(base64_decode\(\.*\)',
                    '加密后门特征->eval(gzuncompress('=>'eval\(gzuncompress\(\.*\)',
                    '加密后门特征->eval(gzdecode('=>'eval\(gzdecode\(\.*\)',
                    '加密后门特征->eval(str_rot13('=>'eval\(str_rot13\(\.*\)',
                    '加密后门特征->gzuncompress(base64_decode('=>'gzuncompress\(base64_decode\(\.*\)',
                    '加密后门特征->base64_decode(gzuncompress('=>'base64_decode\(gzuncompress\(\.*\)'
                    );
                }
            function scan($path = '\.',$is_ext,$php_code) {
                $count=$scanned=0;
                $list = '';
                $ignore = array('.', '..' );
                $replace=array(" ","\n","\r","\t");
                $dh = @opendir( $path );
                while(false!==($file=readdir($dh))){
                    if( !in_array( $file, $ignore ) ){
                        if( is_dir( "$path$file" ) ){
                            scan("$path$file/",$is_ext,$php_code);
                        } else {
                            $current = $path.$file;
                            if(MYFULLPATH==$current) continue;
                            if(!preg_match("/$is_ext/i",$file)) continue;
                            if(is_readable($current))
                            {
                                $scanned++;
                                $content=file_get_contents($current);
                                $content= str_replace($replace,"",$content);
                                foreach($php_code as $key => $value)
                                {
                                    if(preg_match_all("/$value/i",$content))
                                    {
                                        $count++;
                                        $j = $count % 2 + 1;
                                        $filetime = date('Y-m-d H:i:s',filemtime($current));
                                        $reason = explode("->",$key);
                                        $url =  str_replace(REALPATH,HOST,$current);
                                        preg_match("/$value/i",$content,$arr);
                                        echo "$count|$current|$filetime|$reason[0]|$reason[1]\n";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                closedir( $dh );
            }    
            $dir = "${scanpath}";
            $is_ext="\(\.*\)";
            $dir = substr($dir,-1)!="/"?$dir."/":$dir;
            $count=$scanned=0;
            $php_code = getCode();
            scan($dir,$is_ext,$php_code);
            `
        }
    }
}

module.exports = Scanner;