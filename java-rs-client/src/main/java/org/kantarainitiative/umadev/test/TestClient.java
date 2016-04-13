package org.kantarainitiative.umadev.test;

import org.kantarainitiative.umadev.AuthorisationServer;
import org.kantarainitiative.umadev.Resource;
import org.kantarainitiative.umadev.ResourceListResult;
import org.kantarainitiative.umadev.ResourceOwner;
import org.kantarainitiative.umadev.ResourceResult;

public class TestClient {

	public static void main(String[] args) throws Exception {
		System.setProperty("org.apache.commons.logging.Log", "org.apache.commons.logging.impl.SimpleLog");
		System.setProperty("org.apache.commons.logging.simplelog.showdatetime", "true");
		System.setProperty("org.apache.commons.logging.simplelog.log.org.apache.http", "DEBUG");

		System.setProperty("javax.net.ssl.trustStore",
				"C:/projects/moe-delegation/platform/scripts/common/truststore-vagrant.jks");

		String pat = "62ebc32f-82f8-4c8c-b979-0d2da3fc8661";
		AuthorisationServer as = AuthorisationServer
				.from("https://sso.vagrant.delegations.org.nz/sso/uma/.well-known/uma-configuration");

		ResourceOwner resourceOwner = ResourceOwner.from(pat, as);

		ResourceListResult resListResult = resourceOwner.listResources();
		System.out.println(resListResult.getResourceList().getIds());
		System.out.println(resListResult.getError());

		for (String id : resListResult.getResourceList().getIds()) {
			Resource r = resourceOwner.readResource(id).getResource();
			resourceOwner.deleteResource(r);
		}

		Resource resource = Resource.create().withName("name" + System.currentTimeMillis()).withType("type")
				.withScope("scope1").withScope("scope2").withIcon("Icon");

		ResourceResult result;

		result = resourceOwner.createResource(resource);
		resource = result.getResource();

		System.out.println(result.getResource());
		System.out.println(result.getError());
		System.out.println(result.getErrorDescription());

		result = resourceOwner.readResource(resource.getId());
		resource = result.getResource();

		System.out.println(result.getResource());
		System.out.println(result.getError());
		System.out.println(result.getErrorDescription());

		result = resourceOwner.updateResource(resource);
		resource = result.getResource();

		System.out.println(result.getResource());
		System.out.println(result.getError());
		System.out.println(result.getErrorDescription());

		result = resourceOwner.deleteResource(resource);
		resource = result.getResource();

		System.out.println(result.getResource());
		System.out.println(result.getError());
		System.out.println(result.getErrorDescription());

		resListResult = resourceOwner.listResources();
		System.out.println(resListResult.getResourceList().getIds());
		System.out.println(resListResult.getError());

		resourceOwner.registerPermissionRequest(resource);

	}
}
