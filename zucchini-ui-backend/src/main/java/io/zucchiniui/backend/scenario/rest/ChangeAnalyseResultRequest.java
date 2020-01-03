package io.zucchiniui.backend.scenario.rest;

import javax.validation.constraints.NotNull;
import com.google.common.base.Strings;

public class ChangeAnalyseResultRequest {

    @NotNull
    private String newAnalyseResult;

    public String getNewStatus() {
        return newAnalyseResult;
    }

    public void setnewAnalyseResult(final String newAnalyseResult) {
        this.newAnalyseResult = newAnalyseResult;
    }

}
