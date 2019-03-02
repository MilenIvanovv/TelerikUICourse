function solve() {

	return function(selector, rows, colums) {
        //If wrong input handlers

        //Tools
            //Arguments
            const ROWS = (rows + 1),
                COLUMS = (colums + 1);
            //Classes   
            let table_class = "spreadsheet-table",
            item_class = "spreadsheet-item", 
            header_class = "spreadsheet-header",
            cell_class = "spreadsheet-cell", 
            selected_class = "selected", 
            editing_class = "editing";
            //Elements
            let container_$element = $(selector),
                container_$fragment = $(document.createDocumentFragment());
                table_$element = $("<table>")
                .addClass(table_class)
                .appendTo(container_$fragment);
                row_$element = $("<tr>");
                header_cell_$element = $("<th>")
                .addClass(header_class)
                .addClass(item_class)
                .mousedown(cell_mousedown_handler)
                .mousemove(cell_mousemove_handler)
                .mouseup(cell_mouseup_handler);
                cell_$element = $("<td>").append($("<input>").blur(input_blur_hangler)).append($("<span>"))
                .addClass(cell_class)
                .addClass(item_class)
                .mousedown(cell_mousedown_handler)
                .mousemove(cell_mousemove_handler)
                .mouseup(cell_mouseup_handler)
                .dblclick(cell_dblclick_handler);

            //functions
            function getCells(startArg,endArg) {
                let start = {x:startArg.x,y:startArg.y},
                    end = {x:endArg.x,y:endArg.y};
                let cells = [];
                if(end.x < start.x) { 
                    start.x = [end.x, end.x = start.x][0];//swap values
                }

                if(end.y < start.y) { 
                    start.y = [end.y, end.y = start.y][0];//swap values
                }

                for (let y = start.y; y <= end.y; y++) {
                    for (let x = start.x; x <= end.x; x++) {
                        cells.push(table_$element.children().eq(y).children().eq(x));
                    }
                }

                (function getHeaderCells() { //gets header cells within the selected rows and colums
                    for (let x = start.x; x <= end.x; x++) {
                        cells.push(table_$element.children().eq(0).children().eq(x));
                    }

                    for (let y = start.y; y <= end.y; y++) {
                            cells.push(table_$element.children().eq(y).children().eq(0));
                    }
                })();

                return cells;
            }

            function selectCells(cells) {
                cells.map(function(cell) {
                    if(cell.hasClass(selected_class)){
                        return;
                    }
                    cell.addClass(selected_class);
                })
            }

            function selectAll() {
                $("."+cell_class +" , ."+header_class).addClass(selected_class);
            }

            function deSelectAllCells() {
                $("."+selected_class).removeClass(selected_class);
            }

        //Build
            (function tableBuild() {
                for(let y = 0; y < ROWS;y ++){ //rows
                    let new_row_$element = row_$element.clone();
                    new_row_$element.appendTo(table_$element);
                    for(let x = 0; x < COLUMS; x ++){ //cells
                        if(y === 0 || x === 0){//header cells
                        let new_header_cell_$element = header_cell_$element.clone(true,true);
                            new_row_$element.append(new_header_cell_$element);
                            if(y === 0 && x !== 0){//A,B,C..
                                new_header_cell_$element.text(String.fromCharCode(64 + x));
                            }
                            if(y !== 0 && x === 0){//1,2,3..
                                new_header_cell_$element.text(y);
                            }
                            continue;
                        }
                        new_row_$element.append(cell_$element.clone(true,true));//other cells
                    }
                }
            })();

            //Appending table
            container_$element.append(container_$fragment);
            

        //Events
        let cell_mousedown_position = {},
            cell_mousemove_position = {},
            isSelecting = false;

        function cell_mousedown_handler(event) {
            let cells,
                targetCell = $(event.target);

            isSelecting = true;

            deSelectAllCells();
            cell_mousedown_position.x = targetCell.index();
            cell_mousedown_position.y = targetCell.parent().index();
            cells = getCells(cell_mousedown_position,cell_mousedown_position);
            if(targetCell.hasClass(header_class)){
                if(cell_mousedown_position.x === 0 && cell_mousedown_position.y === 0){
                    selectAll();
                    return;
                }
                if(cell_mousedown_position.x === 0 ){
                    cells = cells.concat(getCells({x:COLUMS,y:cell_mousedown_position.y},cell_mousedown_position));
                }
                if(cell_mousedown_position.y === 0 ){
                    cells = cells.concat(getCells({x:cell_mousedown_position.x,y:ROWS},cell_mousedown_position));
                }
            }
            selectCells(cells);
        }
        function cell_mousemove_handler(event) {
            let cells,
                targetCell = $(event.target);

            if(isSelecting){
                deSelectAllCells();

                cell_mousemove_position.x = targetCell.index();
                cell_mousemove_position.y = targetCell.parent().index();
                cells = getCells(cell_mousedown_position,cell_mousemove_position);
                if(targetCell.hasClass(header_class)){
                    if(cell_mousemove_position.x === 0 ){
                        cells = cells.concat(getCells({x:COLUMS,y:cell_mousedown_position.y},cell_mousemove_position));
                    }
                    if(cell_mousemove_position.y === 0 ){
                        cells = cells.concat(getCells({x:cell_mousedown_position.x,y:ROWS},cell_mousemove_position));
                    }
                    if(cell_mousedown_position.x === 0 && cell_mousedown_position.y){
                        selectAll();
                    }
                }
                selectCells(cells);
            }
        }
        function cell_mouseup_handler(event){
            isSelecting = false;
        }
        function cell_dblclick_handler(event) {
            let $cell = $(event.target);
            if($cell.prop("tagName") !== "TD"){
                $cell = $cell.parent();
            }
            let cellInfo = $cell.find("span").text();
            $cell.addClass(editing_class);
            $cell.find("input").css("display","block");
            $cell.find("input").val(cellInfo);
            $cell.find("span").text("");
            $cell.find("input").focus();
        }
        function input_blur_hangler(event) {
            let $input = $(event.target),
                inputInfo = $input.val();
            $input.parent().removeClass(editing_class);
            $input.parent().find("span").text(inputInfo);
            $input.val("");
            $input.css("display","none");
        }
	};
}

// SUBMIT THE CODE ABOVE THIS LINE

if(typeof module !== 'undefined') {
	module.exports = solve;
}

