(function(window, $, undefined){
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
        init: function(){
            this.attachEvents();
        }
    };

    typeService.init();

}(window || this, jQuery, undefined));
