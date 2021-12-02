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

const webApp = {};

/**
 * @param {Object} additionService
 * @param {Object} ctors
 */
webApp.webApp = function (additionService, ctors) {
  this.additionService = additionService;
  this.ctors = ctors;
};

/**
 * @param {string} msg
 */
webApp.webApp.prototype.addition = function (A, B) {
  //webApp.webApp.addLeftMessage(msg);
  var unaryRequest = new this.ctors.AddRequest();

  unaryRequest.setA(A);
  unaryRequest.setB(B);

  var call = this.additionService.add2Numbers(
    unaryRequest,
    {},
    function (err, response) {
      if (err) {
        console.log("Error code: " + err.code + ' "' + err.message + '"');
      } else {
        console.log(response.getVal());
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
 * @param {Object} e event
 * @return {boolean} status
 */
webApp.webApp.prototype.sendAdd2Numbers = function (e) {
  document.getElementById("a").value.trim();
  var A = document.getElementById("a").value.trim();
  var B = document.getElementById("b").value.trim();
  document.getElementById("a").value = ""; // clear the text box
  document.getElementById("b").value = ""; // clear the text box

  if (!A || !B) return false;

  this.addition(A, B);

  return false;
};

/**
 * Load the app
 */
webApp.webApp.prototype.load = function () {
  var self = this;
  
  document.addEventListener('DOMContentLoaded', function () {
    // your page initialization code here
    // the DOM will be available here
    console.log("ready");
    document
      .getElementById("sendAdd2Numbers")
      .addEventListener("click", self.sendAdd2Numbers.bind(self));
    });
    /*
  
  (() => {
   
  })();*/
};
console.log("webApp1", webApp);
module.exports = webApp;
