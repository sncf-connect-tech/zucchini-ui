package io.zucchiniui.backend.config.rabbitmq;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.zucchiniui.backend.config.BackendConfiguration;
import io.zucchiniui.backend.scenario.domain.Scenario;
import org.springframework.stereotype.Component;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

@Component
public class ScenarioQueue {

    private final BackendConfiguration configuration;

    public static final String SCENARIO_QUEUE = "eggplant-zucchini-incoming-scenario";

    public static final String SCENARIO_EXCHANGE = "eggplant-zucchini-incoming-scenario";

    public static final String NEW_SCENARIO_ROUTING_KEY = "new-scenario";

    private Channel channel;

    public ScenarioQueue(
        BackendConfiguration configuration
    ) {
        this.configuration = configuration;
        if (configuration.getRabbitUri() != null) channel = initScenarioChannel();
    }

    private Channel initScenarioChannel() {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(configuration.getRabbitUri());
        Channel channel = null;
        try {
          Connection connection = factory.newConnection();
          channel = connection.createChannel();
          channel.exchangeDeclare(SCENARIO_EXCHANGE, "topic", true);
          channel.queueDeclare(SCENARIO_QUEUE, true, false, false, null);
          channel.queueBind(SCENARIO_QUEUE, SCENARIO_EXCHANGE, NEW_SCENARIO_ROUTING_KEY);
        } catch (TimeoutException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return channel;
    }

    public void publishNewScenario(Scenario scenario) {
        try {
            this.channel.basicPublish(
                SCENARIO_EXCHANGE,
                NEW_SCENARIO_ROUTING_KEY,
                false,
                true,
                null,
                new ObjectMapper().writeValueAsString(scenario).getBytes()
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
