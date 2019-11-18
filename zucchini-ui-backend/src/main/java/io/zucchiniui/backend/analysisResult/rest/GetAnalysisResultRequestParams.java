package io.zucchiniui.backend.analysisResult.rest;

import javax.ws.rs.QueryParam;

public class GetAnalysisResultRequestParams {

    @QueryParam("shortLabel")
    private String shortLabel;

    @QueryParam("longLabel")
    private String longLabel;

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

}
