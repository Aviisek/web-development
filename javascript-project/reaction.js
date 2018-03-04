var startTime = new Date().getTime();
            
            function getRandomColor() {
              var letters = '0123456789ABCDEF';
              var color = '#';
              for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
            }
            
            function makeShapeAppear(){
                
                var width = (Math.random() * 300) + 50;
                
                document.getElementById("shape").style.borderRadius = "0"
                
                if(Math.random() > 0.5){
                    document.getElementById("shape").style.borderRadius = "50%";
                }
                
                document.getElementById("shape").style.top = Math.random() * 400 + "px";
                document.getElementById("shape").style.left = Math.random() * 400 + "px";
                document.getElementById("shape").style.width = width + "px";
                document.getElementById("shape").style.height = width + "px";
                document.getElementById("shape").style.backgroundColor = getRandomColor();
                document.getElementById("shape").style.display = "block";
                startTime = new Date().getTime();
            }
            
            function appearAfterDelay(){
                setTimeout(makeShapeAppear,Math.random()*2000);
            }
            
            appearAfterDelay();
            
            document.getElementById("shape").onclick = function(){
                document.getElementById("shape").style.display = "none";
                
                var endTime = new Date().getTime();
                
                var timeTaken = (endTime-startTime)/1000;
                
                document.getElementById("time").innerHTML = timeTaken + "s";
                
                appearAfterDelay();
                
            }
            