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
    $about = $slide.children(':nth-child(1)'),
    $projects = $slide.children(':nth-child(2)'),
    $resume = $slide.children(':nth-child(3)'),
    $contact = $slide.children(':nth-child(4)'),
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
    }, 300);
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

  function showSlideText(element, offsetTop, offsetBottom) {
    let
      top = offsetTop,
      bottom = offsetBottom;
    element.css({
      'clip-path': `inset(${top}px 0 ${bottom}px`
    });
  }

  // window scroll events
  $window.scroll(function() {
    let
      top = $body.scrollTop(),
      windowHeight = window.innerHeight;
    parallaxUp($bannerText, top * -1.35);

    if ((showNav && top > 25) || (!showNav && top <= 25)) {
      toggleNav(viewWidth);
    }

    // $slideContent.first().css({
    //   'clip-path': `inset(${(600 - top) - 390}px 0 0)`
    // });
    console.log(600 - top, (600 + windowHeight)
    + top);
    showSlideText(
      $about,
      windowHeight - top,
      (windowHeight * -1) + top
    );
    // showSlideText(
    //   $projects,
    //   (600 + windowHeight) - top,
    //   (600 + (windowHeight * 2)) - top
    // );
    // showSlideText(
    //   $resume,
    //   (600 + (windowHeight * 2)) - top,
    //   (600 + (windowHeight * 3)) - top
    // );
    // showSlideText(
    //   $contact,
    //   (600 + (windowHeight * 3)) - top,
    //   (600 + (windowHeight * 4)) - top
    // );
  });

});
