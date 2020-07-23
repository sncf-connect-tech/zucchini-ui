package io.zucchiniui.backend.ml.domain;

public class Prediction {

    private String label;

    private float accuracy;

    public Prediction() {
    }

    public Prediction(
        String label,
        float accuracy
    ) {
        this.label = label;
        this.accuracy = accuracy;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public float getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(float accuracy) {
        this.accuracy = accuracy;
    }
}
