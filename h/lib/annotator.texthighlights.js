// Generated by CoffeeScript 1.6.3
/*
** Annotator 1.2.6-dev-5ea584f
** https://github.com/okfn/annotator/
**
** Copyright 2012 Aron Carroll, Rufus Pollock, and Nick Stenning.
** Dual licensed under the MIT and GPLv3 licenses.
** https://github.com/okfn/annotator/blob/master/LICENSE
**
** Built at: 2013-11-22 17:25:06Z
*/



/*
//
*/

// Generated by CoffeeScript 1.6.3
(function() {
  var TextHighlight, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  TextHighlight = (function(_super) {
    __extends(TextHighlight, _super);

    TextHighlight.Annotator = Annotator;

    TextHighlight.$ = Annotator.$;

    TextHighlight.highlightType = 'TextHighlight';

    TextHighlight.isInstance = function(element) {
      return this.$(element).hasClass('annotator-hl');
    };

    TextHighlight.getIndependentParent = function(element) {
      return this.$(element).parents(':not([class^=annotator-hl])')[0];
    };

    TextHighlight._inited = [];

    TextHighlight._init = function(annotator) {
      var getAnnotations,
        _this = this;
      if (__indexOf.call(this._inited, annotator) >= 0) {
        return;
      }
      getAnnotations = function(event) {
        var annotations;
        return annotations = TextHighlight.$(event.target).parents('.annotator-hl').andSelf().map(function() {
          return TextHighlight.$(this).data("annotation");
        });
      };
      annotator.addEvent(".annotator-hl", "mouseover", function(event) {
        return annotator.onAnchorMouseover(getAnnotations(event, _this.highlightType));
      });
      annotator.addEvent(".annotator-hl", "mouseout", function(event) {
        return annotator.onAnchorMouseout(getAnnotations(event, _this.highlightType));
      });
      annotator.addEvent(".annotator-hl", "mousedown", function(event) {
        return annotator.onAnchorMousedown(getAnnotations(event, _this.highlightType));
      });
      annotator.addEvent(".annotator-hl", "click", function(event) {
        return annotator.onAnchorClick(getAnnotations(event, _this.highlightType));
      });
      return this._inited.push(annotator);
    };

    TextHighlight.prototype._highlightRange = function(normedRange, cssClass) {
      var hl, node, r, white, _i, _len, _ref, _ref1, _results;
      if (cssClass == null) {
        cssClass = 'annotator-hl';
      }
      white = /^\s*$/;
      hl = this.$("<span class='" + cssClass + "'></span>");
      _ref = normedRange.textNodes();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (!(!white.test(node.nodeValue))) {
          continue;
        }
        r = this.$(node).wrapAll(hl).parent().show()[0];
        if ((_ref1 = window.DomTextMapper) != null) {
          _ref1.changed(node, "created hilite");
        }
        _results.push(r);
      }
      return _results;
    };

    TextHighlight.prototype._highlightRanges = function(normedRanges, cssClass) {
      var highlights, r, _i, _len;
      if (cssClass == null) {
        cssClass = 'annotator-hl';
      }
      highlights = [];
      for (_i = 0, _len = normedRanges.length; _i < _len; _i++) {
        r = normedRanges[_i];
        this.$.merge(highlights, this._highlightRange(r, cssClass));
      }
      return highlights;
    };

    function TextHighlight(anchor, pageIndex, normedRange) {
      TextHighlight.__super__.constructor.call(this, anchor, pageIndex);
      TextHighlight._init(this.annotator);
      this.$ = TextHighlight.$;
      this.Annotator = TextHighlight.Annotator;
      this._highlights = this._highlightRange(normedRange);
      this.$(this._highlights).data("annotation", this.annotation);
    }

    TextHighlight.prototype.isTemporary = function() {
      return this._temporary;
    };

    TextHighlight.prototype.setTemporary = function(value) {
      this._temporary = value;
      if (value) {
        return this.$(this._highlights).addClass('annotator-hl-temporary');
      } else {
        return this.$(this._highlights).removeClass('annotator-hl-temporary');
      }
    };

    TextHighlight.prototype.setActive = function(value) {
      if (value) {
        return this.$(this._highlights).addClass('annotator-hl-active');
      } else {
        return this.$(this._highlights).removeClass('annotator-hl-active');
      }
    };

    TextHighlight.prototype.removeFromDocument = function() {
      var child, hl, _i, _len, _ref, _ref1, _results;
      _ref = this._highlights;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hl = _ref[_i];
        if ((hl.parentNode != null) && this.annotator.domMapper.isPageMapped(this.pageIndex)) {
          child = hl.childNodes[0];
          this.$(hl).replaceWith(hl.childNodes);
          _results.push((_ref1 = window.DomTextMapper) != null ? _ref1.changed(child.parentNode, "removed hilite (annotation deleted)") : void 0);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    TextHighlight.prototype._getDOMElements = function() {
      return this._highlights;
    };

    return TextHighlight;

  })(Annotator.Highlight);

  Annotator.Plugin.TextHighlights = (function(_super) {
    __extends(TextHighlights, _super);

    function TextHighlights() {
      _ref = TextHighlights.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TextHighlights.prototype.pluginInit = function() {
      return Annotator.TextHighlight = TextHighlight;
    };

    return TextHighlights;

  })(Annotator.Plugin);

}).call(this);

//
//@ sourceMappingURL=annotator.texthighlights.map