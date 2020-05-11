package io.zucchiniui.backend.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.dropwizard.Configuration;
import io.dropwizard.logback.shaded.checkerframework.checker.nullness.qual.Nullable;
import io.dropwizard.metrics.MetricsFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BackendConfiguration extends Configuration {

    @NotNull
    private String mongoUri;

    @NotNull
    private Integer numberLatest;

    @NotNull
    private List<EncounteredProblem> encounteredProblem;

    @NotNull
    private List<CorrectionActionConfig> correctionAction;

    @Valid
    private final MetricsFactory metrics = new MetricsFactory();

    @Nullable
    private String rabbitUri;

    public String getMongoUri() {
        return mongoUri;
    }

    public String getRabbitUri() {
        return rabbitUri;
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

    public List<EncounteredProblem> getEncounteredProblem() {
        return encounteredProblem;
    }

    public void setEncounteredProblem(List<EncounteredProblem> encounteredProblem) {
        this.encounteredProblem = encounteredProblem;
    }

    public List<CorrectionActionConfig> getCorrectionAction() {
        return correctionAction;
    }

    public void setCorrectionAction(List<CorrectionActionConfig> correctionAction) {
        this.correctionAction = correctionAction;
    }
}
