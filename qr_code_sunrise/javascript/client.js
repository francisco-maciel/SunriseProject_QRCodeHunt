/**
 * Created by Francisco on 22/04/2014.
 */

var Comet = function (data_url) {
    this.timestamp = 0;
    this.url = data_url;
    this.noerror = true;
    this.count = 0;
    this.first = true;
    this.currentKey = null;
    this.jsonPath = "./mapping.json";
    this.connect = function() {
        var self = this;

        $.ajax({
            type : 'get',
            url : this.url,
            dataType : 'json',
            data : {'timestamp' : self.timestamp},
            success : function(response) {
                self.timestamp = response.timestamp;
                self.handleResponse(response);
                self.noerror = true;
            },
            complete : function(response) {
                if (!self.noerror) {
                    setTimeout(function(){ comet.connect(); }, 5000);
                }else {
                    self.connect();
                }

                self.noerror = false;
            }
        });
    }

    this.disconnect = function() {}

    this.handleResponse = function(response) {

        if (typeof response.id != 'undefined') {
            var key = response.id;
            var obj = this;
            if (this.first == true) {
                this.first = false;
            }
            else {
            $.getJSON(this.jsonPath, function(data) {

                if (typeof data[key] != 'undefined') {

                    updateCount(++obj.count);

                    if (key != obj.currentKey || typeof obj.currentKey == 'undefined') {
                        obj.currentKey = key;
                        updateCanvas(data[key]);
                    }
            }

            });
            }



        }
    }

    this.doRequest = function(request) {
        $.ajax({
            type : 'get',
            url : this.url,
            data : {'id' : request}
        });
    }

}

var comet = new Comet('./backend.php');
comet.connect();


function updateCount(count) {
    $('#count').text("QR Codes found: " + count);
}

function updateCanvas(content) {
    $('#content').append('<div>' + content.value + '</div>');


    var canvas=document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    var img=new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0);
    };
    img.src=content.value;

}
