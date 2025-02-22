
document.addEventListener("DOMContentLoaded", function () {
    // Get current date and time
    let now = new Date();
    let hours = now.getHours();

    // Adjust date logic: If before 6 AM, use yesterday's date
    if (hours < 6) {
        now.setDate(now.getDate() - 1);
    }

    // Format the date as YYYY-MM-DD (required for date input)
    let formattedDate = now.toISOString().split('T')[0];

    // Select the date input field
    let dateInput = document.getElementById("date-value");

    // Set the value (not textContent)
    dateInput.value = formattedDate;

    // Detect shift based on time
    let shift;
    if (hours >= 6 && hours < 14) {
        shift = "A";
    } else if (hours >= 14 && hours < 22) {
        shift = "B";
    } else {
        shift = "C";
    }

    // Set shift selection
    document.getElementById("shift-value").value = shift;


});



//input fields correction(references)

document.querySelectorAll(".reference-input").forEach(function (input) {
    input.addEventListener("keydown", function (event) {
        // Allow: Backspace, Delete, Tab, Escape, Enter, and Arrow keys
        if (
            event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "Tab" ||
            event.key === "Escape" ||
            event.key === "Enter" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End" ||
            (event.ctrlKey && (event.key === "a" || event.key === "A")) || // Allow Ctrl + A (Select All)
            (event.ctrlKey && (event.key === "c" || event.key === "C")) || // Allow Ctrl + C (Copy)
            (event.ctrlKey && (event.key === "v" || event.key === "V")) || // Allow Ctrl + V (Paste)
            (event.ctrlKey && (event.key === "x" || event.key === "X")) // Allow Ctrl + X (Cut)
        ) {
            return; // Allow these keys
        }

        // Allow numbers 0-9 only
        if (event.key < "0" || event.key > "9") {
            event.preventDefault(); // Block other keys
        }
    });
});

//input fields correction(line)

document.querySelectorAll(".line-input").forEach(function (input) {
    input.addEventListener("keydown", function (event) {
        // Allow: Backspace, Delete, Tab, Escape, Enter, and Arrow keys
        if (
            event.key === "Backspace" ||
            event.key === "Delete" ||
            event.key === "Tab" ||
            event.key === "Escape" ||
            event.key === "Enter" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End" ||
            (event.ctrlKey && (event.key === "a" || event.key === "A")) || // Allow Ctrl + A (Select All)
            (event.ctrlKey && (event.key === "c" || event.key === "C")) || // Allow Ctrl + C (Copy)
            (event.ctrlKey && (event.key === "v" || event.key === "V")) || // Allow Ctrl + V (Paste)
            (event.ctrlKey && (event.key === "x" || event.key === "X")) // Allow Ctrl + X (Cut)
        ) {
            return; // Allow these keys
        }

        // Allow numbers 0-9 only
        if (event.key < "0" || event.key > "9") {
            event.preventDefault(); // Block other keys
        }
    });
});


//show sub assembly total

document.addEventListener("DOMContentLoaded", function () {
    // Get all reference input elements
    const referenceInputs = document.querySelectorAll(".reference-input");

    // Get the Sub Assembly total label
    const subAssemblyLabel = document.getElementById("sub-assembly");
    const show = document.getElementById("show");

    // Function to calculate total sum
    function updateSubAssemblyTotal() {
        let total = 0;

        referenceInputs.forEach(input => {
            let value = parseInt(input.value) || 0; // Convert input to integer, default to 0 if empty
            total += value;
        });

        // Update the Sub Assembly label with total value
        subAssemblyLabel.textContent = total;
        if (total !== 0) {
            show.textContent = total;
        }
        else if (total == 0) {
            show.textContent = null;
        }
    }

    // Attach event listener to all inputs to detect changes
    referenceInputs.forEach(input => {
        input.addEventListener("input", updateSubAssemblyTotal);
    });

    // Initialize the total on page load
    updateSubAssemblyTotal();

});
//add part button
function addPart() {
    let container = document.getElementById("part-waitings-container");
    let original = container.querySelector(".part-waiting"); // Select first entry as template
    let newPart = original.cloneNode(true); // Clone it

    newPart.querySelectorAll("input").forEach(input => input.value = ""); // Clear inputs

    // let index = container.querySelector(".part-waiting").length + 1;
    // newPart[0].id = "part1" + index;
    newPart.querySelector("select").selectedIndex = 0; // Reset dropdown
    myindex = document.getElementById("part-waitings-container").children.length;
    // newPart.id = "part" + index;
    container.appendChild(newPart); // Append to container

}

