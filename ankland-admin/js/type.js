(function(window, $, undefined){
    var global = {
        host: 'http://106.187.99.225:5000/types'
    };
    var typeService = {
        attachEvents: function attachEvents(){
            $('#typeTable').DataTable({
                responsive: true
            });

            $('button.create').on("click", function() {
                var $createModel = $('#createModel');
                $createModel.modal({
                    backdrop: 'static'
                });
            });

            $('tr')
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
        getTypes: function getTypes() {
            $.ajax({
                url: global.host,
                type: 'get',
                ataType : "json",
                success: function(types) {
                    if(types != null) {
                        var length = types.length;
                        var innerHtml = '';

                        for(var i=0; i<length; i++) {
                        }

                    }

                    $('tbody').html("tttt");
                }
            });
        },
        init: function(){
            this.attachEvents();
            this.getTypes();
        }
    };

    typeService.init();

}(window || this, jQuery, undefined));
