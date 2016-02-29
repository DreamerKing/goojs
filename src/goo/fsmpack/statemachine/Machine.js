define([
	'goo/util/ParameterUtils'
], function (
	ParameterUtils
) {
	'use strict';

	function Machine(id, name) {
		this.id = id;
		this.name = name;
		this._states = {};
		this._fsm = null;
		this.initialState = 'entry';
		this.currentState = null;
		this.parent = null;

		this.maxLoopDepth = 100;
		this.asyncMode = false;

		// Same conventions as script "parameters"
		this._variableDefinitions = [];

		// Same conventions as script "args" object
		this._variableValues = {};
	}

	/**
	 * @param {string} id
	 * @returns {?Variable}
	 */
	Machine.prototype.getVariable = function (id) {
		return this._variables[id];
	};

	/**
	 * @param {string} id
	 * @param {Variable} variable
	 * @returns {Machine} self object
	 */
	Machine.prototype.setVariable = function (id, variable) {
		this._variables.set(id, variable);
		return this;
	};

	Machine.prototype.setVariableDefaults = function () {
		ParameterUtils.fillDefaultValues(this._variableValues, this._variableDefinitions);
	};

	Machine.prototype.setRefs = function (parentFSM) {
		this._fsm = parentFSM;
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.setRefs(parentFSM);
		}
	};

	Machine.prototype.contains = function (uuid) {
		return !!this._states[uuid];
	};

	Machine.prototype.setState = function (state) {
		// change state
		this.currentState = state;

		// reset initial state of child machines
		this.currentState.reset();

		// do on enter of new state
		this.currentState.enter();
	};

	Machine.prototype.reset = function () {
		this.setVariableDefaults();

		// reset self
		this.currentState = this._states[this.initialState];

		// propagate reset
		if (this.currentState) {
			this.currentState.reset();
		}
	};

	Machine.prototype.ready = function () {
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.ready();
		}
	};

	Machine.prototype.cleanup = function () {
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.cleanup();
		}
	};

	Machine.prototype.enter = function () {
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.resetDepth();
		}
		if (this.currentState) {
			this.currentState.enter();
		}
	};

	Machine.prototype.update = function () {
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.resetDepth();
		}
		if (this.currentState) {
			if (!this.asyncMode) {
				this.currentState.update();
			} else {
				// old async mode
				var jump = this.currentState.update();

				if (jump && this.contains(jump)) {
					this.currentState.kill();
					this.setState(this._states[jump]);
				}

				return jump;
			}
		}
	};

	Machine.prototype.kill = function () {
		if (this.currentState) {
			this.currentState.kill();
		}
	};

	Machine.prototype.getCurrentState = function () {
		return this.currentState;
	};

	Machine.prototype.addState = function (state) {
		if (Object.keys(this._states).length === 0) {
			this.initialState = state.uuid;
		}
		state.parent = this;
		state._fsm = this._fsm;
		this._states[state.uuid] = state;
	};

	Machine.prototype.removeFromParent = function () {
		if (this.parent) {
			this.parent.removeMachine(this);
		}
	};

	Machine.prototype.recursiveRemove = function () {
		var keys = Object.keys(this._states);
		for (var i = 0; i < keys.length; i++) {
			var state = this._states[keys[i]];
			state.recursiveRemove();
		}
		this._states = {};
	};

	Machine.prototype.removeState = function (id) {
		if (!this._states[id]) { return; }
		if (this.initialState === id) { throw new Error('Cannot remove initial state'); }
		if (this.currentState === this._states[id]) {
			this.reset();
		}
		delete this._states[id];
	};

	Machine.prototype.setInitialState = function (initialState) {
		this.initialState = initialState;
	};

	return Machine;
});
