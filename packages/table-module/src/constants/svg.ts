/**
 * @description icon svg
 * @author wangfupeng
 */

/**
 * 【注意】svg 字符串的长度 ，否则会导致代码体积过大
 * 尽量选择 https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=20293
 * 找不到再从 iconfont.com 搜索
 */

// 表格
export const TABLE_SVG = '<svg viewBox="0 0 1024 1024"><path d="M0 64v896h1024V64H0z m384 576v-192h256v192h-256z m256 64v192h-256v-192h256z m0-512v192h-256V192h256zM320 192v192H64V192h256z m-256 256h256v192H64v-192z m640 0h256v192h-256v-192z m0-64V192h256v192h-256zM64 704h256v192H64v-192z m640 192v-192h256v192h-256z"></path></svg>'

// 垃圾桶（删除）
export const TRASH_SVG = '<svg viewBox="0 0 1024 1024"><path d="M826.8032 356.5312c-19.328 0-36.3776 15.6928-36.3776 35.0464v524.2624c0 19.328-16 34.56-35.328 34.56H264.9344c-19.328 0-35.5072-15.3088-35.5072-34.56V390.0416c0-19.328-14.1568-35.0464-33.5104-35.0464s-33.5104 15.6928-33.5104 35.0464V915.712c0 57.9328 44.6208 108.288 102.528 108.288H755.2c57.9328 0 108.0832-50.4576 108.0832-108.288V391.4752c-0.1024-19.2512-17.1264-34.944-36.48-34.944z" p-id="9577"></path><path d="M437.1712 775.7568V390.6048c0-19.328-14.1568-35.0464-33.5104-35.0464s-33.5104 15.616-33.5104 35.0464v385.152c0 19.328 14.1568 35.0464 33.5104 35.0464s33.5104-15.7184 33.5104-35.0464zM649.7024 775.7568V390.6048c0-19.328-17.0496-35.0464-36.3776-35.0464s-36.3776 15.616-36.3776 35.0464v385.152c0 19.328 17.0496 35.0464 36.3776 35.0464s36.3776-15.7184 36.3776-35.0464zM965.0432 217.0368h-174.6176V145.5104c0-57.9328-47.2064-101.76-104.6528-101.76h-350.976c-57.8304 0-105.3952 43.8528-105.3952 101.76v71.5264H54.784c-19.4304 0-35.0464 14.1568-35.0464 33.5104 0 19.328 15.616 33.5104 35.0464 33.5104h910.3616c19.328 0 35.0464-14.1568 35.0464-33.5104 0-19.3536-15.6928-33.5104-35.1488-33.5104z m-247.3728 0H297.3952V145.5104c0-19.328 18.2016-34.7648 37.4272-34.7648h350.976c19.1488 0 31.872 15.1296 31.872 34.7648v71.5264z"></path></svg>'

// 表格 添加行
export const ADD_ROW_SVG = '<svg viewBox="0 0 1048 1024"><path d="M707.7888 521.0112h-147.456v-147.456H488.2432v147.456h-147.456v68.8128h147.456v147.456h72.0896v-147.456h147.456zM0 917.504V0h1048.576v917.504H0zM327.68 65.536H65.536v196.608H327.68V65.536z m327.68 0H393.216v196.608h262.144V65.536z m327.68 0h-262.144v196.608h262.144V65.536z m0 258.8672H65.536v462.0288H983.04V324.4032z"></path></svg>'

// 表格 删除行
export const DEL_ROW_SVG = '<svg viewBox="0 0 1048 1024"><path d="M907.6736 586.5472L747.1104 425.984l163.84-163.84-78.6432-78.6432-163.84 163.84L507.904 186.7776 429.2608 262.144l163.84 163.84-167.1168 167.1168 78.6432 78.6432 167.1168-167.1168 160.5632 160.5632 75.3664-78.6432zM0 917.504V0h1048.576v917.504H0z m983.04-327.68h-22.9376l-65.536-65.536H983.04V327.68h-91.7504l65.536-65.536h26.2144V65.536H65.536v196.608h317.8496l65.536 65.536H65.536v196.608h380.1088l-65.536 65.536H65.536v196.608H983.04v-196.608z"></path></svg>'

