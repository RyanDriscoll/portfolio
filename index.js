$(document).ready(function() {

  const
    $listItem = $('.list-item'),
    $list = $('.list'),
    $line = $('.line'),
    $body = $('body'),
    $navHeader = $('.nav-header'),
    $bannerText = $('#banner-text'),
    $logo = $('.logo'),
    $slide = $('.slide'),
    $about = $($slide.children()[0]),
    $projects = $($slide.children()[1]),
    $resume = $($slide.children()[2]),
    $contact = $($slide.children()[3]),
    $window = $(window);

  let
    $selectedNav = $listItem.first(),
    viewWidth = $body.width(),
    showNav = true,
    enter,
    leave;

  // toggle navbar on logo hover
  $logo.hover(function() {
    if (!showNav) {
      toggleNav(viewWidth);
    }
  }, function() {
    if (!showNav) {
      toggleNav(viewWidth);
    }
  });

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
    let $this = $(this);
    clearTimeout(leave);
    enter = setTimeout(function() {
      moveLine($this.position().left, $this.width());
    }, 100);
  }, function() {
    clearTimeout(enter);
    leave = setTimeout(function() {
      moveLine($selectedNav.position().left, $selectedNav.width());
    }, 300);
  });

  // move line under nav options
  function moveLine(left, width) {
    $line.css({
      left,
      width
    });
  }

  // toggle navbar
  function toggleNav(width) {
    let operator = showNav ? '-' : '+';
    $navHeader.animate({left: `${operator}=${width}px`});
    showNav = !showNav;
  }

  // scroll element up at rate
  function parallaxUp(element, rate) {
    element.css({top: rate});
  }

  // clip slide text
  function showSlideText(element, offsetTop, offsetBottom) {
    element.css({
      'clip-path': `inset(${offsetTop}px 0 ${offsetBottom}px`,
      display: 'flex'
    });
  }

  // window scroll events
  $window.scroll(function() {
    let
      top = $body.scrollTop(),
      windowHeight = window.innerHeight;

    // parallax banner text
    parallaxUp($bannerText, top * -1.35);

    // toggle navbar on scroll
    if ((showNav && top > 25) || (!showNav && top <= 25)) {
      toggleNav(viewWidth);
    }

    // clip slide sections
    showSlideText(
      $about,
      windowHeight - top,
      (windowHeight * -1) + top
    );
    showSlideText(
      $projects,
      (windowHeight * 2) - top,
      (windowHeight * -2) + top
    );
    showSlideText(
      $resume,
      (windowHeight * 3) - top,
      (windowHeight * -3) + top
    );
    showSlideText(
      $contact,
      (windowHeight * 4) - top,
      (windowHeight * -4) + top
    );
  });

});
