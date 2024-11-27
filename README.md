# sticky-akid.js - Persistent User Recognition for ActionKit

The user-recognition system in ActionKit is primarily focused on tokens called AKIDs that are automatically included in the links included by the mailings sent out from the platform. (There is a separate login system based on passwords and session cookies, but it is only used in a limited number of cases, such as changing recurring donations.)

This system works great for users who are taking action directly from a mailing, but falls short if they visit your site directly, or follow links on social media, or browse around after taking one action and decide they want to take another — in these cases, ActionKit will fail to recognize the user, and require them to re-enter their email address, name, and location data.

To overcome this limitation, I developed a small JavaScript library named sticky-akid.js which retains the user’s identity information between visits to ActionKit forms.

The sticky value is kept in the browser’s localStorage rather than a cookie. The only value that’s stored is an AKID, reducing the privacy and security risks; no personal information is saved or transmitted.

To add this capability to your ActionKit instance:

* Include sticky-akid.js in the head of your wrapper.html template so that it’s loaded on every ActionKit page.
* In your user forms, include a checkbox input with the name remember-me and an appropriate label that tells users they should not use this feature on shared computer such as in a library or internet cafe.

Additional details and an integration guide are available on [the sticky-akid.js announcement page](https://greenthumbsoftware.com/recognizing-actionkit-users-with-sticky-akid-js/).

Developed by Simon Cavalletto of [Green Thumb Software](https://greenthumbsoftware.com). Released freely under the MIT License. 
