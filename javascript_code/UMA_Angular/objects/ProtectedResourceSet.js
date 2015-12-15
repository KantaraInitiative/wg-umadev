/**
 * Created by K-Gonzalez on 10/6/2015.
 */
/*
 *  The resource server defines a resource set that the authorization server needs to be aware of by registering a resource set description at the authorization server.
 *  This registration process results in a unique identifier for the resource set that the resource server can later use for managing its description.

 *  The resource server is free to use its own methods of describing resource sets. A resource set description is a JSON document with the following properties:

 *  name        REQUIRED:   A human-readable string describing some scope (extent) of access.
 This name MAY be used by the authorization server in any user
 interface it presents to the resource owner.

 *  uri         OPTIONAL:   A URI that provides the network location for the resource set being registered.
 For example, if the resource set corresponds to a digital photo,
 the value of this property could be an HTTP-based URI identifying the location of the photo on the web.
 The authorization server can use this information in various ways to inform clients about a resource set's location.

 *  type        OPTIONAL:   A string uniquely identifying the semantics of the resource set.
 For example, if the resource set consists of a single resource that is an identity claim that leverages
 standardized claim semantics for "verified email address", the value of this property could be an identifying URI for this claim.

 *  scopes      REQUIRED:   An array of strings, any of which MAY be a URI, indicating the available scopes for this resource set.
 URIs MUST resolve to scope descriptions as defined in Section 2.1.
 Published scope descriptions MAY reside anywhere on the web;
 a resource server is not required to self-host scope descriptions and may wish to point to standardized scope descriptions residing elsewhere.
 It is the resource server's responsibility to ensure that scope description documents
 are accessible to authorization servers through GET calls to support any user interface requirements.
 The resource server and authorization server are presumed to have separately negotiated
 any required interpretation of scope handling not conveyed through scope descriptions.

 *  icon_uri    OPTIONAL:   A URI for a graphic icon representing the resource set.
 The referenced icon MAY be used by the authorization server in its resource owner user interface for the resource owner.
 */

UMAAngular.factory('ProtectedResourceSet', function(){

    /* ProtectedResourceSet constructor */
    var ResourceSet = function(){
        this.name = '';
        this.uri = '';
        this.type = '';
        this.scopes = [];
        this.icon_uri = '';
        this.rsid = '';
    };

    /* Create a new ProtectedResourceSet from parsed JSON */
    var createFromJSON = function(ResourceSetJSON){

        var newResourceSetFromJSON = create();
        newResourceSetFromJSON.name = ResourceSetJSON.name;
        newResourceSetFromJSON.uri = ResourceSetJSON.uri;
        newResourceSetFromJSON.type = ResourceSetJSON.type;
        for(var i = 0; i < ResourceSetJSON.scopes.length; i++){
            newResourceSetFromJSON.scopes.push(ResourceSetJSON.scopes[i]);
        }
        newResourceSetFromJSON.icon_uri = ResourceSetJSON.icon_uri;
        return newResourceSetFromJSON;
    };

    /* Create a new protectedResourceSet */
    var create = function(){
        // return the constructor
        return new ResourceSet();
    };

    /* Method to create JSON needed for AS from this object instance.
     * RS needs to have an rsid but will not have it yet at creation
     * and AS only needs the following 5 pairs for create
     * */
    ResourceSet.prototype.toJSONForAS = function(){
        return {
            name: this.name,
            uri: this.uri,
            type: this.type,
            scopes: this.scopes,
            icon_uri: this.icon_uri
        };
    };

    /* Setter for name attribute */
    ResourceSet.prototype.withName = function(name){
        this.name = name;
    };

    /* Setter for Type attribute */
    ResourceSet.prototype.withType = function(type){
        this.type = type;
    };

    /* Setter for Scope attribute */
    ResourceSet.prototype.withScope = function(scope){
        this.scopes.push(scope);
    };

    /* Setter for icon URI attribute */
    ResourceSet.prototype.withIcon = function(icon_URI){
        this.icon_uri = icon_URI;
    };

    /* Setter for resource URI attribute */
    ResourceSet.prototype.withURI = function(URI){
        this.uri = URI;
    };

    /* Setter for rsid attribute */
    ResourceSet.prototype.setRsid = function(rsid){
        this.rsid = rsid;
    };

    /* Getter for name attribute */
    ResourceSet.prototype.getName = function(){
        return this.name;
    };

    /* Getter for Type attribute */
    ResourceSet.prototype.getType = function(){
        return this.type;
    };

    /* Getter for Scope attribute */
    ResourceSet.prototype.getScope = function(){
        return this.scopes;
    };

    /* Getter for icon URI attribute */
    ResourceSet.prototype.getIcon = function(){
        return this.icon_uri;
    };

    /* Getter for resource URI attribute */
    ResourceSet.prototype.getURI = function(){
        return this.uri;
    };

    /* Getter for rsid attribute */
    ResourceSet.prototype.getRsid = function(){
        return this.rsid;
    };

    return {
        create: create,
        createFromJSON: createFromJSON
    }
});