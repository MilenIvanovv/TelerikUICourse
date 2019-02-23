/* globals module, document, HTMLElement, console */

function solve() {
    return function(selector, isCaseSensitive) {
            let addText,addInput,button,list,addElements,root,rootFragment,searchElements,searchText,searchInput,Result;

            addText = document.createElement("label");
            addInput = document.createElement("input");
            button = document.createElement("button");
            addElements = document.createElement("div");
            rootFragment = document.createDocumentFragment();
            list = document.createElement("div");
            searchText = document.createElement("label");
            searchInput = document.createElement("input");
            searchElements = document.createElement("div"); 
            Result = document.createElement("div");

            root = document.querySelector(selector);
            root.setAttribute("class","items-control");
            addText.innerHTML = "Enter text";
            addInput.setAttribute("type","text");
            button.setAttribute("class","button");
            button.innerHTML = "Add";
            button.addEventListener("click",Add)
            addElements.setAttribute("class","add-controls")
            searchText.innerHTML = "Search:";
            searchInput.addEventListener("change",Search);
            searchElements.setAttribute("class","search-controls");
            list.setAttribute("class","items-list");
            Result.setAttribute("class","result-controls");
            

            addElements.appendChild(addText);
            addElements.appendChild(addInput);
            addElements.appendChild(button);
            Result.appendChild(list);
            searchElements.appendChild(searchText);
            searchElements.appendChild(searchInput);
            rootFragment.appendChild(addElements);
            rootFragment.appendChild(searchElements);
            rootFragment.appendChild(Result);
            root.appendChild(rootFragment);


            function Add(event) {
                let item,button,text;
                item = document.createElement("div");
                button = document.createElement("button");
                text = document.createElement("label");

                item.setAttribute("class","list-item");
                text.innerHTML = addInput.value;
                addInput.value = "";
                button.addEventListener("click",Remove);
                button.setAttribute("class","button");
                button.innerHTML = "X";
                item.appendChild(text);
                item.appendChild(button);
                list.appendChild(item);

                function Remove(event) {
                    event.target.parentElement.outerHTML = "";
                }
            }

            function Search(event) {
                debugger;
                let itemList = list.querySelectorAll(".list-item");
                for (let i = 0; i < itemList.length; i++) {
                    itemList[i].style.display = "none";
                    let parText = itemList[i].childNodes[0];
                    if(!isCaseSensitive){
                        if(parText.innerHTML.toLowerCase().includes(event.target.value.toLowerCase())){
                            itemList[i].style.display = "block";
                        }
                    }else {
                        if(parText.innerHTML.includes(event.target.value)){
                            itemList[i].style.display = "block";
                        }
                    }
                }
            }
             


    };
}

module.exports = solve;