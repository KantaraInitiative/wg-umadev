package org.kantarainitiative.umadev;

import org.kantarainitiative.umadev.dto.ErrorResponse;
import org.kantarainitiative.umadev.util.HttpHelper;

public class ResourceResult {
	private Resource resource;

	private String error;
	private String errorDescription;
	private String errorURI;

	public static ResourceResult success(Resource resource) {
		ResourceResult result = new ResourceResult();
		result.resource = resource;
		return result;
	}

	public static ResourceResult error(ErrorResponse error) {
		ResourceResult result = new ResourceResult();
		result.error = error.getError();
		result.errorDescription = error.getErrorDescription();
		result.errorURI = error.getErrorURI();
		return result;
	}

	public static ResourceResult error(String error) {
		ResourceResult result = new ResourceResult();
		result.error = error;
		return result;
	}

	public boolean isSuccess() {
		return error == null;
	}

	public Resource getResource() {
		return resource;
	}

	public void setResource(Resource resource) {
		this.resource = resource;
	}

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

	@Override
	public String toString() {
		return HttpHelper.marshallObjectToString(this);
	}

}
