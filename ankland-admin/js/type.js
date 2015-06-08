(function(window, $, undefined){
    var global = {
        host: 'http://106.187.99.225:5000/types/'
    };
    var typeService = {
        attachEvents: function attachEvents(){
            //$('#typeTable').DataTable({
            //    responsive: true
            //});

            $('button.create').on("click", function() {
                var $createModel = $('#createModel');
                $createModel.modal({
                    backdrop: 'static'
                });
            });

            $('tbody')
                .on("click", 'a.table-info', function() {
                    typeService.getSpecificType($(this).parent().attr("type_id"), $('#infoModel'));
                })
                .on("click", 'a.table-edit', function() {
                    typeService.getSpecificType($(this).parent().attr("type_id"), $('#updateModel'));
                })
                .on("click", 'a.table-delete', function() {
                    var $deleteModel = $('#deleteModel');
                    $deleteModel.find('input[name=id]').val($(this).parent().attr("type_id"));
                    $deleteModel.modal({
                        backdrop: 'static'
                    });
                });

            $('#createModel')
                .on('click', '.btn-right', function() {
                    var $createModel = $(this).parents('#createModel');
                    var name = $createModel.find('input[name=name]').val();
                    var desc = $createModel.find('textarea[name=desc]').val();
                    var order = $createModel.find('input[name=order]').val();

                    if (name === '' || desc === '' || order === '') {
                        var $alert = $createModel.find('.alert-danger');
                        $alert.removeClass('hidden');
                        setTimeout(function() {
                            $alert.addClass('hidden');
                        }, 500);
                    } else {
                        typeService.createType(name, desc, order);
                    }

                });

            $('#updateModel').on('click', '.btn-right', function() {
                var $updateModel = $(this).parents('#updateModel');
                var name = $updateModel.find('input[name=name]').val();
                var desc = $updateModel.find('textarea[name=desc]').val();
                var order = $updateModel.find('input[name=order]').val();

                if (name === '' || desc === '' || order === '') {
                    var $alert = $updateModel.find('.alert-danger');
                    $alert.removeClass('hidden');
                    setTimeout(function() {
                        $alert.addClass('hidden');
                    }, 500);
                } else {
                    typeService.updateType($updateModel.find('input[name=id]').val(), name, desc, order);
                }
            });

            $('#deleteModel').on('click', '.btn-right', function() {
                typeService.deleteType($(this).parents('#deleteModel').find('input[name=id]').val());
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
                        var style = 'odd';

                        for(var i=0; i<length; i++) {
                            if(i%2 == 1)
                                style = 'even';
                            else
                                style = 'odd';

                            innerHtml += '<tr class="' + style +'gradeX">' +
                            '<td>' + types[i].name + '</td>' +
                            '<td>' + types[i].desc + '</td>' +
                            '<td>' + types[i].order + '</td>' +
                            '<td type_id="' + types[i]._id + '"><a class="fa fa-info-circle table-info"></a><a class="fa fa-edit table-edit"></a><a class="fa fa-times table-delete"></a></td>';
                        }

                        $('tbody').html(innerHtml);
                    }
                }
            });
        },
        createType: function createType(name, desc, order) {
            $.ajax({
                url: global.host,
                type: 'post',
                dataType : "json",
                data: {name: name, desc: desc, order: order},
                success: function(bug) {
                    if(bug != null) {
                        setTimeout(function() {
                            $('#createModel').modal('hide');
                        }, 500);

                        typeService.getTypes();
                    }
                }
            });
        },
        getSpecificType: function getSpecificType(id, $view) {
            $.ajax({
                url: global.host + id,
                type: 'get',
                dataType : "json",
                success: function(type) {
                    if(type != null) {
                        $view.find('input[name=id]').val(id);
                        $view.find('input[name=name]').val(type.name);
                        $view.find('textarea[name=desc]').html(type.desc);
                        $view.find('input[name=order]').val(type.order);

                        $view.modal({
                            backdrop: 'static'
                        });
                    }
                }
            });
        },
        updateType: function updateType(id, name, desc, order) {
            $.ajax({
                url: global.host + id,
                type: 'put',
                dataType : "json",
                data: {name: name, desc: desc, order: order},
                success: function(type) {
                    if(type != null) {
                        setTimeout(function() {
                            $('#updateModel').modal('hide');
                        }, 500);

                        typeService.getTypes();
                    }
                }
            });
        },
        deleteType: function deleteType(id) {
            $.ajax({
                url: global.host + id,
                type: 'delete',
                dataType : "json",
                success: function(result) {
                    if(result.message != null) {
                        setTimeout(function() {
                            $('#deleteModel').modal('hide');
                        }, 500);

                        typeService.getTypes();
                    }
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