// 表格 添加列
export const ADD_COL_SVG = '<svg viewBox="0 0 1048 1024"><path d="M327.68 193.3312v186.7776H140.9024v91.7504H327.68v186.7776h88.4736V471.8592h190.0544V380.1088H416.1536V193.3312zM0 917.504V0h1048.576v917.504H0zM655.36 65.536H65.536v720.896H655.36V65.536z m327.68 0h-262.144v196.608h262.144V65.536z m0 262.144h-262.144v196.608h262.144V327.68z m0 262.144h-262.144v196.608h262.144v-196.608z"></path></svg>'

// 表格 删除列
export const DEL_COL_SVG = '<svg viewBox="0 0 1048 1024"><path d="M327.68 510.976L393.216 445.44v-13.1072L327.68 366.7968V510.976z m327.68-78.4384l65.536-65.536V507.904L655.36 442.368v-9.8304z m393.216 484.9664V0H0v917.504h1048.576z m-65.536-131.072h-262.144v-52.4288l-13.1072 13.1072-52.4288-52.4288v91.7504H393.216v-91.7504l-52.4288 52.4288-13.1072-13.1072v52.4288H65.536V65.536H327.68v121.2416l36.0448-36.0448 29.4912 29.4912V62.2592h262.144V180.224l49.152-49.152 16.384 16.384V62.2592h262.144V786.432z m-294.912-108.1344l-160.5632-160.5632-167.1168 167.1168-78.6432-78.6432 167.1168-167.1168L288.3584 278.528l78.6432-78.6432 160.5632 160.5632 163.84-163.84 78.6432 78.6432-163.84 163.84 160.5632 160.5632-78.6432 78.6432z"></path></svg>'

// 表头
export const TABLE_HEADER_SVG = '<svg viewBox="0 0 1024 1024"><path d="M704 128l-64 0L384 128 320 128 0 128l0 256 0 64 0 192 0 64 0 256 320 0 64 0 256 0 64 0 320 0 0-256 0-64L1024 448 1024 384 1024 128 704 128zM640 640 384 640 384 448l256 0L640 640zM64 448l256 0 0 192L64 640 64 448zM320 896 64 896l0-192 256 0L320 896zM640 896 384 896l0-192 256 0L640 896zM960 896l-256 0 0-192 256 0L960 896zM960 640l-256 0L704 448l256 0L960 640z"></path></svg>'

// 宽度
export const FULL_WIDTH_SVG = '<svg viewBox="0 0 1228 1024"><path d="M862.514337 563.200461H404.581995v121.753478a13.311987 13.311987 0 0 1-6.655993 11.468789 10.23999 10.23999 0 0 1-12.083188-1.433599l-204.799795-179.199821a13.721586 13.721586 0 0 1 0-20.479979l204.799795-179.302221a10.23999 10.23999 0 0 1 12.185588-1.535998 13.209587 13.209587 0 0 1 6.553593 11.673588v115.097485h457.932342V319.693504a11.571188 11.571188 0 0 1 18.841582-10.239989l204.799795 179.19982a13.721586 13.721586 0 0 1 0 20.47998l-204.799795 179.199821a10.23999 10.23999 0 0 1-12.185588 1.535998 13.311987 13.311987 0 0 1-6.655994-11.571188V563.200461zM136.499064 14.951409v993.893406a15.257585 15.257585 0 0 1-15.155185 15.052785H15.155185A15.155185 15.155185 0 0 1 0 1008.844815V14.951409a15.257585 15.257585 0 0 1 15.155185-15.052785h106.086294a15.155185 15.155185 0 0 1 15.257585 15.155185zM1228.798771 14.951409v993.893406a15.257585 15.257585 0 0 1-15.155185 15.052785h-106.188693a15.155185 15.155185 0 0 1-15.155185-15.052785V14.951409a15.257585 15.257585 0 0 1 15.155185-15.052785h106.086293A15.155185 15.155185 0 0 1 1228.798771 15.053809z"></path></svg>'

// 合并单元格
export const MERGE_CELL_SVG = '<svg viewBox="0 0 1024 1024"><path d="M482.2 508.4 331.3 389c-3-2.4-7.3-.2-7.3 3.6V478H184V184h204v128c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V144c0-15.5-12.5-28-28-28H144c-15.5 0-28 12.5-28 28v736c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v128H184V546h140v85.4c0 3.8 4.4 6 7.3 3.6l150.9-119.4c2.4-1.8 2.4-5.4 0-7.2zM880 116H596c-15.5 0-28 12.5-28 28v168c0 2.2 1.8 4 4 4h60c2.2 0 4-1.8 4-4V184h204v294H700v-85.4c0-3.8-4.3-6-7.3-3.6l-151 119.4c-2.3 1.8-2.3 5.3 0 7.1l151 119.5c2.9 2.3 7.3.2 7.3-3.6V546h140v294H636V712c0-2.2-1.8-4-4-4h-60c-2.2 0-4 1.8-4 4v168c0 15.5 12.5 28 28 28h284c15.5 0 28-12.5 28-28V144c0-15.5-12.5-28-28-28z"/></svg>'

