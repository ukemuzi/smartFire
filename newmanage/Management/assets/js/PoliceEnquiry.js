var request;
var jqlxObj = {};
var jqztObj = {};
var vm;
$(function () {
    request = GetRequest();

    // setTimeout(function () {
    if (typeof request.jqlx == 'undefined') {
        requestCXJG();
    } else if (request.jqlx == 'tcjq') {
        requestTCJQ();
    } else if (request.jqlx == 'jsjq') {
        requestJSJQ();
    }
    // }, 1000)

    vm = initChat({
        domId: "content_pan",
        username: "zhihuiyuan",
        inputId: "textInput",
        password: "123456",
        currentGroupId: null,
        showHistory: false,
        baseAPIUrl: baseApiUrl
    });//domId, username, password, currentGroupId, baseAPIUrl， token

})

function bingSJZD(form) {
    $.ajax({
        url: 'http://192.168.1.120:11800/combat/sjzd/getList?zdmc=案件类型',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                data.data.forEach(element => {
                    $("#jqlx").append('<option value="' + element.DMZ + '">' + element.DMMC + '</option>');
                    form.render("select");
                });
            }
        }
    })
}

function search() {
    requestCXJG();
}

function reset() {
    $("input,select").val('');
}

function JQDetail(self) {
    $(self).addClass('active').siblings().removeClass('active');
    var id = $(self).attr("val");
    requestJQDetail(id);
    initJQWS(id);
    initCombatSummary(id);
}

function requestCXJG() {
    var data = {};
    var jqdz = $("#keyword").val();
    var jqlx = $("#jqlx").val();
    var jqdj = $("#jqdj").val();
    var zgzd = $("#zgzd").val();
    var start = $("#date1").val();
    var end = $("#date2").val();
    if (jqdz != '') {
        data.jqdz = jqdz;
    }
    if (jqlx != '') {
        data.jqlx = jqlx;
    }
    if (jqdj != '') {
        data.jqdj = jqdj;
    }
    if (zgzd != '') {
        data.zgzd = zgzd;
    }
    if (start != '') {
        data.begin = start;
    } else {
        data.begin = '2019-06-01 00:00:00';
    }
    if (end != '') {
        data.end = end;
    }
    $.ajax({
        url: baseApiUrl + '/warning/getSelect',
        type: 'POST',
        async: true,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (data) {
            if (data.code == 0 && data.data.length > 0) {
                loadCXJG(data.data);
                requestJQDetail(data.data[0].JQID);
                initJQWS(data.data[0].JQID);
                initCombatSummary(data.data[0].JQID);
            } else {
                $(".inquiry_bottom span.statistics").html('共0记录');
                $(".inquiry_bottom div.result_list").empty();
                loadJQNone();
            }
        }
    })
}



function loadCXJG(data) {
    $(".inquiry_bottom span.statistics").html('共' + data.length + '记录');
    $(".inquiry_bottom div.result_list").empty();

    $.each(data, function (i, n) {
        var html = '';
        if (i == 0) {
            html += '<div class="item active" onclick="JQDetail(this)" val=' + n.JQID + '>';
        } else {
            html += '<div class="item" onclick="JQDetail(this)" val=' + n.JQID + '>';
        }
        if (n.JQLX == "火灾") {
            html += '<i class="fireicon"></i>';
        } else if (n.JQLX == "社会救助") {
            html += '<i class="handicon"></i>';
        } else if (n.JQLX == "抢险救援") {
            html += '<i class="qxjyicon"></i>';
        } else if (n.JQLX == "其他出动") {
            html += '<i class="qtcdicon"></i>';
        }
        html += '<div class="item_info">';
        html += '<h4>' + n.ZGZD + n.JQLX + '</h4>';
        html += '<p>时间：<em>' + new Date(n.LASJ).toISOString().replace('T', ' ').split('.')[0] + '</em></p>';
        if(n.JQDZ.length>14){
            n.JQDZ=n.JQDZ.substring(0,14)+"......";
        }
        html += '<p>地址：<em>' + n.JQDZ + '</em></p>';
        html += '</div>';
        if (n.JQDJ == "1") {
            html += '<span class="grade rank1">一级</span>';
        } else if (n.JQDJ == "2") {
            html += '<span class="grade rank2">二级</span>';
        } else if (n.JQDJ == "3") {
            html += '<span class="grade rank3">三级</span>';
        } else if (n.JQDJ == "4") {
            html += '<span class="grade rank4">四级</span>';
        } else if (n.JQDJ == "5") {
            html += '<span class="grade rank5">五级</span>';
        }
        if (n.JQZT == "出动") {
            html += '<label class="stateicon"><i class="newstate state_cd"></i><em>' + n.JQZT + '</em></label>';
        } else if (n.JQZT == "到场" || n.JQZT == "出水" || n.JQZT == "停水") {
            html += '<span class="state">' + n.JQZT + '</span>';
        } else if (n.JQZT == "结案" || n.JQZT == "返队") {
            html += '<span class="green">' + n.JQZT + '</span>';
        } else if (n.JQZT == "通知") {
            html += '<span class="orange">' + n.JQZT + '</span>';
        }
        html += '</div>';
        $(".inquiry_bottom div.result_list").append(html);
    });
}

