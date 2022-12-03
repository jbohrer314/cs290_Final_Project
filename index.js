// Starting and stopping metronome

function start_stop_click() { // alternates between different metronome states
    var button = start_stop_button

    if (button.value == "paused") {
        start_metronome()
    } 
    else if (button.value == "playing") {
        stop_metronome()
    }
}

function start_metronome() { // starts metronome
    var button = start_stop_button

    button.value = "playing"
    button.style.backgroundColor = "#ff0066"
    button.textContent = "Stop"
    note_scheduler()

    console.log("Starting metronome")
}

function stop_metronome() { // stops metronome
    var button = start_stop_button

    button.value = "paused"
    button.style.backgroundColor = "#99ebff"
    button.textContent = "Start"

    clearInterval(met_object)

    console.log("Stopping metronome")
}

var start_stop_button = document.getElementsByClassName("start-stop-button")[0]

start_stop_button.addEventListener("click", start_stop_click)




// Metronome timing and tempo controls
var tempo = document.getElementById("tempo")
function get_ms_interval() { // converts bpm to ms per beat
    return 60000/tempo.value
}

// function metronome_cycle(interval) { // recursively calls setTimeout to dynamically assign tempo
//     if (start_stop_button.value == "playing") {
//         // play_beat(interval)
//         play_click_high()
//         setTimeout(function() {metronome_cycle(get_ms_interval())}, interval)
//     }
// }

// var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext()
var next_note_time = audioContext.currentTime;
var met_object
var interval

function note_scheduler() { // places future clicks in the audio context
    interval = get_ms_interval()
    
    while (next_note_time < audioContext.currentTime + 0.1) {
        next_note_time += interval/1000;
        play_beat(next_note_time, interval);
    }

    met_object = setTimeout(note_scheduler, 0.5);
}

function modify_tempo(tempo_modification) { // modifies tempo based on imput
    var tempo = document.getElementById("tempo")
    tempo.value = parseInt(tempo.value) + tempo_modification
}

document.getElementById("minus-ten").addEventListener("click", function() {
    modify_tempo(-10)
})

document.getElementById("minus-one").addEventListener("click", function() {
    modify_tempo(-1)
})

document.getElementById("plus-one").addEventListener("click", function() {
    modify_tempo(1)
})

document.getElementById("plus-ten").addEventListener("click", function() {
    modify_tempo(10)
})


function play_click_high(time) { // plays high metronome sound
    var osc = audioContext.createOscillator()
    osc.connect(audioContext.destination)
    osc.frequency.value = 2000
    osc.start(time)
    osc.stop(time + 0.05)
    
}

function play_click_mid(time) { // plays low metronome sound
    var osc = audioContext.createOscillator()
    osc.connect(audioContext.destination)
    osc.frequency.value = 1500
    osc.start(time)
    osc.stop(time + 0.05)
}

function play_click_low(time) { // plays low metronome sound
    var osc = audioContext.createOscillator()
    osc.connect(audioContext.destination)
    osc.frequency.value = 1000
    osc.start(time)
    osc.stop(time + 0.05)
}




// Subdivision section
function play_quarters() { // checks if quarter note subdivision is required
    return document.getElementById("quarter").checked
}

function play_eighths() { // checks if eighth note subdivision is required
    return document.getElementById("eighth").checked
}

function play_sixteenths() { // checks if sixteenth note subdivision is required
    return document.getElementById("sixteenth").checked
}

function play_triplets() { // checks if triplet subdivision is required
    return document.getElementById("triplet").checked
}

function play_beat(time, interval) { // plays a single beat of the metronome with all included subdivisions
    var sixteenth_interval = interval/4
    var triplet_interval = interval/3

    if (play_quarters()) { // playing downbeats
        play_click_high(time)
    }

    if (play_eighths()) { // playing eighth note subdivisions
        play_click_low(time + 2*sixteenth_interval/1000)
    }

    if (play_sixteenths()) { // playing eighth note subdivisions
        play_click_low(time + sixteenth_interval/1000)
        play_click_low(time + 3*sixteenth_interval/1000)
    }

    if (play_triplets()) { // playing eighth note subdivisions
        play_click_low(time + triplet_interval/1000)
        play_click_low(time + 2*triplet_interval/1000)
    }

}




