function solve(){
  return function(){
    $.fn.listview = function(data){
        let template = $("#" + this.attr("data-template")).html();
        var templateScript = Handlebars.compile(template);


        data.forEach(element => {
            var html = templateScript(element);
            this.append(html);
        });

        
    };
  };
}

module.exports = solve;