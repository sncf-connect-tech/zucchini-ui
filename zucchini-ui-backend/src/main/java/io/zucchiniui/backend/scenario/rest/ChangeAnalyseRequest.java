package io.zucchiniui.backend.scenario.rest;

import javax.validation.constraints.NotNull;

public class ChangeAnalyseRequest {

    @NotNull
    private String newAnalyse;

    public String getNewAnalyse() {
        return newAnalyse;
    }

    public void setNewAnalyse(String newAnalyse) {
        this.newAnalyse = newAnalyse;
    }
}
