window.Lakeus = window.Lakeus || {};

const date = new Date();
/*
$(function(){
    $(".infobox-title").text("乌鸫");
    $(".scientific-name").text("Turdus merula");
    $("#species-image").attr("src", "static/Turdus merula.jpg");
    $("#species-image").addClass("circle");
    $("#taxonomic-phylum-data").text("脊索动物门");
    $("#taxonomic-class-data").text("鸟纲");
    $("#taxonomic-order-data").text("雀形目");
    $("#taxonomic-family-data").text("鸫科");
    $("#taxonomic-genus-data").text("鸫属");
    $(".content").html(`<p>冤枉啊！我真的不是乌鸦。乌鸫是真的惨，作为一种黑乎乎的不算小的鸟，它看起来很像小号的乌鸦，且乌鸫也好集群，因此经常会被人们误认为乌鸦。</p>
    <p>体长21cm～30cm的中等鸣禽。雄鸟通体黑色，具蓝辉金属光泽，乌鸫黄色的鸟喙非常显眼。雌鸟头及上体棕褐色；飞羽及尾羽黑色，具蓝色金属光泽。颏、喉白色杂以褐色细纹，下体余部棕褐色。幼鸟似雌鸟，但下体棕白色，杂以暗褐色斑纹。成鸟眼圈黄色，虹膜褐色；成鸟嘴黄色，幼鸟黑褐色；跗蹠及趾黑褐色。</p>
    <p>栖息于低山、丘陵以及平原地区的各种生境，在校园内常常可以见到，它们单独、成对或小群活动。乌鸫属杂食性，主要以昆虫、蠕虫以及植物的果实和种子为食。繁殖期4月～6月，繁殖季节鸣叫洪亮、婉转而悦耳，非繁殖期叫声单调。</p>
    <p>乌鸫是个深藏不漏的口技表演家，鸣叫声音非常好听，而且会学习别的鸟和动物的声音。</p>`);
    $("#gallery-image-1").attr("src", 'static/gallery-1.png');
    $("#gallery-image-").attr("src", 'static/gallery-1.png');
})
*/

