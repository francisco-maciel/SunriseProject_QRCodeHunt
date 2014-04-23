/**
 * Created by Francisco on 22/04/2014.
 */

var Comet = function (data_url) {
    this.timestamp = 0;
    this.url = data_url;
    this.noerror = true;
    this.count = 0;
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
                // send a new ajax request when this request is finished
                if (!self.noerror) {
                    // if a connection problem occurs, try to reconnect each 5 seconds
                    setTimeout(function(){ comet.connect(); }, 5000);
                }else {
                    // persistent connection
                    self.connect();
                }

                self.noerror = false;
            }
        });
    }

    this.disconnect = function() {}

    this.handleResponse = function(response) {
        $('#content').append('<div>' + response.msg + '</div>');
        $('#count').text("QR Codes found: " + ++this.count);
    }

    this.doRequest = function(request) {
        $.ajax({
            type : 'get',
            url : this.url,
            data : {'msg' : request}
        });
    }

}

var comet = new Comet('./backend.php');
comet.connect();