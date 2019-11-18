package io.zucchiniui.backend.analysisResult.domain;

import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;


@Entity("analysisResult")
public class AnalysisResult extends BaseEntity<String> {

    @Id
    private String id;

    private String shortLabel;

    private String longLabel;

    /**
     * Private constructor for Morphia.
     */
    private AnalysisResult() {

    }

    public String getId() {
        return id;
    }

    public String getShortLabel() {
        return shortLabel;
    }

    public void setShortLabel(String shortLabel) {
        this.shortLabel = shortLabel;
    }

    public String getLongLabel() {
        return longLabel;
    }

    public void setLongLabel(String longLabel) {
        this.longLabel = longLabel;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