function requestJQDetail(id) {
    $.ajax({
        url: baseApiUrl + '/warning/getWarn/' + id,
        type: 'get',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                loadJQDetail(data.data);

                vm.currentGroupId = data.data.groupid;
                vm.getHistoryMessage();
            }
        }
    })
}

function initJQWS(AJID) {
    $.ajax({
        url: baseApiUrl + '/fireDocument/getWsxxByAjId/' + AJID,
        type: 'get',
        //async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                $("#tab_JQWS .officia ul").html("")
                for (var i = 0; i < data.data.length; i++) {
                    var strHtml = `<li>
                        <h5 class="officia_time">` + data.data[i].wssj.split(' ')[1].split('.')[0] + `</h5>
                        <div class="officia_info">` + data.data[i].wsnr + `</div>
                    </li>`;
                    $("#tab_JQWS .officia ul").append(strHtml);
                }
            }
        }
    })
}
//作战小结
function initCombatSummary(AJID){
    $.ajax({
        url: baseApiUrl + '/warning/getCombatSummary/' + AJID,
        type: 'get',
        //async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                $("#cdsj").html(data.data.cdsj);
                $("#jqdz").html(data.data.jqdz);
                $("#cdzd").html(data.data.cdzd);
                $("#zdyrs").html(data.data.zdyrs);
                $("#ddxcsj").html(data.data.ddxcsj);
                $("#gdsj").html(data.data.gdsj);

                $("#ccrs").html(getNumber(data.data.ccrs)+"辆");
                $("#rsmj").html(getNumber(data.data.rsmj));
                $("#cqs").html(getNumber(data.data.cqs));
                $("#bkry").html(getNumber(data.data.bkry));
                $("#ssrs").html(getNumber(data.data.ssrs));
                $("#qzswrs").html(getNumber(data.data.qzswrs));
                $("#jcrs").html(getNumber(data.data.jcrs));
                $("#ssrs").html(getNumber(data.data.ssrs));

                if(data.data.attrs){
                    $("#rswz").html(data.data.attrs.rswz);
                    $("#czgc").html(data.data.attrs.czgc);
                    $("#remark").html(data.data.attrs.remark);
                }else{
                    $("#rswz").html("暂无");
                    $("#czgc").html("暂无");
                    $("#remark").html("暂无");
                }
               
                // $("#tab_JQWS .officia ul").html("")
                // for(var i=0;i<data.data.length;i++){
                //     var strHtml=`<li>
                //         <h5 class="officia_time">`+data.data[i].wssj.split(' ')[1].split('.')[0]+`</h5>
                //         <div class="officia_info">`+data.data[i].wsnr+`</div>
                //     </li>`;
                //     $("#tab_JQWS .officia ul").append(strHtml);
                // }
            }
        }
    })
}

function loadJQDetail(data) {
    $("#jqlx_title").html(data.jqlx);
    if (data.jqlx == "火灾") {
        $("#jqlx_title").html(data.jqlx + "扑救");
    }

    $(".inquiry_center span:contains('报警时间')").next().html(getValue(data.bjsj));
    $(".inquiry_center span:contains('报警电话')").next().html(getValue(data.bjdh));
    //$(".inquiry_center span:contains('立案时间')").next().html(getValue(data.lasj));
    $(".inquiry_center span:contains('警情地址')").next().html(getValue(data.jqdz));
    $(".inquiry_center span:contains('处置对象')").next().html(getValue(data.jqwz));
    var jqdj = '';
    if (data.jqdj == "1") {
        jqdj = "一级"
    } else if (data.jqdj == "2") {
        jqdj = "二级"
    } else if (data.jqdj == "3") {
        jqdj = "三级"
    }
    $(".inquiry_center span:contains('警情等级')").next().html(getValue(jqdj));
    $(".inquiry_center span:contains('警情状态')").next().html(getValue(data.jqzt));
    var cddw = '';
    if (data.cdzd != null) {
        cddw += data.cdzd.split(',').length + "支队伍";
    }
    if (data.ccrs != null) {
        cddw += data.ccrs + "辆车";
    }
    if (data.zdyrs != null) {
        cddw += data.zdyrs + "人";
    }
    $(".inquiry_center span:contains('出动队伍')").next().html(getValue(cddw));
    $(".inquiry_center span:contains('出动中队')").next().html(getValue(data.cdzd));
    // $(".inquiry_center span:contains('主管大队')").next().html(getValue(data.zgdd));
    $(".inquiry_center span:contains('火灾场所')").next().html(getValue(data.szbw));
    $(".inquiry_center span:contains('建筑结构')").next().html(getValue(data.szbw));
    $(".inquiry_center span:contains('受灾部位')").next().html(getValue(data.szbw));
    $(".inquiry_center span:contains('烟雾状况')").next().html(getValue(data.szbw));


    // $(".inquiry_center span:contains('营救被困人员')").next().html(getValue(data.jcrs));
    // var ryswqk = '';
    // if (data.sshrs != null) {
    //     ryswqk += "受伤人数：" + data.sshrs;
    // }
    // if (data.bdswrs != null) {
    //     ryswqk += "部队受伤人数：" + data.bdswrs;
    // }
    // if (data.qzswrs != null) {
    //     ryswqk += "群众死亡人数：" + data.qzswrs;
    // }
    // if (data.bdssrs != null) {
    //     ryswqk += "部队死亡人数：" + data.bdssrs;
    // }
    // $(".inquiry_center span:contains('人员伤亡情况')").next().html(getValue(ryswqk));
    $(".inquiry_center span:contains('备注')").next().html(getValue(data.bz));
}

