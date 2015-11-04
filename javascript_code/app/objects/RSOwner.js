/**
 * Created by kfgonzal on 10/6/2015.
 */
// Not sure on this
// Struggling with best way to relate PAT to RO

// have a ProtectedRSO object with the PAT retrieved after successful PAT request?
// Up to RS really if they decide to tie it in with existing users or create a new protected user
// Have to think about scalability and performance

app.factory('RSOwner', function(rsRegistration){

    // There would need to be retrieval of the current user from a DB
    // then this object is created from parsing JSON

    var RSOwner = function(RSOwnerJSON){
        this.id = RSOwnerJSON.id;
        this.name = RSOwnerJSON.name;
        this.PAT = RSOwnerJSON.PAT; // if PAT is "", then not protected
    };

    RSOwner.prototype.setPAT = function(PAT){
        this.PAT = PAT;
        // TODO: Call a DB functionality to update the DB of the logged in user
    };

    RSOwner.prototype.getPat = function(){
        // return PAT for this RSOwner object
        // If PAT === "", not protected with UMA
        return this.PAT;
    };

    RSOwner.prototype.getId = function(){
        return this.id;
    };

    // Get a list of all protected rsid for this user
    RSOwner.prototype.listAllProtectedResources = function(){
        rsRegistration.listAll(this.PAT);
    };

    // To set the rsid after returned from AS on success create
    RSOwner.prototype.createProtectedResource = function(resourceSet){
        rsRegistration.createRS(this.PAT, resourceSet);
    };

    RSOwner.prototype.readProtectedResource = function(rsid){
        // Perform a read of a specific rsid from RSReg
        rsRegistration.readRS(this.PAT, rsid);
    };

    // This is assuming the RS implements where they modify the ResourceSet object first by RS.name = name...etc.
    // and then call RS.update
    // Else need different update methods for each attribute, like updateName(name), updateScopes(scopes), etc
    RSOwner.prototype.updateProtectedResource = function(resourceSet){
        rsRegistration.updateRS(this.PAT, resourceSet);
    };

    RSOwner.prototype.deleteProtectedResource = function(rsid){
        rsRegistration.deleteRS(this.PAT, rsid);
    };

    return RSOwner;
});