function removePart(button) {
    let container = document.getElementById("part-waitings-container");


    if (container.children.length > 1) {
        button.parentElement.remove(); // Remove only if more than one entry exists
    }

}



// time input
document.getElementById("time").addEventListener("keydown", function (input) {
    if (
        input.key === "Backspace" ||
        input.key === "Delete" ||
        input.key === "Tab" ||
        input.key === "Escape" ||
        input.key === "Enter" ||
        input.key === "ArrowLeft" ||
        input.key === "ArrowRight" ||
        input.key === "ArrowUp" ||
        input.key === "ArrowDown" ||
        input.key === "Home" ||
        input.key === "End" ||
        (input.ctrlKey && (input.key === "a" || input.key === "A")) || // Allow Ctrl + A (Select All)
        (input.ctrlKey && (input.key === "c" || input.key === "C")) || // Allow Ctrl + C (Copy)
        (input.ctrlKey && (input.key === "v" || input.key === "V")) || // Allow Ctrl + V (Paste)
        (input.ctrlKey && (input.key === "x" || input.key === "X")) // Allow Ctrl + X (Cut)
    ) {
        return; // Allow these keys
    }

    // Allow numbers 0-9 only
    if (input.key < "0" || input.key > "9") {
        input.preventDefault(); // Block other keys
    }

});

