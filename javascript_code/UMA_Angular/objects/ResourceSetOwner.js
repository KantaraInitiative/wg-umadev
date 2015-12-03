/**
 * Created by kfgonzal on 10/6/2015.
 */
// Not sure on this
// Struggling with best way to relate PAT to RO

/* have a ProtectedRSO object with the PAT retrieved after successful PAT request?
 * Up to RS really if they decide to tie it in with existing users or create a new protected user
 * Have to think about scalability and performance */

/* Call promises will be handled here so that the implementer may modify
 * what they want/do not want from returned promises */
UMAAngular.factory('ResourceSetOwner', function(rsRegistration){

    /* RSOwner constructor */
    var RSOwner = function(){
        this.id = '';
        this.name = '';
        this.PAT = ''; // if PAT is "", then not protected yet
    };

    /* Create a new RSOwner from parsing JSON */
    var createFromJSON = function(RSOwnerJSON){
        var owner = create();
        owner.id = RSOwnerJSON.id;
        owner.name = RSOwnerJSON.name;
        owner.PAT = RSOwnerJSON.PAT; // if PAT is "", then not protected yet
        return owner;
    };

    /* Create a new RSOwner */
    var create = function(){
        // return the constructor
        return new RSOwner();
    };

    /* Return a promise
     * Its success function returns the list of rsids as an input to the next promise chain function
     * */
    RSOwner.prototype.listAllProtectedResources = function(){
        return rsRegistration.listAll(this.PAT).then(
            function(response){
                return response.data;
            });
    };

    /* Return a promise
     * Its success function returns "_id" as an input to the next promise chain function
     * */
    RSOwner.prototype.createProtectedResource = function(resourceSet){
        return  rsRegistration.createRS(this.PAT, resourceSet).then(
            function(response){
                resourceSet.setRsid(response.data["_id"]);
                return response.data['_id'];
            });
    };

    /* Return a promise
     * Its success function returns a resource set as an input to the next promise chain function
     * */
    RSOwner.prototype.readProtectedResource = function(rsid){
        // Perform a read of a specific rsid from RSReg
        return rsRegistration.readRS(this.PAT, rsid).then(
            function(response){
                return response.data['resource_set'];
            });
    };

    /* Returns a promise
     * Its success function returns "_id" as an input to the next promise chain function
     * This is assuming the RS implements where they modify the ResourceSet object first by RS.name = name...etc.
     * and then call RS.update
     * Else need different update methods for each attribute, like updateName(name), updateScopes(scopes), etc
     */
    RSOwner.prototype.updateProtectedResource = function(resourceSet){
        return  rsRegistration.updateRS(this.PAT, resourceSet).then(
            function(response){
                resourceSet.setRsid(response.data['_id']);
                return response.data['_id'];
            });
    };

    /* Returns the promise from rs.Registration.deleteRS
     * Allows the implementer the ability to use any promise chain if needed
     * */
    RSOwner.prototype.deleteProtectedResource = function(rsid){
        return rsRegistration.deleteRS(this.PAT, rsid);
    };

    /* Setter for id attribute */
    RSOwner.prototype.setId = function(id){
        this.id = id;
    };

    /* Setter for name attribute */
    RSOwner.prototype.setName = function(name){
        this.name = name;
    };

    /* Setter for PAT attribute */
    RSOwner.prototype.setPAT = function(PAT){
        this.PAT = PAT;
        // TODO: Call a DB functionality to update the DB of the logged in user
    };

    /* Getter for id attribute */
    RSOwner.prototype.getId = function(){
        return this.name;
    };

    /* Getter for name attribute */
    RSOwner.prototype.getName = function(){
        return this.id;
    };

    /* Getter for PAT attribute */
    RSOwner.prototype.getPat = function(){
        // return PAT for this RSOwner object
        // If PAT === "", not protected with UMA
        return this.PAT;
    };

    return {
        create: create,
        createFromJSON: createFromJSON
    };
});