// Setting up buttons for program
var play_button = document.getElementsByClassName("play-button")[0]
play_button.addEventListener("click", start_advanced_metronome)

var audioContext = new AudioContext()
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

function play_beat_advanced(time, beat) { // plays a single beat of the metronome with all included subdivisions
    var sixteenth_interval = beat.interval/4
    var triplet_interval = beat.interval/3

    if (beat.quarter) { // playing downbeats
        play_click_high(time)
    }

    if (beat.eight) { // playing eighth note subdivisions
        play_click_low(time + 2*sixteenth_interval/1000)
    }

    if (beat.sixteen) { // playing eighth note subdivisions
        play_click_low(time + sixteenth_interval/1000)
        play_click_low(time + 3*sixteenth_interval/1000)
    }

    if (beat.triplet) { // playing eighth note subdivisions
        play_click_mid(time + triplet_interval/1000)
        play_click_mid(time + 2*triplet_interval/1000)
    }

    return (time + beat.interval/1000)
}

function advanced_metronome_cycle(beat_array, start_time, idx=0) {
    var new_start_time = play_beat_advanced(start_time, beat_array[idx])
    if (play_advanced_metronome && beat_array[idx+1]) {
        setTimeout(function() {
            advanced_metronome_cycle(beat_array, new_start_time, idx+1)
        }, (new_start_time - start_time)*1000 - 10)
    }
}

function generate_beat_array(block_data) { // generates an array of data for each beat based on total block data
    var beat_array = []
    for (block of block_data) {
        for (var idx = 0; idx < block.counts; idx++) {
            beat_array.push({
                interval:(60000/block.tempo),
                quarter:block.quarter,
                eight:block.eight,
                sixteen:block.sixteen,
                triplet:block.triplet
            })
        }
    }
    return beat_array
}

function check_for_bad_values() {
    var block_data = generate_all_block_data()
    for (block of block_data) {
        if (block.tempo > 400 || block.tempo < 1) {
            alert("Please make sure that all tempos are from 1 to 400 bpm")
            return false
        }
        if (block.counts < 1) {
            alert("Please make sure that all blocks have a positive number of counts")
            return false
        }
    }
    return true
}

var play_advanced_metronome = false
function start_advanced_metronome() { // starts metronome
    var block_data = generate_all_block_data()
    var beat_array = generate_beat_array(block_data)
    play_advanced_metronome = true
    var start_time = audioContext.currentTime + 0.1
    if (check_for_bad_values()) {
        advanced_metronome_cycle(beat_array, start_time)
    }
}




var stop_button = document.getElementsByClassName("stop-button")[0]
stop_button.addEventListener("click", stop_advanced_metronome)

function stop_advanced_metronome() {
    play_advanced_metronome = false
}

document.addEventListener('keyup', function (event) { // addes listener to space bar
    if (event.code === 'Space') {
        if (play_advanced_metronome) {
            stop_advanced_metronome()
        }
        else {
            start_advanced_metronome()
        }
    }
})


var save_button = document.getElementsByClassName("save-button")[0]
save_button.addEventListener("click", save_program)

function save_program() {
    var request_url = "/automation/" + get_program_number_from_url() + "/saveProgram"
    fetch(request_url, {
        method: "POST",
        body: JSON.stringify({
            name:get_program_name(),
            program:generate_all_block_data()
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        alert("Program saved")
    }).catch(function (err) {
        alert("No response from the server")
    })
}

function generate_data_for_block(block) { // reads a block from html into a js object
    var data = {}
    data.tempo = parseInt(block.querySelector("#tempo").value)
    data.counts = parseInt(block.querySelector("#counts").value)
    data.quarter = block.getElementsByClassName("quarter")[0].checked
    data.eight = block.getElementsByClassName("eight")[0].checked
    data.sixteen = block.getElementsByClassName("sixteen")[0].checked
    data.triplet = block.getElementsByClassName("triplet")[0].checked
    
    return data
}

function generate_all_block_data() { // generates entire program array
    var blocks = [...document.getElementsByClassName("program-block-icon")]
    var program = blocks.map(block => generate_data_for_block(block))
    return program
}

function get_program_name() { // gets name of program
    var name = document.getElementsByClassName("program-title-for-planner")[0].value
    return name
}




// delete button
var delete_button = document.getElementsByClassName("delete-button")[0]
delete_button.addEventListener("click", delete_program)

function delete_program() { 
    var request_url = "/automation/deleteProgram/" + get_program_number_from_url()
    fetch(request_url, {
        method: "POST",
        body:"",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        window.location.replace('/automation')
    }).catch(function (err) {
        alert("No response from the server")
    })
}

function get_program_number_from_url() {
    var url = window.location.pathname
    var parts = url.split('/')
    return parts.at(-1)
}




var add_block_button = document.getElementById("add-program-block")
add_block_button.addEventListener("click", add_new_block)
var block_idx = document.getElementsByClassName("program-block-icon").length

function add_new_block() { // adds new program to automation section
    var new_block = Handlebars.templates.programBlock
    block_idx++
    var new_block_HTML = new_block({
        tempo:120,
        counts:16,
        quarter:true,
        eight:false,
        sixteen:false,
        triplet:false,
        index:block_idx
    })
    document.getElementById("add-program-block").insertAdjacentHTML('beforebegin', new_block_HTML)
    link_new_delete_block_button()
}




function link_delete_block_buttons() { // deletes block by checking x button
    var buttons = [...document.getElementsByClassName("delete-block-button")]
    var blocks = [...document.getElementsByClassName("program-block-icon")]
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var idx = parseInt(button.id)
            blocks[idx].remove()
        })
    })
}

function link_new_delete_block_button() { // links new block delete button
    var block = [...document.getElementsByClassName("program-block-icon")].at(-1)
    var button = block.getElementsByClassName("delete-block-button")[0]
    button.addEventListener("click", function() {
        block.remove()
    })
}



link_delete_block_buttons()