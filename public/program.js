// Setting up buttons for program
var play_button = document.getElementsByClassName("play-button")[0]
play_button.addEventListener("click", function() {
    console.log("Playing program")
})




var stop_button = document.getElementsByClassName("stop-button")[0]
stop_button.addEventListener("click", function() {
    console.log("Stopping program")
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