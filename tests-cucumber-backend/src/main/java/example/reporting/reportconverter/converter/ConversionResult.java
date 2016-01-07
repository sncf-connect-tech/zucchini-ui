package example.reporting.reportconverter.converter;

import example.reporting.api.feature.Feature;
import example.reporting.api.scenario.Scenario;

import java.util.List;

public class ConversionResult {

    private final Feature feature;

    private final List<Scenario> scenarii;

    public ConversionResult(final Feature feature, final List<Scenario> scenarii) {
        this.feature = feature;
        this.scenarii = scenarii;
    }

    public Feature getFeature() {
        return feature;
    }

    public List<Scenario> getScenarii() {
        return scenarii;
    }

}