$(document).ready(function() {

  const
    $listItem = $('.list-item'),
    $line = $('.line'),
    $initialLinePos = $listItem.first().position().left;

  $listItem.each(function() {
    let $this = $(this);
    console.log($initialLinePos, $this.position().left);
    $this.click(() => $line.css({
      left: $this.position().left,
      width: $this.width()
    }));
  });


  window.onscroll = function() {
    console.log(document.getElementsByTagName('body')[0].scrollTop);
  };
});
