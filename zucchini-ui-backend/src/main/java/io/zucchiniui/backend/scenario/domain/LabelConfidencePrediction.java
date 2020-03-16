package io.zucchiniui.backend.scenario.domain;

public class LabelConfidencePrediction {

    private float confidence;

    private String label;

    public LabelConfidencePrediction(float confidence, String label) {
        this.confidence = confidence;
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public float getConfidence() {
        return confidence;
    }

    public void setConfidence(float confidence) {
        this.confidence = confidence;
    }
}
