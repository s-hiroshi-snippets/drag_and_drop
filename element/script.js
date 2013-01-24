(function () {
    var elements = document.getElementsByTagName('li'),
        drag = function (e) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
            e.dataTransfer.setData('text/html', e.target.outerHTML);
            e.dataTransfer.setData('text/uri-list', document.location.href);
        },
        i;
    for (i = 0; i < elements.length; i++) {
        elements[i].ondragstart = drag;
    }

    var drophere = document.getElementById('drophere');
    drophere.ondragover = function (event) {
        var i;
        for (i = 0; i < event.dataTransfer.types.length; i++) {
            if (event.dataTransfer.types[i] === 'text/plain') {
                event.preventDefault();
                break;
            }
        }
    };

    drophere.ondrop = function (event) {
        console.log('a');
        event.preventDefault();
        var yourName = event.dataTransfer.getData('text/plain');
        alert('Hello, ' + yourName + '!');
    };
}());
