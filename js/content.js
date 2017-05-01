!function($) {
	'use strict';

	$.fn.jsonVisualizer = function(json, options) {
		return this.each( function() {
			var self = $(this);
			if (typeof json == 'string') {
				self.data('json', json);
			}
			else if(typeof json == 'object') {
				self.data('json', JSON.stringify(json))
			}
			else {
				self.data('json', '');
			}

			try {
				var jObject = $.parseJSON(json); // only if json response, we go ahead with formatting
				self.data('json', jObject);
			} catch(error) {
				return; // its not json
			}

			new JsonVisualizer(self, options);
		});
	};

	function JsonVisualizer(self, options) {
		self.html('<ul class="jv-container"></ul>');
		options = $.extend({}, this.defaults, options);
		var renderModes = getRenderingModes(options.expanded);
		self.find('.jv-container').append(renderAsHtml([self.data('json')], renderModes));
	}

	function renderAsHtml(json, renderModes, isArray = false) {
		var html = '';
		for(var key in json) {
			if (!json.hasOwnProperty(key)) {
				continue;
			}

			var value = json[key], type = typeof json[key];
			html += createElement(key, value, type, renderModes, isArray);
		}
		return html;
	}

	function createElement(key, value, type, renderModes, isArray) {
		var cssClass = 'object',
        	open = '{',
        	close = '}';
		if ($.isArray(value)) {
			cssClass = 'array';
      		open = '[';
      		close = ']';
		}
		if(value === null) {
			return '<li><span class="key">' + encode(key) + ': </span><span class="null">' + encode(value) + '</span></li>';
		}
		var jKey = ((isArray) ? '' : (encode(key) + ':'))
		if(type == 'object') {
			var object = '<li><span class="'+ renderModes +'"></span><span class="key">' + jKey + '</span>');
			object += (' <span class="open">' + open + '</span> <ul class="' + cssClass + '">');
			object += renderAsHtml(value, renderModes, $.isArray(value));
			return object += ('</ul><span class="close">' + close + '</span></li>');
		}
		if(type == 'number' || type == 'boolean') {
			return '<li><span class="key">' + jKey + '</span> <span class="'+ type + '">' + encode(value) + '</span></li>';
		}
		return '<li><span class="key">' + jKey + '</span> <span class="'+ type + '">"' + encode(value) + '"</span></li>';
	}

	function getRenderingModes(expanded) {
		if(!expanded) return 'expanded collapsed hidden';
		return 'expanded';
	}

	function encode(value) {
		return $('<div/>').text(value).html();
	}

	$(document).on('click', '.jv-container .expanded', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $self = $(this);
		$self.parent().find('>ul').slideUp(100, function() {
			$self.addClass('collapsed');
		});
	});

	$(document).on('click', '.jv-container .expanded.collapsed', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $self = $(this);
		$self.removeClass('collapsed').parent().find('>ul').slideDown(100, function() {
			$self.removeClass('collapsed').removeClass('hidden');
		});
	});

	JsonVisualizer.prototype.defaults = {
		expanded: true
	};

}(window.jQuery);
$('body').jsonVisualizer(document.body.textContent);
