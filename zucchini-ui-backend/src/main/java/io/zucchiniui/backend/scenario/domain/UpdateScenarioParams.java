package io.zucchiniui.backend.scenario.domain;

import java.util.Optional;

public class UpdateScenarioParams {

    private final Optional<ScenarioStatus> status;

    private final Optional<Boolean> reviewed;

    private final Optional<String> analyseResult;

    public UpdateScenarioParams(
        final Optional<ScenarioStatus> status,
        final Optional<Boolean> reviewed,
        final Optional<String> analyseResult) {
        this.status = status;
        this.reviewed = reviewed;
        this.analyseResult = analyseResult;
    }

    public Optional<ScenarioStatus> getStatus() {
        return status;
    }

    public Optional<Boolean> isReviewed() {
        return reviewed;
    }

    public Optional<String> getAnalyseResult() {
        return analyseResult;
    }

}
