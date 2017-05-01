$(document).ready(function() {

  const
    $listItem = $('.list-item'),
    $list = $('.list'),
    $line = $('.line'),
    $body = $('body'),
    $navHeader = $('.nav-header'),
    $bannerText = $('#banner-text'),
    $window = $(window);

  let
    $selectedNav = $listItem.first(),
    showNav = true;

  // set initial line position
  setTimeout(() => {
    $line.css({
      left: $selectedNav.position().left,
      width: $selectedNav.width()
    });
  }, 200);

  // move line on click
  $list.on('click', 'li', function() {
    const $this = $(this);
    moveLine($this.position().left, $this.width());
    $selectedNav = $this;
  });

  // move line on hover
  $listItem.hover(function(){
    const $this = $(this);
    setTimeout(function() {
      moveLine($this.position().left, $this.width());
    }, 500);
  }, function() {
    setTimeout(function() {
      moveLine($selectedNav.position().left, $selectedNav.width());
    }, 500);
  });

  // move line under nav options
  function moveLine(left, width) {
    $line.css({
      left,
      width
    });
  }

  // toggle navbar
  function toggleNav(top) {
    let
      operator = showNav ? '-' : '+';
    function toggle(width) {
      $navHeader.animate({left: `${operator}=${width}px`});
      showNav = !showNav;
    }
    if ((showNav && top > 25) || (!showNav && top <= 25)) {
      let viewWidth = $body.width();
      toggle(viewWidth);
    }
  }

  // move element up
  function parallaxUp(node, rate) {
    node.css({top: rate});
  }


  $window.scroll(function() {
    let top = $body.scrollTop();
    toggleNav(top);
    parallaxUp($bannerText, top * -1.15);
  });

});
