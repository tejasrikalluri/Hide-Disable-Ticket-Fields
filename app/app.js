$(document).ready(function () {
    app.initialized().then(function (_client) {
        var client = _client;
        //get iparam data
        client.iparams.get().then(function (iparamdata) {
            //get location
            client.instance.context().then(function (context) {
                var location = context.location;
                if (iparamdata.checkedNewTicket == location) {
                    hide_disable_function(iparamdata);
                }
                if (iparamdata.checkedTicket == location) {
                    hide_disable_function(iparamdata);
                }
            }, function (error) {
                handleError(client, error);
            });
        }, function (error) {
            handleError(client, error);
        });
        //Function to hide/disable selected fields
        function hide_disable_function(iparamdata) {
            var agent_list = iparamdata.agent_list;
            client.data.get("loggedInUser").then(function (agent_data) {
                var current_agent = agent_data.loggedInUser.contact.name;
                if ($.inArray(current_agent, agent_list) != '-1') {
                    var hide_fields = iparamdata.hide_map;
                    var disable_fields = iparamdata.disable_map;
                    if (hide_fields != null) {
                        $.each(hide_fields, function (k, v) {
                            client.interface.trigger("hide", {
                                id: v
                            });
                        });
                    }
                    if (disable_fields != null) {
                        $.each(disable_fields, function (k1, v1) {
                            client.interface.trigger("disable", {
                                id: v1
                            });
                        });
                    }
                }
            }, function (error) {
                handleError(client, error);
            });
        }
    }, function (error) {
        handleError(client, error);
    });

    //Function to handle errors
    function handleError(client, e) {
        if (e) {
            errorHandler(client, e.message);
        }
    }

    function errorHandler(client, message) {
        client.interface.trigger("showNotify", {
            type: "warning",
            message: message
        });
    }
});