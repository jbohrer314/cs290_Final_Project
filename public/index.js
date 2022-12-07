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

    if (!parseInt(tempo.value)) {
        alert("Please enter a number between 0 and 400")
        return
    }
    else if (parseInt(tempo.value) < 1) {
        alert("Please enter a number between 0 and 400")
        return
    }
    else if (parseInt(tempo.value) > 400) {
        alert("Please enter a number between 0 and 400")
        return
    }

    button.value = "playing"
    button.style.backgroundColor = "#ff0066"
    button.textContent = "Stop"
    disable_tempo_entry()

    note_scheduler()

    console.log("Starting metronome")
}

function stop_metronome() { // stops metronome
    var button = start_stop_button

    button.value = "paused"
    button.style.backgroundColor = "#99ebff"
    button.textContent = "Start"
    enable_tempo_entry()

    clearInterval(met_object)

    console.log("Stopping metronome")
}

var start_stop_button = document.getElementsByClassName("start-stop-button")[0]

start_stop_button.addEventListener("click", start_stop_click)

document.addEventListener('keyup', function (event) { // addes listener to space bar
    if (event.code === 'Space') {
        start_stop_click()
    }
})




// Metronome timing and tempo controls
var tempo = document.getElementById("tempo")
function get_ms_interval() { // converts bpm to ms per beat
    return 60000/tempo.value
}

// var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext()
var next_note_time = audioContext.currentTime
var met_object
var interval

function note_scheduler() { // places future clicks in the audio context
    interval = get_ms_interval()
    
    while (next_note_time < audioContext.currentTime + 0.1) {
        next_note_time += interval/1000
        play_beat(next_note_time, interval)
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
    osc.type = "square"
    osc.connect(audioContext.destination)
    osc.frequency.value = 2000
    osc.start(time)
    osc.stop(time + 0.05)
}

function play_click_mid(time) { // plays low metronome sound
    var osc = audioContext.createOscillator()
    osc.type = "square"
    osc.connect(audioContext.destination)
    osc.frequency.value = 1500
    osc.start(time)
    osc.stop(time + 0.05)
}

function play_click_low(time) { // plays low metronome sound
    var osc = audioContext.createOscillator()
    osc.type = "square"
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
        schedule_display_flash(time, audioContext.currentTime)
    }

    if (play_eighths()) { // playing eighth note subdivisions
        play_click_low(time + 2*sixteenth_interval/1000)
    }

    if (play_sixteenths()) { // playing eighth note subdivisions
        play_click_low(time + sixteenth_interval/1000)
        play_click_low(time + 3*sixteenth_interval/1000)
    }

    if (play_triplets()) { // playing eighth note subdivisions
        play_click_mid(time + triplet_interval/1000)
        play_click_mid(time + 2*triplet_interval/1000)
    }

}

async function flash_display() { // function flashes display when called
    document.getElementsByClassName("metronome-indicator-container")[0].style.animation="flash 100ms linear"
    setTimeout(function() {document.getElementsByClassName("metronome-indicator-container")[0].style.animation=""}, 100)
}

async function schedule_display_flash(time, current_time) {
    setTimeout(flash_display, time-current_time)
}

function disable_tempo_entry() { // prevents user from entering into tempo box
    var tempo = document.getElementById("tempo")
    tempo.disabled = true
    tempo.style.backgroundColor = "#ebebeb"
}

function enable_tempo_entry() { // enables user to enter into the tempo box
    var tempo = document.getElementById("tempo")
    tempo.disabled = false
    tempo.style.backgroundColor = "#ffffff"
}
