/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  
  Create a function that takes an id or DOM element and:

If an id is provided, select the element
Finds all elements with class button or content within the provided element
    Change the content of all .button elements with "hide"
When a .button is clicked:
Find the topmost .content element, that is before another .button and:
    If the .content is visible:
        Hide the .content
        Change the content of the .button to "show"
    If the .content is hidden:
        Show the .content
        Change the content of the .button to "hide"
    If there isn't a .content element after the clicked .button and before other .button, do nothing
Throws if:
    The provided DOM element is non-existant
    The id is neither a string nor a DOM element
*/


function solve() {
    return function (selector) {
        let element;
        if(typeof selector === "string"){
            element = document.getElementById(selector);
        }else{
            element = selector;
        }

        if(!element) {
            throw "error";
        }

        let selected = element.querySelectorAll(".button, .content");

        for (let i = 0; i < selected.length; i++) {
            if(selected[i].className === "button"){
                selected[i].innerHTML = "hide";
                selected[i].addEventListener("click", ContentModifier);
            }
            
        }

        function ContentModifier(event) {
            let selectedContent;
            let Nodes = element.childNodes;
            
            for (let i = 0; i < Nodes.length; i++) {
                if(Nodes[i] === event.target){
                    for (let n = i + 1 ; n < Nodes.length; n++) {
                        if(Nodes[n].className === "button"){
                            return;
                        }
                        else if(Nodes[n].className === "content"){
                            selectedContent = Nodes[n];
                            break;
                        }
                    }
                    break;
                }
            }

            if(!(selectedContent.offsetWidth > 0 && selectedContent.offsetHeight > 0)){
                selectedContent.style.display = "block";
                event.target.innerHTML = "hide";
                return;
            }
            selectedContent.style.display = "none";
            event.target.innerHTML = "show";

        }
    };
};

module.exports = solve;