//preview
function previewdata() {
    let data = [];
    let space = " ";
    let line = document.getElementById("line-name").textContent;
    let date = document.getElementById("date-value").value;
    let shift = document.getElementById("shift-value").value;

    let k25length = document.getElementById("k2-5").value.length;
    let k27length = document.getElementById("k2-7").value.length;
    let k210length = document.getElementById("k2-10").value.length;
    let nw7length = document.getElementById("nw-7").value.length;
    let nw10length = document.getElementById("nw-10").value.length;
    let h210ength = document.getElementById("h2-10").value.length;
    let dc10length = document.getElementById("dc-10").value.length;
    let dataname = "_Sub Assembly And Braid Status_";
    let maxlength =Math.max(k25length,k27length,k210length,nw7length,nw10length,h210ength,dc10length);
    if(maxlength<2){
        maxlength = 2;
    }
    let k25 = "";
    if (!document.getElementById("k2-5").value) {
        k25 =space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("k2-5").value.length<=maxlength){
       k25 = space.repeat(2*(maxlength-document.getElementById("k2-5").value.length) )+ document.getElementById("k2-5").value;
    }
    else{
        k25 = document.getElementById("k2-5").value;
    }

    let k27 = "";
    if (!document.getElementById("k2-7").value) {
        k27 = space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("k2-7").value.length<=maxlength){
       k27 = space.repeat(2*(maxlength-document.getElementById("k2-7").value.length)) + document.getElementById("k2-7").value;
    }
    else{
        k27 = document.getElementById("k2-7").value;
    }

    let k210 = "";
    if (!document.getElementById("k2-10").value) {
        k210 = space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("k2-10").value.length<=maxlength){
       k210 = space.repeat(2*(maxlength-document.getElementById("k2-10").value.length) )+ document.getElementById("k2-10").value;
    }
    else{
        k210 = document.getElementById("k2-10").value;
    }

    let nw7 = "";
    if (!document.getElementById("nw-7").value) {
        nw7 = space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("nw-7").value.length<=maxlength){
       nw7 = space.repeat(2*(maxlength-document.getElementById("nw-7").value.length)) + document.getElementById("nw-7").value;
    }
    else{
        nw7 = document.getElementById("nw-7").value;
    }

    let nw10 = "";
    if (!document.getElementById("nw-10").value) {
        nw10 = space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("nw-10").value.length<=maxlength){
       nw10 = space.repeat(2*(maxlength-document.getElementById("nw-10").value.length)) + document.getElementById("nw-10").value;
    }
    else{
        nw10 = document.getElementById("nw-10").value;
    }

    let h210 = "";
    if (!document.getElementById("h2-10").value) {
        h210 = space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("h2-10").value.length<=maxlength){
       h210 = space.repeat(2*(maxlength-document.getElementById("h2-10").value.length)) + document.getElementById("h2-10").value;
    }
    else{
        h210 = document.getElementById("h2-10").value;
    }

    let dc10 = "";
    if (!document.getElementById("dc-10").value) {
        dc10 =space.repeat(2*maxlength-2)+0;
    }
    else if(document.getElementById("dc-10").value.length<=maxlength){
       dc10 = space.repeat(2*(maxlength-document.getElementById("dc-10").value.length)) + document.getElementById("dc-10").value;
    }
    else{
        dc19 = document.getElementById("dc-10").value;
    }




    let k25braid = "";
    if (document.getElementById("k2-5-braid").value) {
        k25braid = document.getElementById("k2-5-braid").value;
    }
    let k27braid = "";
    if (document.getElementById("k2-7-braid").value) {
        k27braid = document.getElementById("k2-7-braid").value;
    }
    let k210braid = "";
    if (document.getElementById("k2-10-braid").value) {
        k210braid = document.getElementById("k2-10-braid").value;
    }
    let nw7braid = "";
    if (document.getElementById("nw-7-braid").value) {
        nw7braid = document.getElementById("nw-7-braid").value;
    }
    let nw10braid = "";
    if (document.getElementById("nw-10-braid").value) {
        nw10braid = document.getElementById("nw-10-braid").value;
    }
    let h210braid = "";
    if (document.getElementById("h2-10-braid").value) {
        h210braid = document.getElementById("h2-10-braid").value;
    }
    let dc10braid = "";
    if (document.getElementById("dc-10-braid").value) {
        dc10braid = document.getElementById("dc-10-braid").value;
    }
    let total = document.getElementById("sub-assembly").textContent;

    let line1 = "";
    let line1label = "";
    if (document.getElementById("line1").value) {
        line1 =document.getElementById("line1").value ;
        line1label = document.getElementById("line1-label").innerText+"=";
    }
    let line2 = "";
    let line2label = "";
    if (document.getElementById("line2").value) {
        line2 =document.getElementById("line2").value ;
        line2label = document.getElementById("line2-label").innerText+"=";
    }
    let line3 = "";
    let line3label = "";
    if (document.getElementById("line3").value) {
        line3 =document.getElementById("line3").value ;
        line3label = document.getElementById("line3-label").innerText+"=";
    }
    let issues = document.getElementById("line-issues").value;

    
    data.push(`__${line}__\n`);

    data.push(`DATE: ${date}  ${space}  ${space} SHIFT: ${shift}\n`);
    data.push(`${dataname}`);
    data.push(`K2_5    = ${k25} ${space} ${space} ${space} ${k25braid}`);
    data.push(`K2_7    = ${k27} ${space} ${space} ${space} ${k27braid}`);
    data.push(`K2_10  = ${k210} ${space} ${space} ${space} ${k210braid}`);
    data.push(`Nw_7   = ${nw7} ${space} ${space} ${space} ${nw7braid}`);
    data.push(`Nw_10 = ${nw10} ${space} ${space} ${space} ${nw10braid}`);
    data.push(`H2_10  = ${h210} ${space} ${space} ${space} ${h210braid}`);
    data.push(`Dc_10  = ${dc10} ${space} ${space} ${space} ${dc10braid}\n`);
    data.push(`SUB ASSEMBLY = ${total}\n`);
    data.push(`${line1label} ${line1} ${space}  ${line2label} ${line2}  ${space} ${line3label} ${line3}\n`);
    if (issues) {
        data.push(`__LINE ISSUES__`);
        data.push(` ${issues} \n`);

    }

    let partWaitings = document.querySelectorAll(".part-waiting");


    partWaitings.forEach((part, index) => {
        let partNumber = part.querySelector(".part-number").value.trim();
        let time = part.querySelector(".time-input").value.trim();
        let unit = part.querySelector(".time-unit").value;
        if (partNumber) {
            data.push(`__PART WAITINGS & BREAKDOWNS__`);
            data.push(`ISSUE ${index + 1}: ${partNumber}, Time: ${time} ${unit.toUpperCase()}\n`);
        }
    });


    document.getElementById("previewdata").innerText = data.join("\n");
}

// Ensure Socket.IO is loaded
const socket = io();

document.getElementById("send").addEventListener("click", function (event) {
    event.preventDefault(); // Stop default form submission

    let message = document.getElementById("previewdata").innerText.trim();

    if (!message) {
        document.getElementById("status").innerText = "Message is empty! Please enter details.";
        // alert("Message is empty! Please enter details.");
        return;
    }

    console.log("Sending message:", message);

    fetch("/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response from backend:", data);
            if (data.success) {

                document.getElementById("status").innerText = data.message;
                //alert("✅ Message sent successfully to WhatsApp!");

            }

            else {
                alert("❌ Failed to send message: " + data.error);
            }

        })

        .catch(error => {
            console.error("Fetch error:", error);
            alert("⚠️ An error occurred. Check console for details.");
        });


});

