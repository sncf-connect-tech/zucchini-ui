package io.zucchiniui.backend.scenario.domain;

import java.time.ZonedDateTime;

public class ScenarioAnalysisResultChange extends ScenarioChange<String> {

    private ScenarioAnalysisResultChange() {
    }

    public ScenarioAnalysisResultChange(ZonedDateTime date, String oldValue, String newValue) {
        super(ChangeType.ANALYSE_RESULT, date, oldValue, newValue);
    }

}
