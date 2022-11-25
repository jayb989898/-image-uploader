function selectFile() {
    document.getElementById('my_image').click();
}


window.onload=function() {
    document.getElementById('startPage').classList.add('hide');
    document.getElementById('loadingPage').classList.add('hide');
    document.getElementById('endPage').classList.add('hide');
    showStart();
    //drag Area
    const dragArea = document.getElementsByClassName('drag-area');
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    dragArea[0].addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log(file);
        const data = new FormData();
        data.append('image', file);
        fetchImage(data);
    })
    //input
    const input = document.getElementById('my_image');
    input.onchange = function (event) {
        const file = input.files[0];
        const data = new FormData();
        data.append('image', file);
        fetchImage(data);
    }
}

function fetchImage(data) {
    showLoading();
    (async () => {
        const res = await fetch('http://localhost:4200/upload', {
            method: 'POST',
            body: data
        });
        const content = await res.json();
        if(content.success === 0) {
            handleError(content.error.toString());
        } else if(content.success === 1) {
            showResult(content.image_url)
        } else {
            handleError('errore non gestito: ' + content.toString());
        }
    })();
}

function showStart(){
    document.getElementById('startPage').style.display = '';
    document.getElementById('loadingPage').style.display = 'none';
    document.getElementById('endPage').style.display = 'none';
}
function showLoading() {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('loadingPage').style.display = '';
    document.getElementById('endPage').style.display = 'none';
}
function showResult(urlImage) {
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('loadingPage').style.display = 'none';
    document.getElementById('endPage').style.display = '';
    document.getElementById('imageUrl').value = urlImage.toString();
    document.getElementById('imagePreview').src = urlImage;
}
function handleError(error) {
    alert(error.toUpperCase());
    showStart();
}

function copyUrl() {
    const urlImage = document.getElementById('imageUrl');
    navigator.clipboard.writeText(urlImage.value);
}



