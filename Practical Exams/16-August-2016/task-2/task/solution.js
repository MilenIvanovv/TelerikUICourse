var data = [
    { name: 'file1.txt', content: 'some text' },
    { name: 'file2.txt', content: 'another text' },
    { name: 'tests.js', content: '// writing tests is boring' },
    { name: 'file3.cs', content: 'public static void override sealed new internal volatile inline Main(){ System.Console.WriteLine("hello"); }' },
    { name: 'sticky-note.txt', content: 'wash the dishes!' }
];


let DragAndDropElement;
let dropHandler = (event) => {
    event.preventDefault();
    $(DragAndDropElement).remove();
}

let dragOverHandler = (event) => {
    event.preventDefault();
}

let startDragHandler = (event) => {
    DragAndDropElement = event.target;
}

function solve() {
    return function (filesMap) {
        //initial structure
        let fileExplorer = $("<section>").attr({class:"file-explorer"}),
            addWrapper = $("<div>").attr({class:"add-wrapper"}).appendTo(fileExplorer),
            items = $("<ul>").attr({class:"items"}).appendTo(fileExplorer),
            addButton = $("<a>").attr({class: "add-btn visible"}).appendTo(addWrapper),
            input = $("<input>").attr({type: "text"}).appendTo(addWrapper),
            bin = $("<a>").addClass("del-btn").on("dragover",dragOverHandler).on("drop",dropHandler).appendTo(addWrapper),
            filePreview = $("<article>").attr({class:"file-preview"}),
            fileContent = $("<p>").attr({ class: "file-content"}).appendTo(filePreview);

        $("#file-explorer").append(fileExplorer);
        $("#file-explorer").append(filePreview);

        //file Template
        let file = $("<li>").attr({class:"file-item item",draggable:"true"}).append($("<a>").addClass("file-name"));

        //folder Template
        let folder = $("<li>").attr({class:"dir-item item collapsed",draggable:"true"})
            .append($("<a>").addClass("item-name"))
            .append($("<ul>").addClass("items"));

        let showPreview = (event) => {
            let fileData =  searchForData(filesMap,$(event.target).text());
            fileContent.text(fileData)
        }

        let searchForData = (files,fileName) => {
            let fileData;
            files.forEach((item) => {
                if(fileData){
                    return;
                }
                if(!item.content){
                    fileData = searchForData(item.files,fileName);
                    if(fileData){
                        return;
                    }
                }
                if(item.name === fileName){
                    fileData = item.content;
                    return;
                }
            })
            return fileData;
        }

        let loadFiles = (destination,filesMap) => {
            let newFile;
            filesMap.forEach((item) => {
                if(item.files){
                    newFile = folder.clone();
                    newFile.click(openFolder);
                    loadFiles(newFile.find("ul"),item.files);
                }
                else{
                    newFile = file.clone();
                    newFile.click(showPreview);
                }
                newFile.find(".file-name").text(item.name);
                newFile.on("dragstart",startDragHandler);

                newFile.appendTo(destination);
            })
        }



        let openFolder = (event) => {
            let folder = $(event.target).parent();
            if(folder.hasClass("collapsed")){
                folder.removeClass("collapsed");
                return;
            }
            folder.addClass("collapsed");
        }
        loadFiles(items,filesMap);


        
    }
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}