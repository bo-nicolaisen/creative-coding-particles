let ctracker;

function openCam() {
    let All_mediaDevices = navigator.mediaDevices
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
        console.log("getUserMedia() not supported.");
        return;
    }
    All_mediaDevices.getUserMedia({
        audio: false,
        video: true
    })
        .then(function (vidStream) {
            var video = document.getElementById('videoCam');
            if ("srcObject" in video) {
                video.srcObject = vidStream;
            } else {
                video.src = window.URL.createObjectURL(vidStream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
                startTracking(video);
            };
        })
        .catch(function (e) {
            console.log(e.name + ": " + e.message);
        });
}

function startTracking(video) {


    ctracker = new clm.tracker();
    console.log(ctracker);
    ctracker.init();
    ctracker.start(video);

    positionLoop();

}

function positionLoop() {
    requestAnimationFrame(positionLoop);
    let positions = ctracker.getCurrentPosition();
    console.log(positions);
    // positions = [[x_0, y_0], [x_1,y_1], ... ]
    // do something with the positions ...
}

