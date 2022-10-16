(function(){
    //let reftabela = document.getElementById('clientes');
    $('#clientes').on('click','.js-delete', function() {
        let botaoClicado = $(this);
        $('#btnsim').attr('data-id', botaoClicado.attr('data-id'));
        $('#meumodal').modal('show');
    });
    $('#btncancelar').on('click', function() {
        $('#meumodal').modal('hide');
    });
    $('#btnsim').on('click', function() {
        let botaoSIm = $(this);
        let id = botaoSIm.attr('data-id');
        $.ajax({
            url: '/clientes/delete/' + id,
            method: 'GET',
            success: function() {
                window.location.href='/clientes';
            }
        });
    })
})();