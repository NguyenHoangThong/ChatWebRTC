var configuration = {
    "iceServers": [{ "url": "stun:stun2.1.google.com:19302" }]
};

function callServer(){
    var candidate;
    rtcConnection = new RTCPeerConnection(null, {optional: [{
        RtpDataChannels: true
    }]});
    dataChannel = rtcConnection.createDataChannel("12");
    rtcConnection.createOffer(function (offer) {
        socket.emit('offer',{offer: offer});
        rtcConnection.setLocalDescription(offer);
    },function (error) {
        alert("Error when creating an offer");
    });
        //listenner();
}
//var peerOffer = null;
function receiveOffer(){
        var candidate;
        if(peerOffer != undefined){
            rtcConnection = new RTCPeerConnection(null, {optional: [{
                RtpDataChannels: true
            }]});
            dataChannel = rtcConnection.createDataChannel("12");

            // rtcConnection.onicecandidate = function (event) {
            //     candidate = event.candidate;
            //     console.log(event);
            //     console.log("candidate  ",candidate);
            //     socket.emit('candidate',{data: candidate});
            // };
            rtcConnection.setRemoteDescription(new RTCSessionDescription(peerOffer), function(){
                rtcConnection.createAnswer(function (answer) {
                    console.log(answer);
                    rtcConnection.setLocalDescription(answer);
                    socket.emit('answer', {data: answer, candidate: candidate});
                },function (error) {
                    alert("Error when creating an answer");
                });
            });
        }
        listenner();
}

function connectPeer(){
    console.log("fucjfejwifjw");
    // socket.on('candidatePeer', function (data) {
    //     console.log("data candidate",data);
    //     handleCandidate(data.data);
    // });

    rtcConnection.setRemoteDescription(new RTCSessionDescription(peerRemote));
    dataChannel.onopen = function (event) {
        console.log(event);
    }
    listenner();

}

function listenner() {
    rtcConnection.ondatachannel = function (event) {
        console.log(event);
        var dataChannel = event.channel;
        dataChannel.onmessage = function (event) {
            console.log("ondatachannel message:", event.data);
        };
        dataChannel.onerror = function (event) {
            console.log(event);
        }
    }
}


function handleCandidate(candidate) {
    rtcConnection.addIceCandidate(new RTCIceCandidate(candidate));
};