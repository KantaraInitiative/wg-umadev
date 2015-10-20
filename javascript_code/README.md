#A beginning to the javascript dev design idea.

* API is still in design phase. 
* For now I have set up basic HTTP functionality with 'fake' endpoints 
  so that if Angular is a good option the template may already be in place.
* Objects for RSOwner and ResourceSet are incomplete and are dependent on RS implementation.
* restTest.html and the app module controller, restTestController, are just for testing that Angular is referenced      properly and that REST GET call was working properly with an example of how to utilize the response.
  
####(Still gaining ideas. Implementations are incomplete)
###Client side:
* protectionAPIEndpoints:   Handles getting the API config from the AS and setting and getting the endpoints.
* requestProtection:        Handles requesting a PAT from the authorization endpoint of the AS.
* resourceSetRegistration:  Handles Registering a resource set from the RS to the AS.
* permissionRegistration:   Still in the client architecture, but Node module on server seems like a better solution.
* tokenIntrospection:       Still in the client architecture, but Node module on server seems like a better solution.

###Server side:
* eventsController: Handles a get request from an external client for a specific resource.
* introspect:       Handles token introspect to the AS for an external client token if it is present.
* permissionReg:    Handles registering a permission request to the AS for a specific resource in the case of no                             requesting client token or a 403 response from AS on token instrospection.

###RUN Node server

* Type "server.sh" in Linux terminal
* Type "server.bat" in Windows

* The file in scripts/web-server will then handle setup of the Node server to listen
