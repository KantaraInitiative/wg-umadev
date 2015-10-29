package org.kantarainitiative.umadev.util;

import java.io.IOException;
import java.util.Optional;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HttpHelper {

	private static final String APPLICATION_JSON = "application/json; charset=utf-8";
	private static final Header JSON_CONTENT_HEADER = new BasicHeader(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON);

	public static Optional<String> getJSON(String uri) {
		HttpClientBuilder builder = HttpClientBuilder.create();
		HttpUriRequest request = RequestBuilder.get(uri).build();

		try (CloseableHttpClient httpClient = builder.build()) {

			HttpResponse httpResponse = httpClient.execute(request);

			if (httpResponse.getStatusLine().getStatusCode() == 200 && httpResponse.getEntity() != null) {
				String response = EntityUtils.toString(httpResponse.getEntity());
				return Optional.of(response);
			}

			return Optional.empty();
		} catch (IOException e) {
			e.printStackTrace();
			return Optional.empty();
		}
	}

	public static Response makeRequest(final HttpUriRequest request) throws IOException {

		try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {

			HttpResponse httpResponse = httpClient.execute(request);

			Response.ResponseBuilder responseBuilder = Response.status(httpResponse.getStatusLine().getStatusCode());
			Header[] headers = httpResponse.getAllHeaders();
			for (Header header : headers) {
				responseBuilder.header(header.getName(), header.getValue());
			}

			if (httpResponse.getEntity() != null) {
				String response = EntityUtils.toString(httpResponse.getEntity());
				responseBuilder.type(MediaType.APPLICATION_JSON).entity(response);
			}

			return responseBuilder.build();
		}
	}

	public static HttpEntity marshallObject(final Object obj) {
		StringEntity stringEntity = new StringEntity(marshallObjectToString(obj), Consts.UTF_8);
		stringEntity.setContentType(JSON_CONTENT_HEADER);

		return stringEntity;
	}

	public static String marshallObjectToString(final Object obj) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			return objectMapper.writeValueAsString(obj);

		} catch (JsonProcessingException e) {
			throw new IllegalArgumentException("Error marshalling domain object", e);
		}
	}

}
