package io.zucchiniui.backend;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.dropwizard.Configuration;
import io.dropwizard.metrics.MetricsFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BackendConfiguration extends Configuration {

    @NotNull
    private String mongoUri;

    @NotNull
    private Integer numberLatest;

    @Valid
    private final MetricsFactory metrics = new MetricsFactory();

    public String getMongoUri() {
        return mongoUri;
    }

    public void setMongoUri(final String mongoUri) {
        this.mongoUri = mongoUri;
    }

    public MetricsFactory getMetrics() {
        return metrics;
    }

    public Integer getNumberLatest() {
        return numberLatest;
    }

    public void setNumberLatest(Integer numberLatest) {
        this.numberLatest = numberLatest;
    }
}
