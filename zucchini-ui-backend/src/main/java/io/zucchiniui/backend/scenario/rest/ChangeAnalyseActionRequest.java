package io.zucchiniui.backend.scenario.rest;

import javax.validation.constraints.NotNull;

public class ChangeAnalyseActionRequest {

    @NotNull
    private String newAnalyseAction;

    public String getNewAnalyseAction() {
        return newAnalyseAction;
    }

    public void setNewAnalyseAction(String newAnalyseAction) {
        this.newAnalyseAction = newAnalyseAction;
    }
}
