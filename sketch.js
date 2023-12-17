let btn_A, btn_B, btn_C, btn_D;
let p_A, p_B, p_C, p_D;

let state = "";
let sendMsg = "";
let counter = 0;

/// *MQTT* ///--------------------------------
let mqtt_initialized = false;
let broker = {
    hostname: 'public.cloud.shiftr.io',
    port: 443
};

// MQTT client:
let client;

let creds = {
    clientID: 'p5Client',
    userName: 'public',
    password: 'public'
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    /// *MQTT* ///--------------------------------
    // Create an MQTT client:
    state = "MQTT connecting...";
    client = new Paho.MQTT.Client(broker.hostname, broker.port, creds.clientID);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect to the MQTT broker:
    client.connect({
        onSuccess: onConnect, // callback function for when you connect
        userName: creds.userName, // username
        password: creds.password, // password
        //useSSL: true // use SSL
        useSSL: true
    });


    let btn_A = createDiv('1');
    btn_A.position(0, height / 5);
    btn_A.addClass("button");
    btn_A.style('background-color: #f2f2f2');
    btn_A.mousePressed(() => {
        btn_A.style('background-color: #000000');
        sendMqttMessage("113XNature_KMFA/Animabotany/Commander", "1");
    })
    btn_A.mouseReleased(() => {
        btn_A.style('background-color: #f2f2f2');
    })

    let btn_B = createDiv('2');
    btn_B.position(0, 2 * height / 5);
    btn_B.addClass("button");
    btn_B.style('background-color: #e0dede');
    btn_B.mousePressed(() => {
        btn_B.style('background-color: #000000');
        sendMqttMessage("113XNature_KMFA/Animabotany/Commander", "2");
    })
    btn_B.mouseReleased(() => {
        btn_B.style('background-color: #e0dede');
    })

    let btn_C = createDiv('3');
    btn_C.position(0, height / 5 * 3);
    btn_C.addClass("button");
    btn_C.style('background-color: #f2f2f2');
    btn_C.mousePressed(() => {
        btn_C.style('background-color: #000000');
        sendMqttMessage("113XNature_KMFA/Animabotany/Commander", "3");
    })
    btn_C.mouseReleased(() => {
        btn_C.style('background-color: #f2f2f2');
    })

    let btn_D = createDiv('4');
    btn_D.position(0, 4 * height / 5);
    btn_D.addClass("button");
    btn_D.style('background-color: #e0dede');
    btn_D.mousePressed(() => {
        btn_D.style('background-color: #000000');
        sendMqttMessage("113XNature_KMFA/Animabotany/Commander", "4");
    })
    btn_D.mouseReleased(() => {
        btn_D.style('background-color: #e0dede');
    })




}



function draw() {
    background(255);
    push();
    fill(0);
    translate(width / 2, height / 10 + 10);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Aeriflutter Commander", 0, 0);
    translate(0, -24);
    fill(50);
    textSize(12);
    text(state, 0, 0);
    translate(0, 48);
    fill(255, 0, 0, counter);
    text("sent message: \"" + sendMsg + "\" successfully", 0, 0);
    pop();


    counter -= 3;






}

function justSendMsg(msg) {
    sendMsg = msg;
    counter = 300;
}

/// *MQTT* ///--------------------------------
// called when a message arrives
function onMessageArrived(message) {
    console.log('I got a message:' + message.payloadString + ", from: " + message.destinationName);
    // createP('got msg: <span style="background-color: #FFFF00">' + message.payloadString + "</span>, at " + hour() + ":" + minute() + ":" + second());
    // p.style("color:red;");

    // changeBgc_gotMsg = true;
    // changeCountDown = 0;
    // let x = 0;
    // let y = 0;

    // let flock_topic = message.destinationName.match(/^\w*\/\w*/)[0];
    // // let topic = "113XNature_KMFA/Animabotany/Airbag".match(/\w*$/)[0];

    // let b = new Boid({
    //     vec: createVector(3, 3),
    //     pos: createVector(0, 0),
    //     R: 800,
    //     clr: subscribe_topicList[flock_topic].clr,
    //     pos: createVector(subscribe_topicList[flock_topic].pos[0], subscribe_topicList[flock_topic].pos[1]),
    //     desiredseparation: subscribe_topicList[flock_topic].desiredseparation,
    //     r: subscribe_topicList[flock_topic].r
    // })
    // flocks[flock_topic].addBoid(b);

}

function MQTT_subscribe(target_Topic) {
    client.subscribe(target_Topic)
    console.log("Topic subscribed: " + target_Topic)
}


// called when the client connects
function onConnect() {
    console.log('client is connected');
    state = "MQTT is connected";

    // let sub_list = Object.keys(subscribe_topicList);
    // console.log(sub_list);
    // sub_list.forEach(t => {
    //     MQTT_subscribe(t + "/#");
    // })

}


// called when the client loses its connection
function onConnectionLost(response) {
    if (response.errorCode !== 0) console.log('onConnectionLost:' + response.errorMessage);
    state = "MQTT connection lost";
}



// called when you want to send a message:
function sendMqttMessage(destination, msg) {
    justSendMsg(msg);
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {
        // start an MQTT message:
        message = new Paho.MQTT.Message(msg);
        // choose the destination topic:
        message.destinationName = destination;
        // send it:
        client.send(message);
        // print what you sent:
        console.log('I sent: ' + message.payloadString);
        // createP('I sent: ' + message.payloadString);
    }
} // choose the destination topic:
//         message.destinationName = input2.value();
//         // send it:
//         client.send(message);
//         // print what you sent:
//         console.log('I sent: ' + message.payloadString);
//         createP('I sent: ' + message.payloadString);
//     }
// }


function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}