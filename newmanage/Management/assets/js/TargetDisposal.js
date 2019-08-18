
var request;
$(function () {
    request = GetRequest();
    if(request.jqid=='undefined'){
        // requestTCJQ();
        requestUnitInfo('42001209013303');
    }else{
        // requestUnitInfo(request.jqid);
        requestUnitInfo('42001209013303');
    }
})

function requestTCJQ() {
    $.ajax({
        url: baseApiUrl + '/warning/getTcjq',
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                requestUnitInfo(data.data[0].JQID);
            }
        }
    })
}



function requestUnitInfo(id) {
    $.ajax({
        url: baseApiUrl + '/unit/queryById/' + id,
        type: 'GET',
        async: true,
        dataType: 'json',
        success: function (data) {
            if (data.code == 0) {
                loadUnitinfo(data.data);
            }
        }
    })
}


function loadUnitinfo(data) {
    if (window.location.href.indexOf("p2.html") > -1) {
        var around = '';
        if (data.adjoinE != '' || data.adjoinE != null) {
            around += "东：" + data.adjoinE + "， ";
        }
        if (data.adjoinS != '' || data.adjoinS != null) {
            around += "南：" + data.adjoinS + "， ";
        }
        if (data.adjoinW != '' || data.adjoinW != null) {
            around += "西：" + data.adjoinW + "， ";
        }
        if (data.adjoinN != '' || data.adjoinN != null) {
            around += "北：" + data.adjoinN;
        }
        $(".periphery").html(getValue(around));
    } else if (window.location.href.indexOf("p2_1.html") > -1) {
        $("#UnitAddress").html(getValue(data.unitAddress));
        $("#UnitContact").html(getValue(data.legalPerson));
        $("#UnitContactPhone").html(getValue(data.legalPersonTel));
        $("#UnitType").html(getValue(data.unitType));
        $("#FireSafetyResponsiblePerson").html(getValue(data.FirePerson));
        $("#FireSafetyResponsiblePersonPhone").html(getValue(data.firePersonTel));
        $("#BuildingHeight").html("暂无");
        $("#FloorNumberBuildings").html("暂无");
        $("#BuildingStructure").html("暂无");
        $("#MainUsageNature").html("暂无");
        $("#JurisdictionFireFightingUnits").html(getValue(data.fireControlJurisdiction));
    } else if (window.location.href.indexOf("p2_3.html") > -1) {

    } else if (window.location.href.indexOf("p2_2.html") > -1) {

    }

}

function getValue(val) {
    if (val == null || val == '') {
        val = "暂无";
    }
    return val;
}