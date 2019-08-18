$(function () {
    $(".head ul li").click(function () {
        $(".head ul li").removeClass('active');
        $(this).addClass('active');
    });


    /**
     * 地图
     */
    // var map = new AMap.Map('container');
    // $('.amap-logo').remove();
    // $('.amap-copyright').remove();


    /**
     * 表格
     */
    var table = layui.table;
    var tableIns = table.render({
        elem: '#test',
        height: 250,
        url: './test.json',
        cols: [
            [{
                    field: 'username',
                    title: '装备类型',
                    align: 'left'
                },
                {
                    field: 'sex',
                    title: '可用数量',
                    align: 'left'
                },
            ]
        ]
    });


    /**
     * 右边柱状图
     */
    var columnR = echarts.init(document.getElementById('column_right'));
    var optionR = {
        // title: {
        //     text: ''
        // },
        tooltip: {},
        xAxis: {
            data: ["举高消防车", "专勤消防车", "战勤保障消防车", "灭火消防车", "泡沫灭火剂", "干粉灭火剂"],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ffffff'
                }
            },
            grid: {
                left: '0%',
                right: '4%',
                bottom: '0%',
                containLabel: true
            },
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,
                formatter: function (params) {
                    var newParamsName = ""; // 最终拼接成的字符串
                    var paramsNameNumber = params.length; // 实际标签的个数
                    var provideNumber = 3; // 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = ""; // 表示每一次截取的字符串
                            var start = p * provideNumber; // 开始截取的位置
                            var end = start + provideNumber; // 结束截取的位置
                            // 此处特殊处理最后一行的索引值
                            if (p == rowNumber - 1) {
                                // 最后一次不换行
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                // 每一次拼接字符串并换行
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr; // 最终拼成的字符串
                        }

                    } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                    }
                    //将最终的字符串返回
                    return newParamsName
                }

            }
        },
        yAxis: {
            show: false
        },
        series: [{
            barWidth: 30, //柱图宽度
            // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
            // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            name: '销量',
            type: 'bar',
            data: [72, 82, 76, 198, 241.8, 15],
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colorList = [
                            ['#50e2fd', '#337bd0'],
                            ['#50e2fd', '#337bd0'],
                            ['#50e2fd', '#337bd0'],
                            ['#50e2fd', '#337bd0'],
                            ['#54dd60', '#66e372'],
                            ['#54dd60', '#66e372'],
                        ];
                        var index = params.dataIndex;
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                    offset: 0,
                                    color: colorList[index][0]
                                },
                                {
                                    offset: 1,
                                    color: colorList[index][1]
                                }
                            ]);
                    },
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#ffffff',
                            fontSize: 16
                        }
                    }
                }
            },
        }]
    };
    columnR.setOption(optionR);


    /**
     * 下边柱状图
     */
    var columnB = echarts.init(document.getElementById('column_bottom'));
    var optionB = {
        // title: {
        //     text: ''
        // },
        tooltip: {},
        xAxis: {
            data: ["武昌区", "蔡甸区", "江夏区", "江汉区", "新洲区", "洪山区", "东西湖区", "黄陂区", "汉南区", "市辖区", "汉阳区", "江岸区", "青山区", "硚口区"],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ffffff',
                }
            },
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,
            }
        },
        yAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ffffff'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: { //分割线配置
                show: true,
                lineStyle: {
                    color: "#1c3f5f",
                    width: 2,
                    type: "solid"
                }
            }
        },
        grid: {
            x: 100,
            y: 80,
            width: 1700,
            height: 150
        },
        series: [{
            barWidth: 30, //柱图宽度
            // barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
            // barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
            name: '销量',
            type: 'bar',
            data: [928, 101, 90, 86, 84, 80, 77, 39, 10, 6, 4, 0, 0, 0],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                                offset: 1,
                                color: '#50e2fd'
                            },
                            {
                                offset: 0,
                                color: '#337bd0'
                            }
                        ]
                    ),
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#ffffff',
                            fontSize: 16
                        }
                    }
                }
            },
        }]
    };
    columnB.setOption(optionB);

    $(".btn_list li").click(function () {
        $(".btn_list li").removeClass('active');
        $(this).addClass('active');
    })

    /**
     * 饼状图
     */
    var all_p='2433'//总人数
    var columnP = echarts.init(document.getElementById('pie'));
    var optionP = {
        title: {
            text: all_p,
            textStyle:{
                color:'#fff',
                fontWeight:'600',
        　　　　 fontSize:24
            },
            subtext: '人员总数',
            subtextStyle:{
                color:'#fff',
                fontWeight:'600',
        　　　　 fontSize:14
            },
            x: 'center',
            y: '42%',
          
       },
        color: ['#51e4fe', '#1a73fa', '#5bff6a'],
        series: [{
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            hoveranination: false,
            label: {
                normal: {
                    show: true,
                    position: 'left',
                    color: '#fff',
                    formatter: '{b}{c}%',
                    fontSize: 16,
                    fontWeight: 600
                },
                emphasis: {
                    show: false,
                }
            },
            silent: true,
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                borderWidth: 5, //设置border的宽度有多大
                borderColor: '#0d1f2d',
            },
            data: [{
                    value: 72.46,
                    name: '专职人员'
                },
                {
                    value: 0.21,
                    name: '消防员'
                },
                {
                    value: 27.33,
                    name: '指挥员'
                },
            ]
        },
        {
           
            color:['#005fbe'],
            type: 'pie',
            radius: ['35%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            hoveranination: false,
            data: [{
                value: all_p,
                name: '人员总数'
            }],
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: false,
                }
            },
        }
    ]
    }
    columnP.setOption(optionP);
})