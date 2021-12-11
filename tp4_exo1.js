
let w = 1400;
let h =1000;

let projection = d3.geo.mercator()    
    .translate([w/2,h/2])
    .scale(w-100);


let path = d3.geo.path()
    .projection(projection);

let color = d3.scale.ordinal()
    .range(['Azzure']);

let svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h);

function draw(a){
    document.getElementById("some").style.display="none"
    document.getElementById("all").style.display = "none"
    document.getElementById("pays").style.display = "none"
    document.getElementById("container").style.display = "block"
    document.getElementById("svg").style.display = "block"
    document.getElementById("p1").style.display = "block"
    x=document.getElementById("pays").value
    x = x.replace(/ +(?= )/g, '');
    x=x.replace(/(\r\n|\n|\r)/gm, "");
    list_countries=x.split(",")
    d3.json("countries.json", (json) => {
        if(a==1){
            countries=[]
            for (let i = 1; i < json.features.length; i++) {
                for(let j=0;j<list_countries.length;j++){
                    if (json.features[i].properties.name.toUpperCase()===list_countries[j].toUpperCase()){
                        countries.push(json.features[i])
                        console.log(i)
                        break
                    }   
               }
            }       
        }
        else{
            countries=json.features
        }
        if(countries.length>0){
            svg.selectAll("path")
                .data(countries)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("stroke", "black")
                .attr("fill", (d, i) => {
                    var r = Math.floor(Math.random() * 230),
                        g = Math.floor(Math.random() * 230),
                        b = Math.floor(Math.random() * 230)
                    if (d.properties.name === "Ocean") {
                        r = 0
                        g = 105
                        b = 148
                    }
                    return "rgb(" + r + "," + g + "," + b + ")";
                })
                .on("mousedown", function (d) {
                    d3.select("p").text(d.properties.name)
            });
        }else{
            d3.select("p").text("aucune pays n'est selectionner")
        }    
    });

}    

