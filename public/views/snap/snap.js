var tar = [
    {x: 50, y: 150, range: 50},
    {x: 150, y: 150, range: 50},
    {x: 250, y: 150, range: 50},
    {x: 350, y: 150, range: 50},
    {x: 450, y: 150, range: 50},
];

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    snap: { targets: tar},

    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    // restrict: {
    //   restriction: "parent",
    //   endOnly: true,
    //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    // },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  })
  .dropzone({overlap: 'center'});

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
