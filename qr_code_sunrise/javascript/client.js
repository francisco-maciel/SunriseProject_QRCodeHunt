/**
 * Created by Francisco on 22/04/2014.
 */
$(document).ready(function() {
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
    $('.content:hidden:first').fadeIn();


});


function updateCount(count) {
    $('#count').html("Códigos QR<br/> encontrados: " + count);
}

function updateCanvas(content) {
    //$('#content').append('<div>' + content.value + '</div>'); // testing
    $('iframe').remove();
    $()
    if (content.type == 'image') {
        $('.elements').append('<div class="content" style="display: none"><img  width="1130" height="636" style="margin-left: auto;margin-right: auto;display: block; min-height:636px; max-height:636px; width:auto;" src="'+ content.value +'" id="imageID" /></div> ');

        $('.content:visible:first').fadeOut(100, function() {
            $(this).next('.content:hidden').fadeIn();
        });
    }
    else if (content.type == 'video') {
        $('.elements').append('<div class="content" style="display: none"></div>');
        $('.content:hidden:last').show();

            console.log($('.content:hidden:last'));
            $('.content:visible:last').append('<iframe style="margin-left: auto;margin-right: auto;display: block; " width="1130" height="636" src="http://www.youtube.com/embed/'+ content.value+'?autoplay=1&loop=1&playlist='+content.value+'" frameborder="0" allowfullscreen></iframe>');
            $('.content:visible:first').hide();
    }
}
