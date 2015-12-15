/**
 * Created by K-Gonzalez on 10/14/2015.
 */
var introspection = require('./authorizationServer/protectionAPI/introspection'),
    permissionReg = require('./authorizationServer/protectionAPI/permissionRegistration'),
    host = 'http://localhost:8000',
    viewIconUri = host + '/icons/view',
    saveIconUri = host + '/icons/save',
    allIconUri = host + '/icons/all';


// handle client GET requests to the server for resourceSet access
module.exports = {
    getResourceSet: function(req, res){
        // TODO: get real PAT, the RS has to do this part based on however they are storing/retrieving users and their PATs
        // TODO: This goes back to: should each protected resource object also hold the PAT?
        // TODO: maybe an AS object that holds PAT and AS host, then each protectedResourceSet holds an AS object?
        var fakePAT = '123345hf67exfghj9865';

        // Extract rsid
        var rsid = req.params['rsid'];
        console.log('RSID extracted from url param: ' + rsid);

        if(rsid != null && rsid >= 0) {
            // Extract headers
            var headers = req.headers;

            // Extract the Authorization header if present
            var auth = headers['authorization'];
            if (auth == null) {
                console.log('No Authorization Header');
                // Register a request and return forbidden 403, with ticket and uri
                // inside register, pass the res and call res.send() with 403, ticket etc.
                var scopes = []; // Fake scopes
                // TODO: would actually need to build scopes based on what access client is requesting
                // and get PAT for ResourceOwner

                /* Register permission for resource request */
                permissionReg.register(rsid, scopes, fakePAT, res).then(
                    function(response){
                        // Add any unique RS permissionReg handling here
                    },
                    function(err){
                        // permissionReg should have already failed safely and responded to client if failed
                        console.log("ERROR: Unable to permissionReg. ERROR msg: " + err);
                    });
            } else if (auth.indexOf('Bearer') === -1) {
                // There was an auth header but it isn't a Bearer profile
                console.log('ERROR - Client Resource Request - 403: Invalid Authorization Header Format: ' + auth);
                res.status(403).send(
                    {
                        'error': '403',
                        'error_description': 'Forbidden'
                    });
            }
            else if (auth.indexOf('Bearer') > -1) {
                console.log('Client Resource Request - Authorization Present & Valid Format: ' + auth);
                var splitAuth = auth.split(" ");
                var token = splitAuth[1];

                /* Introspect the token */
                // TODO: get real PAT to send for auth header
                introspection.introspectToken(token, fakePAT, rsid, res).then(
                    function(response){
                        var permissions = response.body['permissions'];
                        // TODO: This chunk below has to be handled by RS implementor because they need to handle retrieving and providing the correct resource
                        for(var i = 0; i < permissions.length; i++){// TODO: more efficient way to find nested JSON?
                            if(rsid === permissions[i]['resource_set_id']){
                                res.status(200).send(permissions[i]); // TODO: Send properly scoped resource back to client
                                break;
                            }
                        }
                        // TODO: send 403 forbidden if rsid was not found in permissions...register permission now?
                    },
                    function(err){
                        // Introspect should have already failed safely and responded to client if failed
                        console.log("ERROR: Unable to introspectToken. ERROR msg: " + err);
                    });
            }
        }else{
            // there was no rsid provided
            console.log('ERROR - Client Resource Request - 400: Resource request made with no identifying rsid');
            res.status(403).send(
                {
                    'error': '400',
                    'error_description': 'Bad Request'
                });
        }
    },
    getScope: function(req, res){
        // Extract scope type
        var scope = req.params['scope'];
        if(scope == null){
            res.status(400).send(
                {
                    'error': '400',
                    'error_description': 'Bad Request'
                });
        }else {
            switch(scope){
                case 'view':
                    res.status(200).send(
                        {
                            'name': 'view',
                            'icon_uri': viewIconUri
                        });
                    break;
                case 'save':
                    res.status(200).send(
                        {
                            'name': 'save',
                            'icon_uri': saveIconUri
                        });
                    break;
                case "all":
                    res.status(200).send(
                        {
                            'name': 'all',
                            'icon_uri': allIconUri
                        });
                    break;
                default:
                    res.status(400).send(
                        {
                            'error': '400',
                            'error_description': 'Bad Request'
                        });
            }
        }
    },
    getAllScopes: function(req, res){
        res.status(200).send(
            [
                {
                    'name': 'view',
                    'icon_uri': viewIconUri
                },
                {
                    'name': 'save',
                    'icon_uri': saveIconUri
                },
                {
                    'name': 'all',
                    'icon_uri': allIconUri
                }
            ]);
    },
    getIcon: function(req, res){
        var icon = req.params['icon'];
        if(icon == null){
            res.status(400).send(
                {
                    'error': '400',
                    'error_description': 'Bad Request'
                });
        }else {
            switch(icon){
                case 'view':
                    res.set('Content-Type', 'image/png');
                    res.status(200).send('../icons/scopeIcons/view.png');
                    break;
                case 'save':
                    res.set('Content-Type', 'image/jpeg');
                    res.status(200).send('../icons/scopeIcons/save.jpg');
                    break;
                case 'all':
                    res.set('Content-Type', 'image/jpeg');
                    res.status(200).send('../icons/scopeIcons/all.jpg');
                    break;
                default:
                    res.status(400).send(
                        {
                            'error': '400',
                            'error_description': 'Bad Request'
                        });
            }
        }
    },
    getConfig: function(req, res){
        res.status(200).send(
            {
                'resource_set': host + '/resourceSet',
                'scope': host + '/scopes'
            });
    }
};