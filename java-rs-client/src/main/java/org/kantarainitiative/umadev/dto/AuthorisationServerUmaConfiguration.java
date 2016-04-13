package org.kantarainitiative.umadev.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthorisationServerUmaConfiguration {
	private String version;
	private String issuer;

	@JsonProperty("pat_profiles_supported")
	private List<String> patProfilesSupported;

	@JsonProperty("aat_profiles_supported")
	private List<String> aatProfilesSupported;

	@JsonProperty("rpt_profiles_supported")
	private List<String> rptProfilesSupported;

	@JsonProperty("pat_grant_types_supported")
	private List<String> patGrantTypesSupported;

	@JsonProperty("aat_grant_types_supported")
	private List<String> aatGrantTypesSupported;

	@JsonProperty("token_endpoint")
	private String tokenEndpoint;

	@JsonProperty("authorization_endpoint")
	private String authorizationEndpoint;

	@JsonProperty("introspection_endpoint")
	private String introspectionEndpoint;

	@JsonProperty("resource_set_registration_endpoint")
	private String resourceSetRegistrationEndpoint;

	@JsonProperty("permission_registration_endpoint")
	private String permissionRegistrationEndpoint;

	@JsonProperty("rpt_endpoint")
	private String rptEndpoint;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	public List<String> getPatProfilesSupported() {
		return patProfilesSupported;
	}

	public void setPatProfilesSupported(List<String> patProfilesSupported) {
		this.patProfilesSupported = patProfilesSupported;
	}

	public List<String> getAatProfilesSupported() {
		return aatProfilesSupported;
	}

	public void setAatProfilesSupported(List<String> aatProfilesSupported) {
		this.aatProfilesSupported = aatProfilesSupported;
	}

	public List<String> getRptProfilesSupported() {
		return rptProfilesSupported;
	}

	public void setRptProfilesSupported(List<String> rptProfilesSupported) {
		this.rptProfilesSupported = rptProfilesSupported;
	}

	public List<String> getPatGrantTypesSupported() {
		return patGrantTypesSupported;
	}

	public void setPatGrantTypesSupported(List<String> patGrantTypesSupported) {
		this.patGrantTypesSupported = patGrantTypesSupported;
	}

	public List<String> getAatGrantTypesSupported() {
		return aatGrantTypesSupported;
	}

	public void setAatGrantTypesSupported(List<String> aatGrantTypesSupported) {
		this.aatGrantTypesSupported = aatGrantTypesSupported;
	}

	public String getTokenEndpoint() {
		return tokenEndpoint;
	}

	public void setTokenEndpoint(String tokenEndpoint) {
		this.tokenEndpoint = tokenEndpoint;
	}

	public String getAuthorizationEndpoint() {
		return authorizationEndpoint;
	}

	public void setAuthorizationEndpoint(String authorizationEndpoint) {
		this.authorizationEndpoint = authorizationEndpoint;
	}

	public String getIntrospectionEndpoint() {
		return introspectionEndpoint;
	}

	public void setIntrospectionEndpoint(String introspectionEndpoint) {
		this.introspectionEndpoint = introspectionEndpoint;
	}

	public String getResourceSetRegistrationEndpoint() {
		return resourceSetRegistrationEndpoint;
	}

	public void setResourceSetRegistrationEndpoint(String resourceSetRegistrationEndpoint) {
		this.resourceSetRegistrationEndpoint = resourceSetRegistrationEndpoint;
	}

	public String getPermissionRegistrationEndpoint() {
		return permissionRegistrationEndpoint;
	}

	public void setPermissionRegistrationEndpoint(String permissionRegistrationEndpoint) {
		this.permissionRegistrationEndpoint = permissionRegistrationEndpoint;
	}

	public String getRptEndpoint() {
		return rptEndpoint;
	}

	public void setRptEndpoint(String rptEndpoint) {
		this.rptEndpoint = rptEndpoint;
	}

}
