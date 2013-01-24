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
        event.preventDefault();
    }

    drophere.ondrop = function (event) {
        
        var file,
            img,
            reader;
        
        if (!event.dataTransfer.files.length) {
            return false;  // ファイル未選択
        }

        file = event.dataTransfer.files[0];
        if (!/^image\/(png|jpeg|gif)$/.test(file.type)) {
            return false;  // typeプロパティでMIMEタイプを参照
        }

        img = document.createElement('img');
        reader = new FileReader();
        reader.onload = function() {
            img.src = reader.result;  // 読み込んだ画像データをsrcにセット
            document.getElementById('preview_field').appendChild(img);
        }
        reader.readAsDataURL(file);  // 画像読み込み

        // 画像名・MIMEタイプ・ファイルサイズ
        document.getElementById('preview_field').innerHTML =
            'file name: ' + file.name + '<br />' +
            'file type: ' + file.type + '<br />' +
            'file size: ' + file.size + '<br />';

        event.preventDefault();
    }       
        
}());
