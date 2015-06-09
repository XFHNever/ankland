(function(window, $, undefined){
    var global = {
        host: 'http://106.187.99.225:5000/',
        states: {
            0: '下线',
            1: '上线'
        }

    };
    var anklandService = {
        attachEvents: function attachEvents(){
            $('button.create').on("click", function() {
                anklandService.initTypes();
            });

            $('body')
                .on("click", 'a.table-info', function() {
                    var $infoModel = $('#infoModel');
                    $infoModel.modal({
                        backdrop: 'static'
                    });
                })
                .on("click", 'a.table-edit', function() {
                    var $updateModel = $('#updateModel');
                    $updateModel.modal({
                        backdrop: 'static'
                    });
                })
                .on("click", 'a.table-delete', function() {
                    var $deleteModel = $('#deleteModel');
                    $deleteModel.modal({
                        backdrop: 'static'
                    });
                });
        },
        initTypes: function initTypes() {
            $.ajax({
                url: global.host + 'types/',
                type: 'get',
                ataType : "json",
                success: function(types) {
                    if(types != null) {
                        var length = types.length;
                        var innerHtml = '';

                        for(var i=0; i<length; i++) {
                            innerHtml += '<option>' + types[i].name + '</option>';
                        }

                        var $createModel = $('#createModel');
                        $createModel.find('select[name=type]').html(innerHtml);
                        $createModel.modal({
                            backdrop: 'static'
                        });

                    }
                }
            });
        },
        getProducts: function getProducts() {
            $.ajax({
                url: global.host + 'products/',
                type: 'get',
                ataType : "json",
                success: function(products) {
                    if(products != null) {
                        var length = products.length;
                        var innerHtml = '';
                        var style = 'odd';

                        for(var i=0; i<length; i++) {
                            if(i%2 == 1)
                                style = 'even';
                            else
                                style = 'odd';

                            innerHtml += '<tr class="' + style +'gradeX">' +
                            '<td>' + products[i].name + '</td>' +
                            '<td>' + products[i].type + '</td>' +
                            '<td><img class="center table-img" src="' + products[i].type + '"/></td>' +
                            '<td>' + products[i].order + '</td>' +
                            '<td>' + global.states[products[i].state] + '</td>' +
                            '<td type_id="' + products[i]._id + '"><a class="fa fa-info-circle table-info"></a><a class="fa fa-edit table-edit"></a><a class="fa fa-times table-delete"></a></td>';
                        }

                        $('tbody').html(innerHtml);
                    }
                }
            });
        },
        init: function(){
            this.attachEvents();
            anklandService.getProducts();
        }
    };

    anklandService.init();

}(window || this, jQuery, undefined));
