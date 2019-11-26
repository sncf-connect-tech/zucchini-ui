package io.zucchiniui.backend.scenario.domain;

import java.time.ZonedDateTime;

public class ScenarioAnalysisActionChange extends ScenarioChange<String> {

    private ScenarioAnalysisActionChange() {
    }

    public ScenarioAnalysisActionChange(ZonedDateTime date, String oldValue, String newValue) {
        super(ChangeType.ANALYSE_ACTION, date, oldValue, newValue);
    }

}
