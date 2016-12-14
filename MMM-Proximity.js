/* Magic Mirror
 * Module: MMM-Proximity
 *
 * By Prasanth Sasikumar
 * MIT Licensed
 */

Module.register("MMM-Proximity", {
    defaults: {
        echoLeftPin: "",
        triggerLeftPin: "",
        echoRightPin: "",
        triggerRightPin: "",
        leftDistance: "100",
        rightDistance: "100",
        useAsButton: false,
        buttonPin: "",
        buttonDistance: "10",
        sensorTimeout: 500,
        animationSpeed: 200,
        sampleInterval: 1000,
        swipeSpeed: 1000,
				secondsToOff:10,
        verbose: false,
    },

    start: function() {
        var self = this;
        console.log('Starting Module: ' + this.name);
        self.sendSocketNotification('GET_READINGS', self.config);
    },

    socketNotificationReceived: function(notification, payload) {
        var self = this;
        if (self.config.verbose && notification === 'READINGS') {
            var status = "<tr align=\"center\"><th>" + payload[2] + "</tr>";
            this.notificationData = "<table border=\"1\" cellpadding=\"5\"><tr align=\"center\"><th>Left</td><th>Right</td></tr><tr align=\"center\"><td>" + payload[0] + "</td><td>" + payload[1] + "</td></tr>" + status + "</table>";
						console.log("Data"+this.notificationData);
						self.displayData = this.notificationData;
            self.updateDom(self.config.animationSpeed);
        }
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        if (this.displayData !== undefined) {
            wrapper.innerHTML = this.displayData;
            wrapper.className = "dimmed light small";
        }
        return wrapper;
    }
});
