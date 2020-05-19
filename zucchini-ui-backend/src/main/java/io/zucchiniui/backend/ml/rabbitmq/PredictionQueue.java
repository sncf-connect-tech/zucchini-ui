package io.zucchiniui.backend.ml.rabbitmq;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import io.zucchiniui.backend.config.BackendConfiguration;
import io.zucchiniui.backend.ml.domain.PredictionService;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

@Component
public class PredictionQueue {

    private final BackendConfiguration configuration;

    public static final String PREDICTION_QUEUE = "zucchini-prediction";

    public static final String PREDICTION_EXCHANGE = "eggplant-prediction";

    private final PredictionService predictionService;

    public PredictionQueue(
        BackendConfiguration configuration,
        PredictionService predictionService
    ) {
        this.configuration = configuration;
        this.predictionService = predictionService;
        if (configuration.isMLPluginOn()) initPredictionChannel();
    }

    private void initPredictionChannel() {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(configuration.getRabbitUri());
        Connection connection = null;
        Channel channel = null;
        try {
            connection = factory.newConnection();
            channel = connection.createChannel();
            channel.exchangeDeclare(PREDICTION_EXCHANGE, "fanout", true);
            channel.queueDeclare(PREDICTION_QUEUE, true, false, false, null);
            channel.queueBind(PREDICTION_QUEUE, PREDICTION_EXCHANGE, "");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            predictionService.insertNewPrediction(new ObjectMapper()
                .readValue(message, NewPredictionParams.class)
            );
        };
        try {
            channel.basicConsume(PREDICTION_QUEUE, true, deliverCallback, consumerTag -> { });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
