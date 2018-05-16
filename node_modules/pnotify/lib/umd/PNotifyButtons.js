(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('PNotifyButtons', ['exports', "PNotify"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("./PNotify"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.PNotify);
		global.PNotifyButtons = mod.exports;
	}
})(this, function (exports, _PNotify) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _PNotify2 = _interopRequireDefault(_PNotify);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _showSticker(_ref) {
		var sticker = _ref.sticker,
		    _notice = _ref._notice;

		return sticker && !(_notice && _notice.refs.elem.classList.contains('nonblock'));
	}

	function _showCloser(_ref2) {
		var closer = _ref2.closer,
		    _notice = _ref2._notice;

		return closer && !(_notice && _notice.refs.elem.classList.contains('nonblock'));
	}

	function _pinUpClass(_ref3) {
		var classes = _ref3.classes,
		    _notice = _ref3._notice;

		return _notice ? classes.pinUp === null ? _notice.get()._icons.pinUp : classes.pinUp : '';
	}

	function _pinDownClass(_ref4) {
		var classes = _ref4.classes,
		    _notice = _ref4._notice;

		return _notice ? classes.pinDown === null ? _notice.get()._icons.pinDown : classes.pinDown : '';
	}

	function _closerClass(_ref5) {
		var classes = _ref5.classes,
		    _notice = _ref5._notice;

		return _notice ? classes.closer === null ? _notice.get()._icons.closer : classes.closer : '';
	}

	function data() {
		return _extends({
			'_notice': null, // The PNotify notice.
			'_options': {}, // The options for the notice.
			'_mouseIsIn': false
		}, _PNotify2.default.modules.Buttons.defaults);
	};

	var methods = {
		initModule: function initModule(options) {
			var _this = this;

			this.set(options);

			var _get = this.get(),
			    _notice = _get._notice;

			_notice.on('mouseenter', function () {
				return _this.set({ '_mouseIsIn': true });
			});
			_notice.on('mouseleave', function () {
				return _this.set({ '_mouseIsIn': false });
			});
			_notice.on('state', function (_ref6) {
				var changed = _ref6.changed,
				    current = _ref6.current;

				if (!changed.hide) {
					return;
				}

				var _get2 = _this.get(),
				    sticker = _get2.sticker;

				if (!sticker) {
					return;
				}

				// Font Awesome 5 replaces our lovely element with a gross SVG. In
				// order to make it play nice with Svelte, we have to clear the
				// element and make it again.
				var icon = current.hide ? _this.get().classes.pinUp : _this.get().classes.pinDown;
				if (_this.get()._notice.get().icons === 'fontawesome5' || typeof icon === 'string' && icon.match(/(^| )fa[srlb]($| )/)) {
					_this.set({ 'sticker': false });
					_this.set({ 'sticker': true });
				}
			});
		},
		handleStickerClick: function handleStickerClick() {
			var _get3 = this.get(),
			    _notice = _get3._notice;

			_notice.update({ hide: !_notice.get().hide });
		},
		handleCloserClick: function handleCloserClick() {
			this.get()._notice.close(false);
			this.set({ '_mouseIsIn': false });
		}
	};

	function oncreate() {
		this.fire('init', { module: this });
	};

	function setup(Component) {
		Component.key = 'Buttons';

		Component.defaults = {
			// Provide a button for the user to manually close the notice.
			closer: true,
			// Only show the closer button on hover.
			closerHover: true,
			// Provide a button for the user to manually stick the notice.
			sticker: true,
			// Only show the sticker button on hover.
			stickerHover: true,
			// The various displayed text, helps facilitating internationalization.
			labels: {
				close: 'Close',
				stick: 'Stick',
				unstick: 'Unstick'
			},
			// The classes to use for button icons. Leave them null to use the classes from the styling you're using.
			classes: {
				closer: null,
				pinUp: null,
				pinDown: null
			}
		};

		// Register the module with PNotify.
		_PNotify2.default.modules.Buttons = Component;
		// Prepend this module to the container.
		_PNotify2.default.modulesPrependContainer.push(Component);

		// Add button icons to icons objects.
		_extends(_PNotify2.default.icons.brighttheme, {
			closer: 'brighttheme-icon-closer',
			pinUp: 'brighttheme-icon-sticker',
			pinDown: 'brighttheme-icon-sticker brighttheme-icon-stuck'
		});
		_extends(_PNotify2.default.icons.bootstrap3, {
			closer: 'glyphicon glyphicon-remove',
			pinUp: 'glyphicon glyphicon-pause',
			pinDown: 'glyphicon glyphicon-play'
		});
		_extends(_PNotify2.default.icons.fontawesome4, {
			closer: 'fa fa-times',
			pinUp: 'fa fa-pause',
			pinDown: 'fa fa-play'
		});
		_extends(_PNotify2.default.icons.fontawesome5, {
			closer: 'fas fa-times',
			pinUp: 'fas fa-pause',
			pinDown: 'fas fa-play'
		});
	};

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-1yjle82-style';
		style.textContent = ".ui-pnotify-closer.svelte-1yjle82,.ui-pnotify-sticker.svelte-1yjle82{float:right;margin-left:.5em;cursor:pointer}[dir=rtl] .ui-pnotify-closer,[dir=rtl] .ui-pnotify-sticker{float:left;margin-right:.5em;margin-left:0}.ui-pnotify-buttons-hidden.svelte-1yjle82{visibility:hidden}";
		appendNode(style, document.head);
	}

	function create_main_fragment(component, state) {
		var text, if_block_1_anchor;

		var if_block = state._showCloser && create_if_block(component, state);

		var if_block_1 = state._showSticker && create_if_block_1(component, state);

		return {
			c: function create() {
				if (if_block) if_block.c();
				text = createText("\n");
				if (if_block_1) if_block_1.c();
				if_block_1_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insertNode(text, target, anchor);
				if (if_block_1) if_block_1.m(target, anchor);
				insertNode(if_block_1_anchor, target, anchor);
			},

			p: function update(changed, state) {
				if (state._showCloser) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(component, state);
						if_block.c();
						if_block.m(text.parentNode, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (state._showSticker) {
					if (if_block_1) {
						if_block_1.p(changed, state);
					} else {
						if_block_1 = create_if_block_1(component, state);
						if_block_1.c();
						if_block_1.m(if_block_1_anchor.parentNode, if_block_1_anchor);
					}
				} else if (if_block_1) {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = null;
				}
			},

			u: function unmount() {
				if (if_block) if_block.u();
				detachNode(text);
				if (if_block_1) if_block_1.u();
				detachNode(if_block_1_anchor);
			},

			d: function destroy() {
				if (if_block) if_block.d();
				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (1:0) {#if _showCloser}
	function create_if_block(component, state) {
		var div, span, span_class_value, div_class_value, div_title_value;

		function click_handler(event) {
			component.handleCloserClick();
		}

		return {
			c: function create() {
				div = createElement("div");
				span = createElement("span");
				this.h();
			},

			h: function hydrate() {
				span.className = span_class_value = "" + state._closerClass + " svelte-1yjle82";
				addListener(div, "click", click_handler);
				div.className = div_class_value = "ui-pnotify-closer " + (!state.closerHover || state._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82";
				setAttribute(div, "role", "button");
				div.tabIndex = "0";
				div.title = div_title_value = state.labels.close;
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(span, div);
			},

			p: function update(changed, state) {
				if (changed._closerClass && span_class_value !== (span_class_value = "" + state._closerClass + " svelte-1yjle82")) {
					span.className = span_class_value;
				}

				if ((changed.closerHover || changed._mouseIsIn) && div_class_value !== (div_class_value = "ui-pnotify-closer " + (!state.closerHover || state._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82")) {
					div.className = div_class_value;
				}

				if (changed.labels && div_title_value !== (div_title_value = state.labels.close)) {
					div.title = div_title_value;
				}
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(div, "click", click_handler);
			}
		};
	}

	// (11:0) {#if _showSticker}
	function create_if_block_1(component, state) {
		var div, span, span_class_value, div_class_value, div_aria_pressed_value, div_title_value;

		function click_handler(event) {
			component.handleStickerClick();
		}

		return {
			c: function create() {
				div = createElement("div");
				span = createElement("span");
				this.h();
			},

			h: function hydrate() {
				span.className = span_class_value = "" + (state._options.hide ? state._pinUpClass : state._pinDownClass) + " svelte-1yjle82";
				addListener(div, "click", click_handler);
				div.className = div_class_value = "ui-pnotify-sticker " + (!state.stickerHover || state._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82";
				setAttribute(div, "role", "button");
				setAttribute(div, "aria-pressed", div_aria_pressed_value = state._options.hide);
				div.tabIndex = "0";
				div.title = div_title_value = state._options.hide ? state.labels.stick : state.labels.unstick;
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(span, div);
			},

			p: function update(changed, state) {
				if ((changed._options || changed._pinUpClass || changed._pinDownClass) && span_class_value !== (span_class_value = "" + (state._options.hide ? state._pinUpClass : state._pinDownClass) + " svelte-1yjle82")) {
					span.className = span_class_value;
				}

				if ((changed.stickerHover || changed._mouseIsIn) && div_class_value !== (div_class_value = "ui-pnotify-sticker " + (!state.stickerHover || state._mouseIsIn ? '' : 'ui-pnotify-buttons-hidden') + " svelte-1yjle82")) {
					div.className = div_class_value;
				}

				if (changed._options && div_aria_pressed_value !== (div_aria_pressed_value = state._options.hide)) {
					setAttribute(div, "aria-pressed", div_aria_pressed_value);
				}

				if ((changed._options || changed.labels) && div_title_value !== (div_title_value = state._options.hide ? state.labels.stick : state.labels.unstick)) {
					div.title = div_title_value;
				}
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(div, "click", click_handler);
			}
		};
	}

	function PNotifyButtons(options) {
		var _this2 = this;

		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ sticker: 1, _notice: 1, closer: 1, classes: 1 }, this._state);

		if (!document.getElementById("svelte-1yjle82-style")) add_css();

		if (!options.root) {
			this._oncreate = [];
		}

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(function () {
			oncreate.call(_this2);
			_this2.fire("update", { changed: assignTrue({}, _this2._state), current: _this2._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			callAll(this._oncreate);
		}
	}

	assign(PNotifyButtons.prototype, {
		destroy: destroy,
		get: get,
		fire: fire,
		on: on,
		set: set,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount,
		_differs: _differs
	});
	assign(PNotifyButtons.prototype, methods);

	PNotifyButtons.prototype._recompute = function _recompute(changed, state) {
		if (changed.sticker || changed._notice) {
			if (this._differs(state._showSticker, state._showSticker = _showSticker(state))) changed._showSticker = true;
		}

		if (changed.closer || changed._notice) {
			if (this._differs(state._showCloser, state._showCloser = _showCloser(state))) changed._showCloser = true;
		}

		if (changed.classes || changed._notice) {
			if (this._differs(state._pinUpClass, state._pinUpClass = _pinUpClass(state))) changed._pinUpClass = true;
			if (this._differs(state._pinDownClass, state._pinDownClass = _pinDownClass(state))) changed._pinDownClass = true;
			if (this._differs(state._closerClass, state._closerClass = _closerClass(state))) changed._closerClass = true;
		}
	};

	setup(PNotifyButtons);

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.store || options.store;
	}

	function assign(tar, src) {
		for (var k in src) {
			tar[k] = src[k];
		}return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) {
			tar[k] = 1;
		}return tar;
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.shift()();
		}
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = null;
		this._state = {};
	}

	function get() {
		return this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				handler.__calling = true;
				handler.call(this, data);
				handler.__calling = false;
			}
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _unmount() {
		if (this._fragment) this._fragment.u();
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function blankObject() {
		return Object.create(null);
	}

	function noop() {}
	exports.default = PNotifyButtons;
});