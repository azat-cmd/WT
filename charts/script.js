var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 300;
myCanvas.height = 300;
 
var ctx = myCanvas.getContext("2d");
var myLegend = document.getElementById("myLegend");

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
 
            start_angle += slice_angle;
            color_index++;
        }
        if (this.options.legend){
            color_index = 0;
            var legendHTML = "";
            for (categ in this.options.data){
                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
            }
            this.options.legend.innerHTML = legendHTML;
        }
        start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
        
            if (this.options.doughnutHoleSize){
                var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);               
            }
        
            var labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }
    }
}
let arr = [];
let data = {};
function cl (){
    
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    
    arr.push('#' + n.slice(0, 6));
    data[document.getElementById("01").value] = parseInt(document.getElementById("02").value); 
    document.getElementById("01").value = "";
    document.getElementById("02").value = "";

   console.log(data);
   console.log(arr);


    var myPiechart = new Piechart(
        {
            canvas:myCanvas,
            data:data,
            colors:arr,
            legend: myLegend
        }
    );
    clean();
    myPiechart.draw();
    
}
function clean(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
}