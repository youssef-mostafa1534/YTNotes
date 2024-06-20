const notesCon = document.querySelector(".notesCon");
const createBtn = document.querySelector(".createBtn");
const deleteBtn = document.querySelector(".delete");

function loadNotes() {
    notesCon.innerHTML = localStorage.getItem("notes");
    if (notesCon.innerHTML == "") {
        deleteBtn.classList.add("hidden");
    } else {
        deleteBtn.classList.remove("hidden");
    }
    addKeydownEventToNotes();
    addClickEventToDeleteButtons();
}

function store() {
    localStorage.setItem("notes", notesCon.innerHTML);
}

function addKeydownEventToNotes() {
    const notes = document.querySelectorAll(".inputBox");
    notes.forEach(note => {
        note.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const br = document.createElement('br');
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(br);

                const newRange = document.createRange();
                newRange.setStartAfter(br);
                newRange.setEndAfter(br);

                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        });

        note.addEventListener('keyup', store);
    });
}

function addClickEventToDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".note img");
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.parentElement.remove();
            store();
            if (notesCon.innerHTML == "") {
                deleteBtn.classList.add("hidden");
            }
        });
    });
}

createBtn.addEventListener("click", () => {
    if (deleteBtn.classList.contains("hidden")) {
        deleteBtn.classList.remove("hidden");
    }

    const note = document.createElement("div");
    note.className = "note";

    const inputBox = document.createElement("div");
    inputBox.className = "inputBox";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.setAttribute("spellcheck", "false");
    inputBox.innerText = "Type something...";

    const img = document.createElement("img");
    img.src = "delete.png";
    img.style.setProperty("user-select", "none");

    note.appendChild(inputBox);
    note.appendChild(img);
    notesCon.appendChild(note);

    addKeydownEventToNotes();
    addClickEventToDeleteButtons();
    store();
});

deleteBtn.addEventListener("click", () => {
    notesCon.innerHTML = "";
    deleteBtn.classList.add("hidden");
    store();
});

loadNotes();