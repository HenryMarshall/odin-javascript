$(document).ready(function(){

var carousel = {
  position: 0,
  imageCount: 0,

  initialize: function() {
    var $img = $('img');
    this.imageCount = $img.length;

    // hide all but the first image
    $($img).slice(1).hide();

    this.buildSelectors($img);

    this.nextPrevButton();
  },

  buildSelectors: function($img) {
    var imageSelectors = '';
    $img = ($img === undefined) ? $('img') : $img;

    for (var i = 0, j = this.imageCount; i < j; i++) {
      var imageId = $($img).eq(i).attr('id');
      imageSelectors += '<a href="#' + imageId + '"></a>';
    };
    $(imageSelectors).appendTo($('#image-selectors'));

    this.paintSelector();
  },

  paintSelector: function() {
    var newSelected = $('#image-selectors a').eq(this.position);

    $('.selected').removeClass('selected');
    $(newSelected).addClass('selected');
  },

  nextPrevButton: function() {

    var self = this;

    $('button').on('click', function() {
      var advanceBy = Number($(this).attr('data-advance')),
          newPositionWrap = (self.position + advanceBy) % self.imageCount;
          newPosition = (newPositionWrap >= 0) 
            ? newPositionWrap
            : (self.imageCount + newPositionWrap);

      self.position = newPosition;
      self.paintSelector();
    });
  }


};

carousel.initialize();

// end $(document).ready
});