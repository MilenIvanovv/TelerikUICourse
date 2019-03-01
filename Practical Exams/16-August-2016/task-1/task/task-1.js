/* globals document, window, console */

function solve() {
    return function(selector, initialSuggestions) {
        if(typeof selector !== "string"){
            throw "Selector not a string";
        }
        let $container = $(selector);
        if($container.length < 1){
            throw "Nothing with " + selector + " found!"; 
        }
        if(!initialSuggestions){
            initialSuggestions = [];
        }
        let suggestions = initialSuggestions;

        //SuggestionTemplate
        let suggestionTemplate = $("<li>").attr({
            class:"suggestion"
        });
        let link = $("<a>").attr({
            href:"#",
            class:"suggestion-link"
        });
        suggestionTemplate.append(link);
        //SuggestionTemplate

        //add
        let input = $container.find(".tb-pattern");
        $container.find(".btn-add").click((event) => {
            let canAdd = true;
            suggestions.map((suggestionText) => {
                if(input.val() === suggestionText){
                    canAdd = false;
                }
            })
            if(canAdd === true){
                suggestions.push(input.val());
            }
            input.val("");
            suggest();
        })
        let suggestionList = $container.find(".suggestions-list");
        let suggest = (event) => {
            let search = input.val();
            suggestionList[0].innerHTML = "";
            if(search === ""){
                return;
            }
            suggestions.map((suggestionText) => {
                    if(suggestionText.includes(search)){
                    let newSuggestion = suggestionTemplate.clone();
                    let link = newSuggestion.find("a");
                    link.text(suggestionText);
                    link.click(fillInputValue);
                    suggestionList.append(newSuggestion);
                }
            })
        }

        let fillInputValue = (event) => {
            input.val($(event.target).text());
            suggest();
        }

        $container.find(".tb-pattern").on("input",suggest);



    };
}

module.exports = solve;