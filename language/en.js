/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-18 17:58:26
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */
module.exports = {
  title: "as_Trojan_Scan",
  success: "success",
  error: "fail",
  toolbar: {
    start: "Start",
  },
  cella: {
    title: "scan configs",
    start: "start scan",
    form: {
        path: "Scan path",
        file_ext: "file suffix"
    }
  },
  cellb: {
    title: "Scan results",
    grid: {
        id: "No.",
        file: "File",
        update_time: "Update time",
        result: "Features",
        mark: "mark",
    }
}
}