// 拆分单元格
export const SPLIT_CELL_SVG = '<svg viewBox="0 0 1024 1024"><path d="M362.667 494.933v53.334l25.6-25.6zm0-241.066L460.8 352V78.933H57.6v98.134h305.067zm0 535.466v57.6H57.6v98.134h403.2V691.2zM661.333 494.933v53.334l-25.6-25.6zm0-241.066L563.2 352V78.933h403.2v98.134H661.333zm0 535.466v57.6H966.4v98.134H563.2V691.2z"/><path d="M753.067 341.333 693.333 281.6 512 460.8 330.667 281.6l-59.734 59.733 181.334 181.334L270.933 704l59.734 59.733L512 582.4l181.333 181.333L753.067 704 571.733 522.667z"/></svg>'

// 表格属性
export const TABLE_PROPERTY_SVG = '<svg viewBox="0 0 20 20"><path d="M8 2v5h4V2h1v5h5v1h-5v4h.021l-.172.351-1.916.28-.151.027c-.287.063-.54.182-.755.341L8 13v5H7v-5H2v-1h5V8H2V7h5V2h1zm4 6H8v4h4V8z" opacity=".6"/><path d="m15.5 11.5 1.323 2.68 2.957.43-2.14 2.085.505 2.946L15.5 18.25l-2.645 1.39.505-2.945-2.14-2.086 2.957-.43L15.5 11.5zM17 1a2 2 0 0 1 2 2v9.475l-.85-.124-.857-1.736a2.048 2.048 0 0 0-.292-.44L17 3H3v14h7.808l.402.392L10.935 19H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14z"/></svg>'

// 单元格属性
export const CELL_PROPERTY_SVG = '<svg viewBox="0 0 20 20"><path d="m11.105 18-.17 1H2.5A1.5 1.5 0 0 1 1 17.5v-15A1.5 1.5 0 0 1 2.5 1h15A1.5 1.5 0 0 1 19 2.5v9.975l-.85-.124-.15-.302V8h-5v4h.021l-.172.351-1.916.28-.151.027c-.287.063-.54.182-.755.341L8 13v5h3.105zM2 12h5V8H2v4zm10-4H8v4h4V8zM2 2v5h5V2H2zm0 16h5v-5H2v5zM13 7h5V2h-5v5zM8 2v5h4V2H8z" opacity=".6"/><path d="m15.5 11.5 1.323 2.68 2.957.43-2.14 2.085.505 2.946L15.5 18.25l-2.645 1.39.505-2.945-2.14-2.086 2.957-.43L15.5 11.5zM13 6a1 1 0 0 1 1 1v3.172a2.047 2.047 0 0 0-.293.443l-.858 1.736-1.916.28-.151.027A1.976 1.976 0 0 0 9.315 14H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm-1 2H8v4h4V8z"/></svg>'

// 左对齐
export const JUSTIFY_LEFT_SVG = '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>'

// 右对齐
export const JUSTIFY_RIGHT_SVG = '<svg viewBox="0 0 1024 1024"><path d="M972.8 793.6v102.4H256v-102.4h716.8z m0-230.4v102.4H51.2v-102.4h921.6z m0-230.4v102.4H256v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>'

// 居中对齐
export const JUSTIFY_CENTER_SVG = '<svg viewBox="0 0 1024 1024"><path d="M870.4 793.6v102.4H153.6v-102.4h716.8z m102.4-230.4v102.4H51.2v-102.4h921.6z m-102.4-230.4v102.4H153.6v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>'

// 两端对齐
export const JUSTIFY_JUSTIFY_SVG = '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m0 192h1024v128H0z m0 192h1024v128H0z m0 192h1024v128H0z m0 192h1024v128H0z"></path></svg>'

// 清空（颜色）
export const CLEAN_SVG = '<svg viewBox="0 0 1024 1024"><path d="M236.8 128L896 787.2V128H236.8z m614.4 704L192 172.8V832h659.2zM192 64h704c38.4 0 64 25.6 64 64v704c0 38.4-25.6 64-64 64H192c-38.4 0-64-25.6-64-64V128c0-38.4 25.6-64 64-64z"></path></svg>'
