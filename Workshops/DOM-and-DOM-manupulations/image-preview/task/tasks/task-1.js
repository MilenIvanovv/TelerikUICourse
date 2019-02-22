/* globals module */
function solve() {
    return function createImagesPreviewer(selector, items) {

        generatePreviewer(selector,items);
         



    };

    function generatePreviewer (selector,items){

        //container element
        let container = document.querySelector(selector);
        container.style.overflow = "hidden";

        //ELEMENTS
            //TitleInput
        let titleInput = document.createElement("p");
        titleInput.style.textAlign = "center";
        titleInput.innerHTML = "Filter";
            //ElementInput
        let input = document.createElement("input");
        input.addEventListener("change",Search)
        input.setAttribute("type", "text");
        input.setAttribute("size", "37");

            //RightRow DIV
        let div = document.createElement("div");
        let tumbnails = document.createDocumentFragment();
        tumbnails.appendChild(div);
        tumbnails = tumbnails.querySelector("div");
        tumbnails.setAttribute("id","right-row");
            //Appending to div
        tumbnails.appendChild(titleInput);
        tumbnails.appendChild(input);

        for (let i = 0; i < items.length; i++) {
                //TitlePhoto
            let titlePhoto = document.createElement("p");
            titlePhoto.style.textAlign = "center";
            titlePhoto.innerHTML = items[i].title;
            titlePhoto.addEventListener("click",openPhoto);
                //Photo
            let photo = document.createElement("img");
            photo.addEventListener("click",openPhoto);
            photo.setAttribute("src", items[i].url);
            photo.style.height = "200px";
            photo.style.width = "300px";

            tumbnails.appendChild(titlePhoto);
            tumbnails.appendChild(photo);
        }
                //right-row Style
        tumbnails.style.float = "right";
        tumbnails.setAttribute("width","30%");


            //BigPhoto DIV
        div = document.createElement("div");
        let largePhoto = document.createDocumentFragment();
        largePhoto.appendChild(div);
        largePhoto = largePhoto.querySelector("div");
                //title
        let title = document.createElement("p");
        title.style.textAlign = "center";
        title.innerHTML = items[0].title;
                //img
        let img = document.createElement("img");
        img.setAttribute("src",items[0].url);
        img.style.height = "50%";
        img.style.width = "100%";

        largePhoto.appendChild(title);
        largePhoto.appendChild(img);
                //left-row Style
        largePhoto.style.float = "left";
        largePhoto.setAttribute("id","left-row");
        largePhoto.style.width = "70%";
        

        //APPENDING

        container.appendChild(largePhoto);
        container.appendChild(tumbnails);


        function openPhoto(event) {
            if(event.target.localName !== "img"){
                return; 
            }
            
            let copyImg = event.target.cloneNode(true);
            let copyTitle = event.target.previousElementSibling.cloneNode(true);
            largePhoto.innerHTML = "";
            largePhoto.appendChild(copyTitle);
            largePhoto.appendChild(copyImg);
            copyImg.style.height = "50%";
            copyImg.style.width = "100%";

        }

        function Search(event) {
            tumbnails.innerHTML = "";
            tumbnails.appendChild(titleInput);
            tumbnails.appendChild(input);
            console.log(event.target.value);
            for (let i = 0; i < items.length; i++) {

                if(items[i].title.includes(event.target.value)){
                    
                    //TitlePhoto
                    let titlePhoto = document.createElement("p");
                    titlePhoto.style.textAlign = "center";
                    titlePhoto.innerHTML = items[i].title;
                    titlePhoto.addEventListener("click",openPhoto);
                    //Photo
                    let photo = document.createElement("img");
                    photo.addEventListener("click",openPhoto);
                    photo.setAttribute("src", items[i].url);
                    photo.style.height = "200px";
                    photo.style.width = "300px";

                    tumbnails.appendChild(titlePhoto);
                    tumbnails.appendChild(photo);
                }
            }
        }
    }
}

module.exports = solve;