package org.kantarainitiative.umadev;

import java.io.IOException;
import java.util.Optional;

import org.kantarainitiative.umadev.dto.AuthorisationServerUmaConfiguration;
import org.kantarainitiative.umadev.util.HttpHelper;

import com.fasterxml.jackson.databind.ObjectMapper;

public class AuthorisationServer {

	private AuthorisationServerUmaConfiguration config;

	public String getResourceSetRegistrationURI() {
		return config.getResourceSetRegistrationEndpoint();
	}

	public static AuthorisationServer from(String wellKnownUri) throws IOException {
		Optional<String> wellKnownConfig = HttpHelper.getJSON(wellKnownUri);

		if (!wellKnownConfig.isPresent()) {
			return null;
		}

		AuthorisationServerUmaConfiguration config;
		config = new ObjectMapper().readValue(wellKnownConfig.get(), AuthorisationServerUmaConfiguration.class);

		AuthorisationServer authorisationServer = new AuthorisationServer();
		authorisationServer.config = config;

		return authorisationServer;
	}
}
