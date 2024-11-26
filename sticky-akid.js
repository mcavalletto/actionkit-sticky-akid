// sticky-akid.js - Persistent user recognition for ActionKit forms
// Developed by Simon Cavalletto, released freely under the MIT License.
// More information available at greenthumbsoftware.com.

// When submitting an action form, check if it has a remember-me field
window.actionkitBeforeSubmit = function ( original ) {
	return function sticky_before_submit() {
		// Start by running any already-present before-submit hook
		if ( original ) { original.apply(this); }
		const remember_input = $('input[name="remember-me"]');
		if ( remember_input.length ) {
			if ( remember_input.val() ) {
				// If user wants remember-me, set a local flag for ten seconds
				localStorage.setItem("sticky-akid", ( Date.now() + 10_000 ).toString());
			} else {
				// User doesn't want remember-me, so clear the local value
				localStorage.removeItem("sticky-akid");
			}
		}
	}
}( window.actionkitBeforeSubmit );

// When ActionKit parses query string arguments, add our extra logic
actionkit.utils.getArgs = function ( original ) {
	return function sticky_get_args( argsStr ) {
		// Start by running the built-in ActionKit functionality
		var args = original.apply(this, [argsStr]);
		const remembered = localStorage.getItem("sticky-akid");
		if ( remembered ) {
			if ( ! args['akid'] ) {
				if ( remembered.match(/\.\d/) ) {
					// No AKID in the query string, but we have one saved, so let's use it
					args['akid'] = remembered;
				}
			} else {
				if ( remembered.match(/^\d+$/) ) {
					// We have an AKID in the query string and local storage holds a numeric timestamp that we set earlier
					if ( Date.now() < parseInt(remembered) ) {
						// Local flag hasn't expired, and we found an AKID: remember it
						localStorage.setItem("sticky-akid", args['akid']);
					} else {
						// Local flag has expired: clear the flag and give up
						localStorage.removeItem("sticky-akid");
					}
				}
			}
		}
		return args;
	};
}( actionkit.utils.getArgs );

// When the user clicks "Not you? Click here!" link, clear the saved AKID
actionkit.forms.logOut = function ( original ) {
	return function sticky_log_out() {
		localStorage.removeItem("sticky-akid");
		// Then run the built-in ActionKit functionality
		original.apply(this,);
	};
}( actionkit.forms.logOut );
