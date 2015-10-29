package org.kantarainitiative.umadev;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.core.Response;

import org.apache.http.Header;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.message.BasicHeader;
import org.kantarainitiative.umadev.dto.ErrorResponse;
import org.kantarainitiative.umadev.util.HttpHelper;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResourceOwner {

	private AuthorisationServer as;
	private String pat;

	public static ResourceOwner from(String pat, AuthorisationServer as) {
		ResourceOwner resourceOwner = new ResourceOwner();
		resourceOwner.pat = pat;
		resourceOwner.as = as;
		return resourceOwner;
	}

	public ResourceListResult listResources() {
		HttpUriRequest request = RequestBuilder.get(as.getResourceSetRegistrationURI())
				.addHeader(authorizationHeader(pat)).build();

		try {
			Response response = HttpHelper.makeRequest(request);

			if (response.getStatus() != Response.Status.OK.getStatusCode()) {
				return listErrorResponse(response);
			}

			List<String> result = new ObjectMapper().readValue(response.getEntity().toString(),
					new TypeReference<List<String>>() {
					});

			ResourceList list = new ResourceList();
			list.setIds(result);

			return ResourceListResult.success(list);
		} catch (IOException e) {
			return ResourceListResult.error("Exception throw during list resources: " + e.getMessage());
		}
	}

	public ResourceResult readResource(String id) {
		HttpUriRequest request = RequestBuilder.get(as.getResourceSetRegistrationURI() + "/" + id)
				.addHeader(authorizationHeader(pat)).build();
		try {
			Response response = HttpHelper.makeRequest(request);

			if (response.getStatus() != Response.Status.OK.getStatusCode()) {
				return errorResponse(response);
			}

			return ResourceResult
					.success(new ObjectMapper().readValue(response.getEntity().toString(), Resource.class));
		} catch (IOException e) {
			return ResourceResult.error("Exception throw during create resource: " + e.getMessage());
		}
	}

	public ResourceResult createResource(Resource resource) {
		HttpUriRequest request = RequestBuilder.post(as.getResourceSetRegistrationURI())
				.addHeader(authorizationHeader(pat)).setEntity(HttpHelper.marshallObject(resource)).build();
		try {
			Response response = HttpHelper.makeRequest(request);

			if (response.getStatus() != Response.Status.CREATED.getStatusCode()) {
				return errorResponse(response);
			}

			return ResourceResult
					.success(new ObjectMapper().readValue(response.getEntity().toString(), Resource.class));
		} catch (IOException e) {
			return ResourceResult.error("Exception throw during create resource: " + e.getMessage());
		}
	}

	public ResourceResult updateResource(Resource resource) {
		HttpUriRequest request = RequestBuilder.put(as.getResourceSetRegistrationURI() + "/" + resource.getId())
				.addHeader(authorizationHeader(pat)).setEntity(HttpHelper.marshallObject(resource)).build();
		try {
			Response response = HttpHelper.makeRequest(request);

			if (response.getStatus() != Response.Status.OK.getStatusCode()) {
				return errorResponse(response);
			}

			return ResourceResult.success(resource);
		} catch (IOException e) {
			return ResourceResult.error("Exception throw during update resource: " + e.getMessage());
		}
	}

	public ResourceResult deleteResource(Resource resource) {
		HttpUriRequest request = RequestBuilder.delete(as.getResourceSetRegistrationURI() + "/" + resource.getId())
				.addHeader(authorizationHeader(pat)).build();
		try {
			Response response = HttpHelper.makeRequest(request);

			if (response.getStatus() != Response.Status.NO_CONTENT.getStatusCode()) {
				return errorResponse(response);
			}

			return ResourceResult.success(null);
		} catch (IOException e) {
			return ResourceResult.error("Exception throw during delete resource: " + e.getMessage());
		}
	}

	public void registerPermissionRequest(Resource resource) {
		// TODO Auto-generated method stub

	}

	private Header authorizationHeader(final String token) {
		return new BasicHeader("Authorization", "Bearer " + token);
	}

	private ResourceResult errorResponse(Response response)
			throws IOException, JsonParseException, JsonMappingException {
		if (response.getEntity() != null) {
			ErrorResponse error = new ObjectMapper().readValue(response.getEntity().toString(), ErrorResponse.class);
			return ResourceResult.error(error);
		} else {
			return ResourceResult.error("Unexpected error response: " + response.getStatus());
		}
	}

	private ResourceListResult listErrorResponse(Response response)
			throws IOException, JsonParseException, JsonMappingException {
		if (response.getEntity() != null) {
			ErrorResponse error = new ObjectMapper().readValue(response.getEntity().toString(), ErrorResponse.class);
			return ResourceListResult.error(error);
		} else {
			return ResourceListResult.error("Unexpected error response: " + response.getStatus());
		}
	}

}
