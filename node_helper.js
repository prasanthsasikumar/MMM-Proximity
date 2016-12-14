'use strict';

/* Magic Mirror
 * Module: MMM-Proximity
 *
 * By Luke Moch http://github.com/prasanthsasikumar
 * MIT Licensed
 */

const NodeHelper = require('node_helper');
const usonic = require('mmm-usonic');
const statistics = require('math-statistics');
const gpio = require('mmm-gpio');
const exec = require('child_process').exec;


module.exports = NodeHelper.create({
    start: function() {
        const self = this;
        usonic.init(function(error) {
            if (error) {
                console.log(error);
            } else {
                self.initSensor();
            }
        });
        gpio.init(function(error) {
            if (error) {
                console.log(error);
            } else {
                self.initSensor();
            }
        });
    },


    lastReadingsBuffer: function(length) {
        var pointer = 0,
            buffer = [];
        return {
            get: function(key) {
                if (key < 0) {
                    return buffer[pointer + key];
                } else if (key === false) {
                    return buffer[pointer - 1];
                } else {
                    return buffer[key];
                }
            },
            push: function(item) {
                buffer[pointer] = item;
                pointer = (pointer + 1) % length
                return pointer;
            }
        };
    },

    confirmAway: function() {
        var self = this;
        for (var i = 0; i < self.config.secondsToOff; i++) {
          //  console.log("get: " + self.lastReadings.get(i));
            if (self.lastReadings.get(i) === "undefined" || self.lastReadings.get(i) !== "FAR") {
                return false;
            }
        }
        return true;
    },

    getReadings: function() {
        var self = this;
        var readings = [this.sensorLeft().toFixed(2), this.sensorRight().toFixed(2)];
        if (readings[0] < 100 && readings[1] < 100) {
            if (!self.isDisplayOn) {
                console.log("Turning ON Display");
                exec("/opt/vc/bin/tvservice --preferred && sudo chvt 6 && sudo chvt 7", null);
                self.isDisplayOn = true;
            }
            readings[2] = "NEAR";
            if (readings[0] < 10 && readings[1] < 10) {
                readings[2] = "CLEAR";
            }
        } else {
            if (self.isDisplayOn && self.confirmAway()) {
                console.log("Turning OFF Display");
                exec("/opt/vc/bin/tvservice -o", null);
                self.isDisplayOn = false;
            }
            readings[2] = "FAR";
        }
        self.lastReadings.push(readings[2]);
        //console.log("Pushed at : " + self.lastReadings.push(readings[2]));
        self.sendSocketNotification('READINGS', readings);
        setTimeout(function() {
            self.getReadings();
        }, self.config.sampleInterval);
    },

    socketNotificationReceived: function(notification, payload) {
        const self = this;
        this.config = payload;
        var buttonWait = 0;
        var sensorLeft;
        var sensorRight;
        if (notification === 'GET_READINGS') {
            self.sensorLeft = usonic.createSensor(self.config.echoLeftPin, self.config.triggerLeftPin, self.config.sensorTimeout);
            self.sensorRight = usonic.createSensor(self.config.echoRightPin, self.config.triggerRightPin, self.config.sensorTimeout);
            self.lastReadings = self.lastReadingsBuffer(self.config.secondsToOff);
            self.isDisplayOn = true;
            self.getReadings();
        }
    },

    initSensor: function() {}

});
