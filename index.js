$(document).ready(function() {

  const
    $listItem = $('.list-item'),
    $list = $('.list'),
    $line = $('.line'),
    $body = $('body'),
    $navHeader = $('.nav-header'),
    $bannerText = $('#banner-text'),
    $bannerTextLine2 = $bannerText.next(),
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
    windowY,
    enter,
    leave;

  // toggle navbar on logo hover
  $logo.parent().hover(function() {
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

  // check mouse position
  $body.on('mousemove', function(event) {
    windowY = event.pageY - $body.scrollTop();
  });

  // move line and scroll on nav click
  $list.on('click', 'li', function() {
    const
      $this = $(this),
      elementId = '#' + $this.text().toLowerCase();
    moveLine($this.position().left, $this.width());
    $selectedNav = $this;
    scrollToPosition($(elementId));
  });

  // scroll to home on logo click
  $logo.click(function() {
    scrollToPosition($body);
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

  // scroll to section top
  function scrollToPosition(element) {
    $body.animate({
      scrollTop: element.offset().top
    });
  }

  // toggle navbar
  function toggleNav(width) {
    let operator = showNav ? '-' : '+';
    $navHeader.animate({left: `${operator}=${width}px`});
    showNav = !showNav;
  }

  // scroll element up at rate
  function parallaxUp(element, top, rate) {
    let
      pace = top * rate,
      opac = 1 - (top * (1 / 350));
    element.css({
      top: pace,
      opacity: opac
    });
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
    parallaxUp($bannerText, top, -1.35);
    parallaxUp($bannerTextLine2, top, -1.02);

    // toggle navbar on scroll
    if ((windowY > 110) && (showNav && top > 25) || (!showNav && top <= 25)) {
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
