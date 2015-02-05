define([
	'goo/math/Vector4'
], function (
	Vector4
) {
	'use strict';

	function Spline(controlPoints) {
		// array of any sort of Vector
		this.controlPoints = controlPoints; // clone?
		this.nSegments = (this.controlPoints.length - 1) / 3;
	}

	(function () {
		// should be of the same type as p0, p1, p2
		// using Vector4 here because it can hold instances of Vector2/3/4
		var term0 = new Vector4();
		var term1 = new Vector4();
		var term2 = new Vector4();

		Spline.quadraticInterpolation = function (p0, p1, p2, t, store) {
			// B(t) =
			// (1 - t)^2 * P0 +
			// 2 * (1 - t) * t * P1 +
			// t^2 * P2

			var t2 = t * t;

			var it = 1 - t;
			var it2 = it * it;

			term0.setVector(p0).scale(it2);
			term1.setVector(p1).scale(it * t * 2);
			term2.setVector(p2).scale(t2);

			store.setVector(term0).addVector(term1).addVector(term2).addVector(term3);
		};
	})();

	(function () {
		// should be of the same type as p0, p1, p2, p3
		// using Vector4 here because it can hold instances of Vector2/3/4
		var term0 = new Vector4();
		var term1 = new Vector4();
		var term2 = new Vector4();
		var term3 = new Vector4();

		Spline.cubicInterpolation = function (p0, p1, p2, p3, t, store) {
			// B(t) =
			// (1 - t)^3 * P0 +
			// 3 * (1 - t)^2 * t * P1 +
			// 3 * (1 - t) * t^2 * P2 +
			// t^3 * P3

			var t2 = t * t;
			var t3 = t2 * t;

			var it = 1 - t;
			var it2 = it * it;
			var it3 = it2 * it;

			term0.setVector(p0).scale(it3);
			term1.setVector(p1).scale(it2 * t * 3);
			term2.setVector(p2).scale(it * t2 * 3);
			term3.setVector(p3).scale(t3);

			store.setVector(term0).addVector(term1).addVector(term2).addVector(term3);
		};
	})();

	/**
	 *
	 * @param {number} t
	 * @param {Vector} store
	 */
	Spline.prototype.getPoint = function (t, store) {
		if (t >= 1) {
			store.setVector(this.controlPoints[this.controlPoints.length - 1]);
			return;
		}

		var point = this.nSegments * t;
		var index = Math.floor(point);
		var fraction = point - index;

		var p0 = this.controlPoints[index * 3 + 0];
		var p1 = this.controlPoints[index * 3 + 1];
		var p2 = this.controlPoints[index * 3 + 2];
		var p3 = this.controlPoints[index * 3 + 3];

		Spline.cubicInterpolation(p0, p1, p2, p3, fraction, store);
	};

	Spline.getEquidistantPoint = function (t, increment) {
		// compute distance in smaller increments until the increment parameter is satisfied
	};

	return Spline;
});
