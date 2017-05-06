$(document).ready(function() {

  const
    $list = $('.list'),
    $listItem = $list.children(),
    $line = $('.line'),
    $body = $('body'),
    $navHeader = $('.nav-header'),
    $bannerText = $('.banner-text').first(),
    $bannerTextLine2 = $bannerText.next(),
    $logo = $('.logo'),
    $slideContent = $('.slide-content'),
    $about = $($slideContent[0]),
    $projects = $($slideContent[1]),
    $resume = $($slideContent[2]),
    $contact = $($slideContent[3]),
    $slideRight = $('.slide-right'),
    $slideRightAbout = $($slideRight[0]),
    $slideRightProjects = $($slideRight[1]),
    $slideRightResume = $($slideRight[2]),
    $slideRightContact = $($slideRight[3]),
    $window = $(window);

  let
    $selectedNav = $listItem.first(),
    viewWidth = $body.width(),
    mobile = viewWidth < 900,
    showNav = true,
    windowY = 120,
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
      elementId = '#' + $this.data('name');
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
    if (mobile) return;
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
      '-webkit-clip-path': `inset(${offsetTop}px 0 ${offsetBottom}px`,
      display: 'flex'
    });
  }

  // slide-right animations
  function switchSlideRight(top, windowHeight) {
    let ratio = top / windowHeight;

    if (ratio >= 0.75 && ratio <= 1.75) {
      $slideRightAbout.removeClass('slide-right-hide');
    }
    if (ratio < 0.75 || ratio > 1.75) {
      $slideRightAbout.addClass('slide-right-hide');
    }
    if (ratio >= 1.75 && ratio <= 2.75) {
      $slideRightProjects.removeClass('slide-right-hide');
    }
    if (ratio < 1.75 || ratio > 2.75) {
      $slideRightProjects.addClass('slide-right-hide');
    }
    if (ratio >= 2.75 && ratio <= 3.75) {
      $slideRightResume.removeClass('slide-right-hide');
    }
    if (ratio < 2.75 || ratio > 3.75) {
      $slideRightResume.addClass('slide-right-hide');
    }
    if (ratio >= 3.75 && ratio <= 4.75) {
      $slideRightContact.removeClass('slide-right-hide');
    }
    if (ratio < 3.75 || ratio > 4.75) {
      $slideRightContact.addClass('slide-right-hide');
    }
  }

  function switchSlideRightMobile(top, windowHeight) {
    let ratio = top / windowHeight;
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
    if
      ((windowY > 110) &&
      (showNav && top > 25) ||
      (!showNav && top <= 25)) {
      toggleNav(viewWidth);
    }
    // slide content in and out
    if (mobile) {
      switchSlideRightMobile(top, windowHeight);
    } else {
      switchSlideRight(top, windowHeight);
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
