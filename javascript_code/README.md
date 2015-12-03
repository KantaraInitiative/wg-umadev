#A beginning to the javascript dev design idea.
* API is still in design phase. 
* For now I have set up basic HTTP functionality so that a template may already be in place.
  
* Example front end app to show API functionality and Node/Angular interaction is in progress -
* I felt that it was important to leave it there so that there are examples of how the code works with a UI

##I have duplicated modules across Node and Angular for the following reasons:
* Although both are JavaScript, Angular is front-end and Node is back-end.
* They do not like to play well together without the help of libraries like Browserify.
* Browserify is helpful in dealing with dependencies across the two, but I did not want to assume that all RS implementations would be using it.
* Therefor I created them both so that the implementer may pick and choose which modules they need based on their use case,
or leave some out if they want to use tools like Browserify.
* Angular introspection and permissionRegistration may be completely redundant as I do not see how one would handle
external requests for resources from the FE. Possibly if more requests were handled from a UI and error messages are sent to a page vs. sending a response

####(Still gaining ideas. Implementations are incomplete)
###UMA Functionality:
* AuthorizationServerEndpoints:   Handles getting the API config from the AS and setting and getting the endpoints.
** This needs the AS config endpoint hardcoded ATM
* requestProtection:              Handles requesting a PAT from the authorization endpoint of the AS.
* resourceSetRegistration:        Handles CRUD on a resource set from the RS to the AS.
* introspection:                  Handles token introspect to the AS for an external client token if it is present.
* permissionRegistration:         Handles registering a permission request to the AS for a specific resource in the case of no                             requesting party token or a 403 response from AS on token instrospection.

####Angular Specific:
* UMAAngular.js: UMAAngular Module creation

####Node Specific:
* resourceServerEventsController: Handles requests from an external client.
* UMAResourceServer:  The minimum server set-up and routing to handle external clients and server-side functionality

###Run Node server
* Type "server.sh" in Linux terminal
* Type "server.bat" in Windows

* The file UMA_Node/UMAResourceServer will then handle setup of the Node server to listen

###Request node_modules
* Type "npm install" from terminal

###Run sample app
* Navigate to {host}/app if you included 'app.use(express.static(rootPath + 'app'))' in your UMAResourceServer set-up and server is running

### Known bugs/issues
* There are multiple comments about questions I am having or issues I am facing. Additionally I try to mark to-do items.
* I will attempt to document these at a future time

* The angular app is not running from node server, only from local by running index.html. It does load the title but nothing else.
I am thinking it is a pathing issue in the app setup in UMAResourceServer. It was working before I re-organized files.
