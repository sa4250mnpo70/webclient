/*
 * Copyright 2012 Denis Washington <denisw@online.de>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require) {
  var _ = require('underscore');
  var api = require('app/util/api');
  var Backbone = require('backbone');

  var ChannelFollowers = Backbone.Model.extend({
    constructor: function(channel) {
      Backbone.Model.call(this);
      this.channel = channel;
    },

    url: function() {
      return api.url(this.channel, 'subscribers', 'posts');
    },

    usernames: function() {
      return _.keys(this.attributes);
    },

    byType: function() {
      var roles = this.attributes;
      return _.groupBy(this.usernames(), function(username) {
        return roles[username];
      });
    }
  });

  return ChannelFollowers;
});