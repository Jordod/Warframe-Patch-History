const getJSON = async () => {
    const response = await fetch('https://raw.githubusercontent.com/WFCD/warframe-items/development/data/json/Warframes.json');
    const jsonData = await response.json();
    
    const list = document.getElementById("list");
    const data = document.getElementById("data");

    var a, div, p , a, h, abDiv, text;

    jsonData.map(f => {
        li = document.createElement("li");
        a = document.createElement("a");
        a.onclick = showFrame;
        a.appendChild(document.createTextNode(f.name));
        
        li.appendChild(a);
        list.appendChild(li);

        div = document.createElement("div");
        div.className = "wfData";
        div.id = f.name;

        h = document.createElement("h2");
        h.appendChild(document.createTextNode(f.name));
        div.appendChild(h);

        h = document.createElement("h4");
        h.style.marginTop = "40px";
        h.style.marginBottom = "20px";
        h.appendChild(document.createTextNode("Patch History"));
        div.appendChild(h);

        abDiv = document.createElement("div");
        f.patchlogs.map(log => {
            a = document.createElement("a");
            a.href = log.url;
            p = document.createElement("strong");
            p.appendChild(document.createTextNode(log.name));
            a.appendChild(p);
            abDiv.appendChild(a);

            p = document.createElement("p");
            p.appendChild(document.createTextNode(dateConv(log.date)));
            abDiv.appendChild(p);

            if(log.additions != "") {
                p = document.createElement("p");
                p.appendChild(document.createTextNode(log.additions));
                abDiv.appendChild(p);
            } if(log.changes != "") {
                p = document.createElement("p");
                p.appendChild(document.createTextNode(log.changes));
                abDiv.appendChild(p);
            } if(log.fixes != "") {
                p = document.createElement("p");
                p.appendChild(document.createTextNode(log.fixes));
                abDiv.appendChild(p);
            }
        });
        div.appendChild(abDiv);

        data.appendChild(div);  
    })
}

const dateConv = function(date) {
    var d = new Date(date);
    return `${d.toDateString()} at ${d.toLocaleTimeString()}`;
}

// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll").style.display = "block";
    } else {
        document.getElementById("scroll").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


const findFrames = function() { //Nicked from https://www.w3schools.com/howto/howto_js_filter_lists.asp
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const hideDivs = function() {
    var divs = document.getElementsByClassName('wfData');
    for (i = 0; i < divs.length;i++ ) {
        divs[i].style.display = "none";
    }
}

const showFrame = function() {
    hideDivs();
    const name = this.innerText;
    var div = document.getElementById(name);
    div.style.display = "block";
}

window.onload = () => {
    getJSON();
};

window.onscroll = () => {
    scrollFunction()
};