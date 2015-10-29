package org.kantarainitiative.umadev;

import org.kantarainitiative.umadev.dto.ErrorResponse;

public class ResourceListResult {
	private ResourceList resourceList;

	private String error;
	private String errorDescription;
	private String errorURI;

	public static ResourceListResult success(ResourceList resourceList) {
		ResourceListResult result = new ResourceListResult();
		result.resourceList = resourceList;
		return result;
	}

	public static ResourceListResult error(ErrorResponse error) {
		ResourceListResult result = new ResourceListResult();
		result.error = error.getError();
		result.errorDescription = error.getErrorDescription();
		result.errorURI = error.getErrorURI();
		return result;
	}

	public static ResourceListResult error(String error) {
		ResourceListResult result = new ResourceListResult();
		result.error = error;
		return result;
	}

	public boolean isSuccess() {
		return error == null;
	}

	public ResourceList getResourceList() {
		return resourceList;
	}

	public void setResourceList(ResourceList resourceList) {
		this.resourceList = resourceList;
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

}
