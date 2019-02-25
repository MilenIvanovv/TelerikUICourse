function solve(){
  return function(selector){
    let selected = $(selector);
    let dropdownList = $("<div>").attr({
        class:"dropdown-list"
    });
    
    let dropdownItems = $("<div>").attr({
        class:"options-container"
    }).css("position","absolute");

    let item = $("<div>").attr({
        class:"dropdown-item"
    })

    let current = $("<div>").attr({
        class:"current"
    }).attr("data-value","").text("Option 1");
    current.click(openOptions);

    selected.children().each(function(i,option){
        let newItem = item.clone()
        // .attr("data-value",$(option).val())
        .attr("data-value",1)
        .attr("data-index",i)
        .text("Option " + (i+1))
        .click(selecting);
        dropdownItems.append(newItem);
    })

    selected.after(dropdownList);
    dropdownList.append(selected);
    dropdownList.append(current);
    dropdownList.append(dropdownItems);
    selected.hide();
    dropdownItems.hide();

    function openOptions() {
        dropdownItems.show();
    }

    function selecting(event) {
        let clicked = $(event.target);
        current.attr("data-value",clicked.attr("data-value"))
            .text(clicked.text());
            console.log(current.val());
        dropdownItems.hide();
    }
  };
}

module.exports = solve;