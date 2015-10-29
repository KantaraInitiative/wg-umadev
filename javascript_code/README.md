#A beginning to the javascript dev design idea.

* API is still in design phase. 
* For now I have set up basic HTTP functionality with 'fake' endpoints 
  so that if Angular is a good option the template may already be in place.
* Objects for RSOwner and ResourceSet are incomplete and are dependent on RS implementation.
  
* Example front ent to show API functionality is in progress

####(Still gaining ideas. Implementations are incomplete)
###Client side:
* protectionAPIEndpoints:   Handles getting the API config from the AS and setting and getting the endpoints.
* requestProtection:        Handles requesting a PAT from the authorization endpoint of the AS.
* resourceSetRegistration:  Handles Registering a resource set from the RS to the AS.

###Server side:
* eventsController: Handles a get request from an external client for a specific resource.
* introspect:       Handles token introspect to the AS for an external client token if it is present.
* permissionReg:    Handles registering a permission request to the AS for a specific resource in the case of no                             requesting client token or a 403 response from AS on token instrospection.

###Run Node server

* Type "server.sh" in Linux terminal
* Type "server.bat" in Windows

* The file in scripts/web-server will then handle setup of the Node server to listen

###Request node_modules
* Type "npm install" from terminal
