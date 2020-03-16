package io.zucchiniui.backend.config;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.dropwizard.Configuration;
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

    @NotNull
    private String eggplantUri;

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

    public String getEggplantUri() {
        return eggplantUri;
    }

    public void setEggplantUri(String eggplantUri) {
        this.eggplantUri = eggplantUri;
    }
}
