package org.kantarainitiative.umadev.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ErrorResponse {
	private String error;

	@JsonProperty("error_description")
	private String errorDescription;

	@JsonProperty("error_uri")
	private String errorURI;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

	public String getErrorURI() {
		return errorURI;
	}

	public void setErrorURI(String errorURI) {
		this.errorURI = errorURI;
	}

}
