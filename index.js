$(document).ready(function() {

  const
    $listItem = $('.list-item'),
    $list = $('.list'),
    $line = $('.line'),
    $first = $listItem.first(),
    $body = $('body'),
    $navHeader = $('.nav-header'),
    $bannerText = $('#banner-text'),
    $window = $(window);

  let
    showNav = true;

  // set initial line position
  setTimeout(() => {
    $line.css({
      left: $first.position().left,
      width: $first.width()
    });
  }, 200);

  // move line on click
  $list.on('click', 'li', function() {
    const $this = $(this);
    $line.css({
      left: $this.position().left,
      width: $this.width()
    });
  });

  // toggle navbar
  function toggleNav(top) {
    let operator = showNav ? '-' : '+';
    function toggle() {
      $navHeader.animate({left: `${operator}=1000px`});
      showNav = !showNav;
    }
    if ((showNav && top > 25) || (!showNav && top <= 25)) {
      toggle();
    }
  }

  function parallaxUp(node, rate) {
    node.css({top: rate});
  }


  $window.scroll(function() {
    let top = $body.scrollTop();
    toggleNav(top);
    parallaxUp($bannerText, top * -1.15);
    console.log(top);
  });

});
