$(document).ready(function() {
  // mostra apenas a div com o detalhamento do produto clicado
  $('#abre-detalhe-nMonitor').click(function() {
    $('#nMonitor').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nCommand').click(function() {
    $('#nCommand').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nReport').click(function() { 
    $('#nReport').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nSensor').click(function() {
    $('#nSensor').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nAgenda').click(function() {
    $('#nAgenda').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nEcho').click(function() {
    $('#nEcho').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nVoice').click(function() {
    $('#nVoice').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  $('#abre-detalhe-nDoctor').click(function() {
    $('#nDoctor').fadeIn();
    $('#conteudo-total').hide();
    $('#fechar-detalhamento').fadeIn();
    $(window).scrollTop(0);
  });
  // fecha todos os detalhamentos e scrolla para #produtos
  $('#fechar-detalhamento').click(function() {
    $('.detalhamento').fadeOut();
    $('#conteudo-total').show();
    $(this).fadeOut();
    $('html, body').animate({
        scrollTop: $("#produtos").offset().top
    }, 0);
  });
});
