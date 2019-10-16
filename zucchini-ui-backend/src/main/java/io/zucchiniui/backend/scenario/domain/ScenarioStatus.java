package io.zucchiniui.backend.scenario.domain;

import java.util.stream.Stream;

public enum ScenarioStatus {

    NOT_RUN("unplayed"),
    PASSED,
    FAILED("failures"),
    PENDING("pending");

    private String status;

    ScenarioStatus() {}

    ScenarioStatus(String status) {
        this.status = status;
    }

    public static ScenarioStatus getScenarioByStatus(String status) {
        return Stream.of(ScenarioStatus.values())
            .filter(scenarioStatus -> status.equals(scenarioStatus.status))
            .findFirst()
            .orElse(null);
    }
}
