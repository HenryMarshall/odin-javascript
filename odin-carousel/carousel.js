$(document).ready(function(){

carousel = {
  position: 0,
  imageCount: 0,

  initialize: function() {
    var $img = $('img');
    this.imageCount = $img.length;

    // hide all but the first image
    $($img).slice(1).hide();
    this.buildSelectors($img);

    // timer
    

    // ui
    this.nextPrevButton();
    this.selectorButton();

    // listens for changes
    this.onChange();
  },

  buildSelectors: function($img) {
    var imageSelectors = '';
    $img = ($img === undefined) ? $('img') : $img;

    for (var i = 0, j = this.imageCount; i < j; i++) {
      var imageId = $($img).eq(i).attr('id');
      imageSelectors += '<a href="#' + imageId 
                      + '" data-position="' + i + '""></a>';
    };
    $(imageSelectors).appendTo($('#image-selectors'));

    this.paintSelector();
  },


  onChange: function() {
    var self = this;
    $('#carousel').on('pictureChange', function() {
      self.paintSelector();
      self.changeVisibleImage();
    });
  },

  paintSelector: function() {
    var newSelected = $('#image-selectors a').eq(this.position);

    $('.selected').removeClass('selected');
    $(newSelected).addClass('selected');
  },

  changeVisibleImage: function() {
    $('img').hide().eq(this.position).show();
  },


  // ui elements
  nextPrevButton: function() {

    var self = this;

    $('button').on('click', function() {

      var advanceBy = Number($(this).attr('data-advance')),
          newPositionWrap = (self.position + advanceBy) % self.imageCount;
          newPosition = (newPositionWrap >= 0) 
            ? newPositionWrap
            : (self.imageCount + newPositionWrap);

      self.position = newPosition;

      console.log("this.position: ",self.position);
      $('#carousel').trigger('pictureChange');

    });
  },

  selectorButton: function() {

    var self = this;

    $('#image-selectors a').on('click', function(e) {

      e.preventDefault();

      var targetPictureId = $(this).attr('href'),
          newPosition = Number($(this).attr('data-position'));

      self.position = newPosition;
      console.log("this.position: ",self.position);
      $('#carousel').trigger('pictureChange');

    });
  }


};

carousel.initialize();

// end $(document).ready
});