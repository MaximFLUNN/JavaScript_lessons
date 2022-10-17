    let btn = document.getElementById("myBtn");
    let spoiler = document.getElementById("spoiler");
    btn.onclick = () => {
        if (spoiler.style.display == "none") {
            spoiler.style.display = "block";
        }
        else {
            spoiler.style.display =  "none";
        }
    }

document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && spoiler.style.display ==  "block") {
        spoiler.style.display =  "none";
    }
})