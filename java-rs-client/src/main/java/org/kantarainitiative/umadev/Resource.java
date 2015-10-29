package org.kantarainitiative.umadev;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Resource {

	// provided by RS
	private String name;
	private String type;
	private String icon;
	private String uri;
	private List<String> scopes = new ArrayList<>();

	// provided by AS
	@JsonProperty("user_access_policy_uri")
	private String userAccessPolicyUri;

	@JsonProperty("_id")
	private String id;

	public static Resource create() {
		return new Resource();
	}

	public Resource withName(String name) {
		this.name = name;
		return this;
	}

	public Resource withType(String type) {
		this.type = type;
		return this;
	}

	public Resource withScope(String scope) {
		scopes.add(scope);
		return this;
	}

	public Resource withIcon(String icon) {
		this.icon = icon;
		return this;
	}

	public Resource withURI(String uri) {
		this.uri = uri;
		return this;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}

	public String getIcon() {
		return icon;
	}

	public String getUri() {
		return uri;
	}

	public List<String> getScopes() {
		return scopes;
	}

	public String getUserAccessPolicyUri() {
		return userAccessPolicyUri;
	}
}
