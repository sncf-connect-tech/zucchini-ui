package io.zucchiniui.backend.scenario.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.research.ws.wadl.HTTPMethods;
import io.zucchiniui.backend.config.BackendConfiguration;
import io.zucchiniui.backend.reportconverter.converter.ReportConverter;
import io.zucchiniui.backend.scenario.domain.LabelConfidencePrediction;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioPredictionRequest;
import io.zucchiniui.backend.scenario.domain.ScenarioPredictionResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Component
public class FailedTypePredictionScenario {
    /*
    * Cette classe permet de faire une requête sur une API permettant de connaitre le type d'erreur
    * rencontrer par le scenario en échec passé en paramètre
    * */

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportConverter.class);

    private BackendConfiguration backendConfiguration;

    public FailedTypePredictionScenario(
        BackendConfiguration backendConfiguration
    ) {
        this.backendConfiguration = backendConfiguration;
    }

    public String guessErrorType(Scenario scenario) throws PredictionError {
        ScenarioPredictionResponse scenarioPredictionResponse = requestTypeErrorPredictionAPI(scenario);

        LabelConfidencePrediction bestPrediction = null;
        float highestAccuracy = 0;
        for (LabelConfidencePrediction prediction : scenarioPredictionResponse.getPrediction()) {
            if (prediction.getConfidence() > highestAccuracy) {
                highestAccuracy = prediction.getConfidence();
                bestPrediction = prediction;
            }
        }

        if (bestPrediction == null) {
            throw new PredictionError();
        }

        return bestPrediction.getLabel();
    }

    private ScenarioPredictionResponse requestTypeErrorPredictionAPI(Scenario scenario) throws PredictionError {
        HttpURLConnection connection = null;
        byte[] bytePayloadRequest = null;

        try {
            URL eggplantUrl = new URL(backendConfiguration.getEggplantUri());
            connection = (HttpURLConnection)eggplantUrl.openConnection();
            connection.setRequestMethod(HTTPMethods.POST.toString());
        } catch (IOException e) {
            LOGGER.debug("Error while configuring URL");
            throw new PredictionError();
        }

        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        try(OutputStream os = connection.getOutputStream()) {
            bytePayloadRequest = formatPayloadRequest(scenario);
            os.write(bytePayloadRequest, 0, bytePayloadRequest.length);
        } catch (IOException e) {
            LOGGER.debug("Error while writing payload URL");
            throw new PredictionError();
        }

        try(BufferedReader br = new BufferedReader(
            new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return parseResponse(response.toString());
        } catch (IOException e) {
            LOGGER.debug("Error while receving response");
            throw new PredictionError();
        }
    }

    private byte[] formatPayloadRequest(Scenario scenario) throws JsonProcessingException {
        ScenarioPredictionRequest scenarioPrediction = new ScenarioPredictionRequest(scenario);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(scenarioPrediction).getBytes(StandardCharsets.UTF_8);
    }

    private ScenarioPredictionResponse parseResponse(String jsonStringFormatResponse) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonStringFormatResponse, ScenarioPredictionResponse.class);
    }
}
