/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
    return function (selector) {
        if(!(selector.selector || typeof selector === "string")){
           throw "error"; 
        }

        let selected = $(selector);
        if(!selected.length){
            throw "error";
        }
        
        let button = selected.find(".button");
        button.text("hide").click(contentModifier);


        function contentModifier(event) {
            let flag = false;
            let content;
            selected.each(function(element){
                if(element === event.target){
                    flag = true;
                }
                if(flag && $(event.target).hasClass("content")){
                    let isButton = $(event.target).next();
                    if(isButton.hasClass("button")){
                        content = $(event.target);
                        return false;
                    }
                }
            });

            if(content.is(":visible")){
                content.hide();
                button.text("show");
            }else {
                content.show();
                button.text("hide");
            }

        }
    };
};

module.exports = solve;