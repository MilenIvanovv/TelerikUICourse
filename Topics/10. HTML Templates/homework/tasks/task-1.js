/* globals $ */

function solve() {
  
  return function (selector) {
    /* insert the template here as a string
        example:
        var template =
          '<ul>' +
            '{{#students}}' +
            '<li>' +
              '{{name}}' +
            '</li>' +
            '{{/students}}' +
          '</ul>';
    */

   data = {        
    headers : ['Vendor', 'Model', 'OS'],          
    items : [{          
      col1: 'Nokia',            
      col2: 'Lumia 920',            
      col3: 'Windows Phone'                      
    }, {          
      col1: 'LG',            
      col2: 'Nexus 5',            
      col3: 'Android'                      
    }, {          
      col1: 'Apple',            
      col2: 'iPhone 6',                        
      col3: 'iOS'                      
    }]          
  };

  
   var template = 
    "<table class=\"items-table\">"+
        "<thead>"+
            "<tr>"+
                "<th>#</th>"+
                "{{#each headers}}"+
                    "<th> {{this}}</th>"+
                "{{/each}}"+
            "</tr>"+
        "</thead>"+
        "<tbody>"+
            "{{#each items}}"+
                "<tr>"+
                    "<td>{{@index}}</td>"+
                    "<td>{{col1}}</td>"+
                    "<td>{{col2}}</td>"+
                    "<td>{{col3}}</td>"+
                "</tr>"+
            "{{/each}}"+
        "</tbody>"+
    "</table>";

    var templateScript = Handlebars.compile(template);
    var html = templateScript(data);

    $(selector).append(html);
  };
};

module.exports = solve;