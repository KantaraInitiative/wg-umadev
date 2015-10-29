# Java RS Client

This is an initial commit for a Java Resource Server Client.

See the TestClient class for an example of using it. I have a local AS that I've been using to test.

A number of things left to do:

* Permission requests (currently only does resource registration)
* Logging
* Unit tests, probably
* Better error handling
* Figure out if the interface is correct

I have a big question around the interface. It seems like a half baked fluent API approach. The objects are mutable, which isn't ideal, and it means it gets confusing whether or not an operator (such as create) should update the instance that was passed in, or if it should only add the id to the returned instance.

It feels like maybe it should go fully one way or the other.

An example of how it works at the moment:

AuthorisationServer as = AuthorisationServer
				.from("https://sso.vagrant.delegations.org.nz/sso/uma/.well-known/uma-configuration");
				
ResourceOwner resourceOwner = ResourceOwner.from(pat, as);

ResourceListResult resListResult = resourceOwner.listResources();

Resource resource = Resource.create()
		.withName("name")
		.withType("type")
		.withScope("scope1")
		.withScope("scope2")
		.withIcon("Icon");

ResourceResult result = resourceOwner.createResource(resource);

