// adiciona a imagem no hover sobre a vertical na home
$( document ).ready(function() {
  $('#vertical-health').hover(
    function() {
      $('.imagem-bg').addClass('health-bg-img');
    }, function() {
      $('.imagem-bg').removeClass('health-bg-img');
    }
  );
  $('#vertical-law').hover(
    function() {
      $('.imagem-bg').addClass('law-bg-img');
    }, function() {
      $('.imagem-bg').removeClass('law-bg-img');
    }
  );
  $('#vertical-energy').hover(
    function() {
      $('.imagem-bg').addClass('energy-bg-img');
    }, function() {
      $('.imagem-bg').removeClass('energy-bg-img');
    }
  );
  $('#vertical-security').hover(
    function() {
      $('.imagem-bg').addClass('security-bg-img');
    }, function() {
      $('.imagem-bg').removeClass('security-bg-img');
    }
  );
  $('#vertical-tech').hover(
    function() {
      $('.imagem-bg').addClass('tech-bg-img');
    }, function() {
      $('.imagem-bg').removeClass('tech-bg-img');
    }
  );
});
