/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const additionapp = {};

/**
 * @param {Object} additionService
 * @param {Object} ctors
 */
additionapp.AdditionApp = function (additionService, ctors) {
  this.additionService = additionService;
  this.ctors = ctors;
};

additionapp.AdditionApp.INTERVAL = 500; // ms
additionapp.AdditionApp.MAX_STREAM_MESSAGES = 50;

/**
 * @param {string} message
 * @param {string} cssClass
 */
additionapp.AdditionApp.addMessage = function (message, cssClass) {
  $("#first").after(
    $("<div/>")
      .addClass("row")
      .append(
        $("<h2/>").append(
          $("<span/>")
            .addClass("label " + cssClass)
            .text(message)
        )
      )
  );
};

/**
 * @param {string} message
 */
additionapp.AdditionApp.addLeftMessage = function (message) {
  this.addMessage(message, "label-primary pull-left");
};

/**
 * @param {string} message
 */
additionapp.AdditionApp.addRightMessage = function (message) {
  this.addMessage(message, "label-default pull-right");
};

/**
 * @param {string} msg
 */
additionapp.AdditionApp.prototype.addition = function (A, B) {
  //additionapp.AdditionApp.addLeftMessage(msg);
  var unaryRequest = new this.ctors.AddRequest();
  unaryRequest.setA(A);
  unaryRequest.setB(B);
  var call = this.additionService.add2Numbers(
    unaryRequest,
    {},
    function (err, response) {
      if (err) {
        additionapp.AdditionApp.addRightMessage(
          "Error code: " + err.code + ' "' + err.message + '"'
        );
      } else {
        //setTimeout(function () {
        additionapp.AdditionApp.addRightMessage(response.getVal());
        //}, additionapp.AdditionApp.INTERVAL);
      }
    }
  );
  call.on("status", function (status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

/**
 * @param {string} msg
 */
additionapp.AdditionApp.prototype.additionError = function (msg) {
  additionapp.AdditionApp.addLeftMessage(`Error: ${msg}`);
  var unaryRequest = new this.ctors.AdditionRequest();
  unaryRequest.setMessage(msg);
  this.additionService.additionAbort(
    unaryRequest,
    {},
    function (err, response) {
      if (err) {
        additionapp.AdditionApp.addRightMessage(
          "Error code: " + err.code + ' "' + err.message + '"'
        );
      }
    }
  );
};

/**
 * @param {string} msg
 * @param {number} count
 */
additionapp.AdditionApp.prototype.repeatAddition = function (msg, count) {
  additionapp.AdditionApp.addLeftMessage(msg);
  if (count > additionapp.AdditionApp.MAX_STREAM_MESSAGES) {
    count = additionapp.AdditionApp.MAX_STREAM_MESSAGES;
  }
  var streamRequest = new this.ctors.ServerStreamingAdditionRequest();
  streamRequest.setMessage(msg);
  streamRequest.setMessageCount(count);
  streamRequest.setMessageInterval(additionapp.AdditionApp.INTERVAL);

  var stream = this.additionService.serverStreamingAddition(streamRequest, {
    "custom-header-1": "value1",
  });
  stream.on("data", function (response) {
    additionapp.AdditionApp.addRightMessage(response.getMessage());
  });
  stream.on("status", function (status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
  stream.on("error", function (err) {
    additionapp.AdditionApp.addRightMessage(
      "Error code: " + err.code + ' "' + err.message + '"'
    );
  });
  stream.on("end", function () {
    console.log("stream end signal received");
  });
};

/**
 * @param {Object} e event
 * @return {boolean} status
 */
additionapp.AdditionApp.prototype.sendAdd2Numbers = function (e) {
  var A = $("#a").val().trim();
  var B = $("#b").val().trim();
  $("#a").val(""); // clear the text box
  $("#b").val(""); // clear the text box
  if (!A || !B) return false;

  this.addition(A, B);
  
  /*
  if (msg.indexOf(' ') > 0) {
    var count = msg.substr(0, msg.indexOf(' '));
    if (/^\d+$/.test(count)) {
      this.repeatAddition(msg.substr(msg.indexOf(' ') + 1), count);
    } else if (count == 'err') {
      this.additionError(msg.substr(msg.indexOf(' ') + 1));
    } else {
      this.addition(msg);
    }
  } else {
    this.addition(msg);
  }*/

  return false;
};

/**
 * Load the app
 */
additionapp.AdditionApp.prototype.load = function () {
  var self = this;
  $(document).ready(function () {
    // event handlers
    $("#sendAdd2Numbers").click(self.sendAdd2Numbers.bind(self));
  });
};
console.log("additionapp", additionapp);
module.exports = additionapp;
