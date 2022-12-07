// Sequencing section
function add_new_program() { // adds new program to automation section
    fetch("/automation/newProgram", {
        method: "POST",
        body:"",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (res) {
        if (res.status == 200) {
            var new_program = Handlebars.templates.programIcon
            var n_programs = document.getElementsByClassName("program-icon").length
            var new_program_icon_HTML = new_program({
                name: "new program " + (n_programs + 1),
                index: n_programs
            })
            add_program_button.insertAdjacentHTML('beforebegin', new_program_icon_HTML)
        } 
        else {
            alert("An error occurred communicating with the server")
        }
    }).catch(function (err) {
        alert("No response from the server")
    })
}

var add_program_button = document.getElementById("add-program")
add_program_button.addEventListener("click", add_new_program)