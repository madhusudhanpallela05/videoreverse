function uploadVideo() {
    let fileInput = document.getElementById("videoUpload");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please select a video file first!");
        return;
    }

    let formData = new FormData();
    formData.append("video", file);

    let originalVideo = document.getElementById("originalVideo");
    originalVideo.src = URL.createObjectURL(file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        let reversedVideo = document.getElementById("reversedVideo");
        reversedVideo.src = URL.createObjectURL(blob);
    })
    .catch(error => console.error("Error:", error));
}
