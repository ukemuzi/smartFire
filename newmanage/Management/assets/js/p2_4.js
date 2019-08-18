var vm = new Vue({
    el: "#data",
    data: function (){
        var normal = {
            //油罐信息
            oilTank_area: 0,
            oilTank_type: 0,
            oilTank_d: 0,
            oilTank_a: 0,

            //流散火
            fire_area: 0,
            fire_width: 0,
            fire_height: 0,

            //泡沫供给
            foam_strength: 0,
            foam_set_type: 0,
            foam_liquid_type: 0,

            //泡沫枪
            foamGun: 0,
            //泡沫混合液
            foamMixLiquid: 0,
            //配比
            rate: 0.06,
            //灭火时间
            extinguishingTime: 30
        };

        var fudanbai = {
            //油罐信息
            oilTank_area: 0,
            oilTank_type: 0,
            oilTank_d: 0,
            oilTank_a: 0,

            //流散火
            fire_area: 0,
            fire_width: 0,
            fire_height: 0,

            //泡沫供给
            foam_strength: 0,
            foam_set_type: 0,

            //泡沫枪
            foamGun: 0,

            //泡沫混合液
            foamMixLiquid: 0,
            //配比
            rate: 0.06,
            //灭火时间
            extinguishingTime: 30
        };

        var kangrongxing = {
            //油罐信息
            oilTank_area: 0,
            oilTank_type: 0,
            oilTank_d: 0,
            oilTank_a: 0,

            //流散火
            fire_area: 0,
            fire_width: 0,
            fire_height: 0,

            //泡沫供给
            foam_strength: 0,
            foam_liquid_type: 0,

            //泡沫枪
            foamGun: 0,
            //泡沫混合液
            foamMixLiquid: 0,
            //配比
            rate: 0.06,
            //灭火时间
            extinguishingTime: 30
        };

        var highMultiple = {
            //数量
            num: 0,

            //空间体积
            spaceVolume: 0,

            //用量
            use: 0,

            //泡沫混合液
            foamMixLiquid: 0,
            //配比
            rate: 0.06,
            //灭火时间
            extinguishingTime: 30
        };

        return {
            currentFoamIndex: 0,

            factor: [normal, fudanbai, kangrongxing, highMultiple],

            normal,fudanbai,kangrongxing,highMultiple,

            result: {
                foamPerSecond: 0,
                totalFoam: 0
            }
        }
    },
    watch: {
        currentFoamIndex: function (newVal) {
            this.result.foamPerSecond = 0;
            this.result.totalFoam = 0;
        },

        //普通泡沫
        'normal.oilTank_d': function () {
            this.getOilTankArea();
        },
        'normal.oilTank_a': function () {
            this.getOilTankArea();
        },
        'normal.oilTank_type': function () {
            this.getOilTankArea();
        },
        'normal.fire_width': function () {
            this.getFireArea()
        },
        'normal.fire_height': function () {
            this.getFireArea()
        },
        'normal.foam_set_type': function () {
            this.getFoamStrength()
        },
        'normal.foam_liquid_type': function () {
            this.getFoamStrength()
        },



        //fudanbai
        'fudanbai.oilTank_d': function () {
            this.getOilTankArea();
        },
        'fudanbai.oilTank_a': function () {
            this.getOilTankArea();
        },
        'fudanbai.oilTank_type': function () {
            this.getOilTankArea();
        },
        'fudanbai.fire_width': function () {
            this.getFireArea()
        },
        'fudanbai.fire_height': function () {
            this.getFireArea()
        },
        'fudanbai.foam_set_type': function () {
            this.getFoamStrength()
        },

        //kangrongxing
        'kangrongxing.oilTank_d': function () {
            this.getOilTankArea();
        },
        'kangrongxing.oilTank_a': function () {
            this.getOilTankArea();
        },
        'kangrongxing.oilTank_type': function () {
            this.getOilTankArea();
        },
        'kangrongxing.fire_width': function () {
            this.getFireArea()
        },
        'kangrongxing.fire_height': function () {
            this.getFireArea()
        },
        'kangrongxing.foam_liquid_type': function () {
            this.getFoamStrength()
        },

        'highMultiple.use': function (newVal) {
            this.highMultiple.num = parseFloat((newVal * this.highMultiple.spaceVolume / 5).toFixed(1));
        },
        'highMultiple.spaceVolume': function (newVal) {
            this.highMultiple.num = parseFloat((this.highMultiple.use * newVal / 5).toFixed(1));
        }

    },
    computed: {
    },
    created: function () {

    },
    mounted: function () {

    },
    methods: {
        calculate: function () {
            var object = this.factor[this.currentFoamIndex];

            var rate = object.rate * object.extinguishingTime * 60 / 1000;
            switch (this.currentFoamIndex){
                case 0:
                case 1:
                case 2:
                    var totalArea = object.fire_area + object.oilTank_area;

                    this.result.foamPerSecond = totalArea * object.foam_strength * object.foamMixLiquid / object.foamGun;
                    this.result.totalFoam = this.result.foamPerSecond * rate;
                    break;
                case 3:
                    this.result.foamPerSecond = object.num * object.foamMixLiquid ;
                    this.result.totalFoam = this.result.foamPerSecond * rate;
            }

            //格式化
            this.result.totalFoam = (this.result.totalFoam||0).toFixed(1);
            this.result.foamPerSecond = (this.result.foamPerSecond||0).toFixed(1);

        },
        getOilTankArea: function(){
            var scope = this;
            var object = scope.factor[scope.currentFoamIndex];

            setTimeout(function(){
                var oilTank_d = object.oilTank_d;
                object.oilTank_area = (Math.pow(oilTank_d , 2) * Math.PI / 4).toFixed(2);
                switch (object.oilTank_type) {
                    case 0:
                        break;
                    case 1:
                        var d = oilTank_d - 2 * object.oilTank_a;
                        object.oilTank_area = (object.oilTank_area - (Math.pow(d , 2) * Math.PI / 4)).toFixed(2);
                        break;
                    case 2:
                        break;
                    case 3:
                        break;

                }


            },0);

        },
        getFireArea: function(){
            var scope = this;
            var object = scope.factor[scope.currentFoamIndex];
            setTimeout(function(){

                object.fire_area = parseFloat((object.fire_width * object.fire_height).toFixed(2));

            },0);
        },
        getFoamStrength: function(){
            var scope = this;
            var index = scope.currentFoamIndex;
            var object = scope.factor[index];
            setTimeout(function(){

                if(index == 0){
                    if(object.foam_set_type == 1 || object.foam_set_type == 2){

                        object.foam_strength = (6 / 60).toFixed(2);
                    }else if(object.foam_set_type == 3){

                        object.foam_strength = (8 / 60).toFixed(2);

                    }else{
                        object.foam_strength = 0;
                    }

                    if(object.foam_liquid_type == 1 || object.foam_liquid_type == 2){
                        object.extinguishingTime = 40;
                    }else if(object.foam_liquid_type == 3){
                        object.extinguishingTime = 30;
                    }else{
                        object.extinguishingTime = 40;
                    }

                }else if(index == 1){
                    if(object.foam_set_type == 1 ){
                        object.foam_strength = 0.4;
                    }else if(object.foam_set_type == 2){
                        object.foam_strength = 0.14;
                    }else{
                        object.foam_strength = 0;
                    }
                }else if(index == 2){
                    if(object.foam_liquid_type == 1 ){
                        object.foam_strength = 1.5;
                    }else if(object.foam_liquid_type == 2){
                        object.foam_strength = 1.8;
                    }else if(object.foam_liquid_type == 3){
                        object.foam_strength = 3.5;
                    }else{
                        object.foam_strength = 0;
                    }
                }

            },0);

        },
        reset: function () {
            for(var i in this.factor[this.currentFoamIndex]){
                this.factor[this.currentFoamIndex][i] = 0;
            }
            this.factor[this.currentFoamIndex].rate = 0.06;
            this.factor[this.currentFoamIndex].extinguishingTime = 30;

            //更新layui的值
            var selects = document.getElementsByClassName("vue-select"+this.currentFoamIndex);
            for(var i in selects){
                selects[i].value = 0;
            }
            layui.form.render("select");
        }
    }
})