(function(window, $, undefined){
    var typeService = {
        attachEvents: function attachEvents(){
            $('#typeTable').DataTable({
                responsive: true
            });
        },
        init: function(){
            this.attachEvents();
        }
    };

    typeService.init();

}(window || this, jQuery, undefined));
