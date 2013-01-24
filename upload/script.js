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
            return false;  // �t�@�C�����I��
        }

        file = event.dataTransfer.files[0];
        if (!/^image\/(png|jpeg|gif)$/.test(file.type)) {
            return false;  // type�v���p�e�B��MIME�^�C�v���Q��
        }

        img = document.createElement('img');
        reader = new FileReader();
        reader.onload = function() {
            img.src = reader.result;  // �ǂݍ��񂾉摜�f�[�^��src�ɃZ�b�g
            document.getElementById('preview_field').appendChild(img);
        }
        reader.readAsDataURL(file);  // �摜�ǂݍ���

        // �摜���EMIME�^�C�v�E�t�@�C���T�C�Y
        document.getElementById('preview_field').innerHTML =
            'file name: ' + file.name + '<br />' +
            'file type: ' + file.type + '<br />' +
            'file size: ' + file.size + '<br />';

        event.preventDefault();
    }       
        
}());