function loadJQNone() {
    $("#jqlx_title").html("");
    $(".inquiry_center span:contains('报警时间')").next().html("");
    $(".inquiry_center span:contains('报警电话')").next().html("");
    $(".inquiry_center span:contains('立案时间')").next().html("");
    $(".inquiry_center span:contains('警情地址')").next().html("");
    $(".inquiry_center span:contains('处置对象')").next().html("");
    $(".inquiry_center span:contains('警情等级')").next().html("");
    $(".inquiry_center span:contains('警情状态')").next().html("");
    $(".inquiry_center span:contains('出动队伍')").next().html("");
    $(".inquiry_center span:contains('出动中队')").next().html("");
    $(".inquiry_center span:contains('主管大队')").next().html("");
    $(".inquiry_center span:contains('受灾部位')").next().html("");
    $(".inquiry_center span:contains('营救被困人员')").next().html("");
    $(".inquiry_center span:contains('人员伤亡情况')").next().html("");
    $(".inquiry_center span:contains('备注')").next().html("");
}

function getValue(val) {
    if (val == null || val == '') {
        val = "暂无";
    }
    return val;
}

function requestTCJQ() {
    $.ajax({
        url: baseApiUrl + '/warning/getTcjq',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                loadCXJG(data.data);
                requestJQDetail(data.data[0].JQID);
                initJQWS(data.data[0].JQID);
                initCombatSummary(data.data[0].JQID);
            }
        }
    })
}


function requestJSJQ() {
    $.ajax({
        url: baseApiUrl + '/warning/getJsjq',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                loadCXJG(data.data);
                requestJQDetail(data.data[0].JQID);
                initJQWS(data.data[0].JQID);
                initCombatSummary(data.data[0].JQID);
            }
        }
    })
}

function loadJQWS(data) {
    $('.officia ul').empty();
    $.each(data, function (i, n) {
        var html = '';
        html += '<li>';
        html += '<h5 class="officia_time">08:11:20</h5>';
        html += '<div class="officia_info">立案</div>';
        html += '</li>';
        $('.officia ul').append(html);
    });
}

function loadXCSK(data) {
    $('.scene ul').empty();
    $.each(data, function () {
        var html = '';
        html += '<li style="margin-bottom: 10px;"><img src="../img/firei.png" alt=""></li>';
        $('.scene ul').append(html);
    });
}

function loadQZSB(data) {
    $(".report ul").empty();
    $(".report span:contains('报警人姓名')").html('张建');
    $(".report span:contains('报警电话')").html('18571554525');
    $(".report span:contains('报警位置')").html('武汉五环体育中心');
    $(".report span:contains('人员被困')").html('无');
    $(".report span:contains('物质燃烧')").html('木材');
    $(".report span:contains('烟雾状态')").html('不确定');
    $(".report span:contains('建筑结构')").html('框架结构');
    $(".report span:contains('楼房层数')").html('1层');
    $(".report span:contains('备注')").html('');
}



function loadZZXJ(data) {
    $(".summary ul").empty();
    $(".summary span:contains('出动时间')").html('2019-07-15 08:14:30');
    $(".summary span:contains('警请地址')").html('金山大道与临空港大道交叉口西北角');
    $(".summary span:contains('出动力量')").html('吴家山中队');
    $(".summary span:contains('出动人数')").html('46人');
    $(".summary span:contains('到场时间')").html('2019-07-15 08:30:30');
    $(".summary span:contains('燃烧物质')").html('木材');
    $(".summary span:contains('处置过程')").html('2019年7月15日上午8点30分30秒，吴家山中队到场现场，出一支枪');
    $(".summary span:contains('返队时间')").html('2019-07-15 08:55:30');
    $(".summary span:contains('备注')").html('2019年7月15好上午8点11分33秒，五环体育中心单位微型消防站到达现场');
}

function getValue(val) {
    if (val == null || val == '') {
        val = "暂无";
    }
    return val;
}


function getNumber(val) {
    if (val == null || val == "") {
        val = 0;
    } else {
        val = Number(val);
    }
    return val;
}