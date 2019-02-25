$.fn.lists = function (lists) {
    let selectedContainer = this;

    //Wrapper
    let section = $("<section>").attr({
        class:"items-wrapper"
    });
    //List Template
    let article = $("<article>").attr({
        class:"items-section"
    });
    let header = $("<strong>");
        //Add item wrapper
    let addItemWrapper = $("<div>").attr({
        class:"add-item-wrapper"
    });   
    let addButton = $("<a>").attr({
        class:"add-btn"
    }).click(addNewItem);   
    let addInput = $("<input>").attr({
        type:"text",
        class:"add-input"
    });  
        //List 
    let list = $("<ul>"); 
    let item = $("<li>").attr({
        draggable:"true",
    });  
    addDnDHandlers(item);


    //Template construct
    article.append(header);
    article.append(addItemWrapper);
        addItemWrapper.append(addButton);
        addItemWrapper.append(addInput);
    article.append(list);

    lists.map(function (listInfo) {
        let newArticle = article.clone(true,true);
        let newHeader = newArticle.find("strong");
        newHeader.text("asdf");
        listInfo.map(function(itemValue){
            let newList = newArticle.find("ul");
            newList.append(item.clone(true,true).text(itemValue));
        });
        section.append(newArticle);
    });


    selectedContainer.append(section);

    function addNewItem(event) {
        let list  = $(event.target).parent().parent();
        let input = list.find("input");
        if(!input.val()){
            return;
        }
        list.find("ul").append(item.clone(true,true).text(input.val()));
        input.val("");
    }

    var dragElement = null;

    function handleDragStart(e) {
      dragElement = this;

      e.originalEvent.dataTransfer.effectAllowed = 'move';
    
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); 
      }
     
      e.originalEvent.dataTransfer.dropEffect = 'move';  

      return false;
    }
    
    function handleDrop(e) {
    
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
    
      if (dragElement != this) {
        $(this).parent().append(dragElement);
      }
      return false;
    }
    

    
    function addDnDHandlers(e) {
        e.on('dragstart', handleDragStart);
        e.on('dragover', handleDragOver);
        e.on('drop', handleDrop);
    }
    

    
    
}