Lakeus.initGenerator = function() {
    console.log("[Lakeus] 正在加载生成器……");
    Lakeus.i18n = {
        'species-daily-basic': '基本',
        'species-daily-generator': '每日物种生成器',
        'species-daily-generator-type': '类型',
        'species-daily-generator-type-bird': '鸟类篇',
        'species-daily-generator-type-insect': '昆虫篇',
        'species-daily-generator-type-plant': '植物篇',
        'species-daily-generator-date': '日期',
        'species-daily-generator-author': '作者',
        'species-daily-content-area': "内容区",
        "species-daily-generator-species": "物种名称（中文）",
        "species-daily-generator-species-image": "物种头图",
        "species-daily-generator-scientific-name": "学名（拉丁文）",
        "species-daily-generator-taxonomic-phylum": "门",
        "species-daily-generator-taxonomic-class": "纲",
        "species-daily-generator-taxonomic-order": "目",
        "species-daily-generator-taxonomic-family": "科",
        "species-daily-generator-taxonomic-genus": "属",
        "species-daily-generator-content": "正文（支持Markdown语法，分段要换两行）",
        "species-daily-generator-gallery-image-1": "图库图片1",
        "species-daily-generator-gallery-image-2": "图库图片2",
        "species-daily-generator-gallery-image-3": "图库图片3",
        'species-daily-generator-export': '导出',
        'species-daily-generator-apply': '应用',
        'species-daily-generator-save-as-image': '保存为图片',
    }
    Lakeus.t = function(k) {
        if (k in Lakeus.i18n) {
            return Lakeus.i18n[k]
        } else {
            return k
        }
    }
    Lakeus.configList = {
        "type": {
            fieldset: "species-daily-basic",
            input: "enum",
            enumValues: ["bird", "insect", "plant"],
            default: "bird",
            value: "bird",
            apply: function(name, v) {
                $("#species-daily-generator-"+name).remove();
                var styleElement = '<style class="species-daily-generator-style" id="species-daily-generator' + name + '">\n'
                switch(v) {
                    case 'insect':
                        styleElement += `
:root {
    --theme-color: var(--theme-color-insect);
    --theme-color-derived: var(--theme-color-derived-insect);
    --theme-text-color: var(--theme-text-color-insect);
    --type-image: var(--type-image-insect);
    --header-background: var(--header-background-insect);
}
`;
                        $(".speciesdaily-subtitle").text(Lakeus.t("species-daily-generator-type-insect"));
                        break;
                    case 'plant':
                        styleElement += `
:root {
    --theme-color: var(--theme-color-plant);
    --theme-color-derived: var(--theme-color-derived-plant);
    --theme-text-color: var(--theme-text-color-plant);
    --type-image: var(--type-image-plant);
    --header-background: var(--header-background-plant);
}
`;
                        $(".speciesdaily-subtitle").text(Lakeus.t("species-daily-generator-type-plant"));
                        break;
                    case 'bird':
                        console.log();
                    default: 
                        styleElement += `
:root {
    --theme-color: var(--theme-color-bird);
    --theme-color-derived: var(--theme-color-derived-bird);
    --theme-text-color: var(--theme-text-color-bird);
    --type-image: var(--type-image-bird);
    --header-background: var(--header-background-bird);
}
`;
                        $(".speciesdaily-subtitle").text(Lakeus.t("species-daily-generator-type-bird"));
                }
                styleElement += '</style>';
                $("head").append(styleElement);
            }
        },
        "date": {
            fieldset: "species-daily-basic",
            input: "text",
            default: "" + date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(),
            value: "" + date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(),
            apply: function(name, v) {
                $(".date").text(v);
            },
        },
        "author": {
            fieldset: "species-daily-basic",
            input: "text",
            default: '编辑：',
            value: '编辑：',
            apply: function(name, v){
                $(".author").text(v);
            }
        },
        "species": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: '物种名称',
            value: '物种名称',
            apply: function(name, v){
                $(".infobox-title").text(v);
            }
        },
        "scientific-name": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "Scientific name",
            value: "Scientific name",
            apply: function(name, v){
                $(".scientific-name").text(v);
            }
        },
        "taxonomic-phylum": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "",
            value: "",
            apply: function(name, v){
                $("#taxonomic-phylum-data").text(v);
            }
        },
        "taxonomic-class": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "",
            value: "",
            apply: function(name, v){
                $("#taxonomic-class-data").text(v);
            }
        },
        "taxonomic-order": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "",
            value: "",
            apply: function(name, v){
                $("#taxonomic-order-data").text(v);
            }
        },
        "taxonomic-family": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "",
            value: "",
            apply: function(name, v){
                $("#taxonomic-family-data").text(v);
            }
        },
        "taxonomic-genus": {
            fieldset: "species-daily-content-area",
            input: "text",
            default: "",
            value: "",
            apply: function(name, v){
                $("#taxonomic-genus-data").text(v);
            }
        },
        "species-image": {
            fieldset: "species-daily-content-area",
            input: "image",
            default: null,
            value: null,
            apply: function(name, v){
                $("#species-image").attr('src', v);
            }
        },
        "content": {
            fieldset: "species-daily-content-area",
            input: "textarea",
            default: '请在此处输入正文\n\n换两行是分段',
            value: '请在此处输入正文\n\n换两行是分段',
            apply: function(name, v){
                $(".content").html(DOMPurify.sanitize(marked.parse(v),{KEEP_CONTENT:true}));
            }
        },
        "gallery-image-1": {
            fieldset: "species-daily-content-area",
            input: "image",
            default: null,
            value: null,
            apply: function(name, v){
                $("#gallery-image-1").attr('src', v);
            }
        },
        "gallery-image-2": {
            fieldset: "species-daily-content-area",
            input: "image",
            default: null,
            value: null,
            apply: function(name, v){
                $("#gallery-image-2").attr('src', v);
            }
        },
        "gallery-image-3": {
            fieldset: "species-daily-content-area",
            input: "image",
            default: null,
            value: null,
            apply: function(name, v){
                $("#gallery-image-3").attr('src', v);
            }
        },
    }
    function constructGeneratorBody() {
        var fieldsetList = [];
        var result = '';
        $.each(Lakeus.configList, function(k, v){
            if (!(fieldsetList.includes(v.fieldset))) {
                fieldsetList.push(v.fieldset);
            }
        })
        for (fieldset of fieldsetList) {
            var fieldsetElement = '<fieldset class="species-daily-generator-fieldset" id="species-daily-generator-fieldset-' + fieldset + '">';
            var legendElement = '<legend class="species-daily-generator-title">' + Lakeus.t(fieldset) + '</legend>';
            var settingsElement = '';
            $.each(Lakeus.configList, function (k, v) {
                if (v.fieldset === fieldset) {
                    settingsElement += constructGeneratorItem(k, v);
                }
            });
            fieldsetElement += legendElement + settingsElement + '</fieldset>';
            result += fieldsetElement;
        }
        return result;
    }

    function constructGeneratorItem(configName, configContent) {
        var configElement = '<p class="species-daily-generator-config-section" id="species-daily-generator-config-section-' + configName + '">';
        switch(configContent.input) {
            case 'enum':
                var radioGroup = '';
                $.each(configContent.enumValues, function (k, v){
                    radioGroup += '<label class="species-daily-generator-input-radio-group"><input class="species-daily-generator-input-radio" type="radio" name="' + configName + '" id="species-daily-generator-input-'+ configName + '-' + v + '" value="'+ v + '"' + (configContent.default==v?'checked':'') + '>' + Lakeus.t("species-daily-generator-"+configName+"-"+v)+'</label>';
                });
                configElement += 
                    '<label>' +
                        Lakeus.t('species-daily-generator-'+configName) +
                        radioGroup +
                    '</label>';
                break;
            case 'text':
                configElement +=
                '<label>' +
                    Lakeus.t('species-daily-generator-'+configName) +
                    '<input type="text" class="species-daily-generator-input-text" name="' + configName + '" id="species-daily-generator-input-' + configName + '" value="' + configContent.default + '" />' +
                '<label>';
                break;
            case 'textarea':
                configElement +=
                '<label>' +
                    Lakeus.t('species-daily-generator-'+configName) +
                    '<textarea class="species-daily-generator-input-textarea" name="' + configName + '" id="species-daily-generator-input-' + configName + '" value="' + configContent.default + '"></textarea>' +
                '<label>';
                break;
            case 'image':
                configElement +=
                '<label>' +
                    Lakeus.t('species-daily-generator-'+configName) +
                    '<input accept="image/*" type="file" class="species-daily-generator-input-file" name="' + configName + '" id="species-daily-generator-input-' + configName + '" value="' + configContent.default + '" />' +
                '</label>'
                break;

        }
        configElement += '</p>';
        return configElement;
    }

    function constructThemeDesigner() {
        $("body").append(
            '<div id="species-daily-generator">'+
                '<div id="species-daily-generator-portlet" aria-labelledby="species-daily-generator-modal-button">' +
                    '<input type="checkbox" id="species-daily-generator-modal-checkbox-hack" aria-labelledby="species-daily-generator-modal-button">' +
                    '<button id="species-daily-generator-modal-button">🖌️</button>' +
                    '<form id="species-daily-generator-portlet-body">' +
                        '<div id="species-daily-generator-portlet-body-container">' +
                            '<h1 id="species-daily-generator-title">' + Lakeus.t("species-daily-generator") + '</h1>' +
                            constructGeneratorBody() +
                            '<div id="species-daily-generator-action-buttons">' +
                                '<button type="button" id="species-daily-generator-export-button" class="species-daily-generator-action-button">' + Lakeus.t("species-daily-generator-export") +
                                '</button>' +
                                /*
                                '<button type="button" id="species-daily-generator-apply-button" class="species-daily-generator-action-button">' + Lakeus.t("species-daily-generator-apply") +
                                '</button>' +
                                */
                                '<button type="button" id="species-daily-generator-save-as-image-button" class="species-daily-generator-action-button">' + Lakeus.t("species-daily-generator-save-as-image") +
                                '</button>' +
                            '</div>' +
                        '</div>'+
                    '</form>' +
                '</div>' +
            '</div>'
        )
        $("#species-daily-generator-save-as-image-button").on("click", function(e){
            e.preventDefault;
            modernScreenshot.domToPng(document.querySelector("#app")).then(function(dataUrl){
                var link = document.createElement('a')
                link.download = '每日物种'+ date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() +'.png'
                link.href = dataUrl
                link.click()
            })
        })
        $("#species-daily-generator-export-button").on("click", function (e) {
            e.preventDefault;
            content=''
            $.each(Lakeus.configList, function (k, v) {
                content+='--'+k+'--\n'+v.value+'\n'+'--'+k+'--\n'
            })
            var link = document.createElement('a')
            link.download = '每日物种'+ date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() +'.txt'
            var blob = new Blob([content])
            link.href = URL.createObjectURL(blob);
            link.click()
        })
        $("#species-daily-generator-portlet-body").on("submit",function (e) { e.preventDefault; });
        $.each(Lakeus.configList, function (k, v) {
            switch(v.input){
                case 'enum':
                    $.each(v.enumValues, function (k1, v1){
                        $("#species-daily-generator-input-"+k+'-'+v1).on('input', function (e){
                            Lakeus.configList[k].value = e.target.value;
                            v.apply(k, e.target.value);
                        })
                    })
                    v.apply(k, v.value)
                    break;
                case 'image':
                    $("#species-daily-generator-input-"+k).on('input', function (e){
                        var file = e.target.files[0];
                        const reader = new FileReader();
                        reader.addEventListener('load', function(e){
                            Lakeus.configList[k].value = e.target.result;
                            v.apply(k, e.target.result);
                        })
                        reader.readAsDataURL(file);
                    })
                    break;
                default:
                    $("#species-daily-generator-input-"+k).on('input', function (e){
                        Lakeus.configList[k].value = e.target.value;
                        v.apply(k, e.target.value);
                    })
                    v.apply(k, v.value);
            }
            
        });
    }
    constructThemeDesigner();
    console.log("[Lakeus] 生成器加载完毕。");
}

$(function(){
    Lakeus.initGenerator();
})