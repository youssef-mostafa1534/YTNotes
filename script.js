        const notesCon = document.querySelector(".notesCon");
        const createBtn = document.querySelector(".createBtn");
        const deleteBtn = document.querySelector(".delete");
        let notes = document.querySelectorAll(".inputBox");

        function loadNotes() {
            notesCon.innerHTML = localStorage.getItem("notes");
        }

        loadNotes()

        if (notesCon.innerHTML == "") {
            deleteBtn.classList.add("hidden");
        }

        function store() {
            localStorage.setItem("notes", notesCon.innerHTML);
        }

        createBtn.addEventListener("click", () => {
            if (deleteBtn.classList.contains("hidden")) {
                deleteBtn.classList.remove("hidden");
            }
            let inputBox = document.createElement("p");
            let img = document.createElement("img");
            inputBox.className = "inputBox";
            inputBox.setAttribute("contenteditable", "true");
            inputBox.innerText = "Type something..."
            img.src = "delete.png";
            img.style.setProperty("user-select", "none")
            notesCon.appendChild(inputBox).appendChild(img);
            store()
        });

        notesCon.addEventListener("click", (e) => {
            if (e.target.tagName === "IMG") {
                e.target.parentElement.remove()
                store()
                if (notesCon.innerHTML == "") {
                    deleteBtn.classList.add("hidden");
                }
            }
            else if (e.target.tagName === "P") {
                notes = document.querySelectorAll(".inputBox");
                notes.forEach(nt => {
                    nt.onkeyup = () => {
                        store()
                    };
                });
            }
        });

        deleteBtn.addEventListener("click", () => {
            notesCon.innerHTML = ""
            deleteBtn.classList.add("hidden");
            store()
        });