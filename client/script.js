function selectFile() {
    document.getElementById('my_image').click();
}

window.onload=function() {
    const dragArea = document.getElementsByClassName("drag-area");

    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    dragArea[0].addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const data = new FormData();
        data.append('image', file);

        (async () => {
            const res = await fetch('http://localhost:4200/upload', {
                method: 'POST',
                body: data
            });
            const content = await res.json();
            if(content.success === 0) {
                alert(content.error.toUpperCase());
            } else if(content.success === 1) {

            } else {
                alert('errore non gestito ' + content);
            };
        })();
    })
}
